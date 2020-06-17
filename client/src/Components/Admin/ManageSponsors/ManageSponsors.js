import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser, fetchSponsors} from '../../../actions';
import RenderImage from '../../Helpers/renderImage';
import Loading from '../../ReusableComponents/Loading';
import MustBeAdmin from '../../ReusableComponents/MustBeAdmin';
import LoggedIn from '../../ReusableComponents/LoggedIn';
import axios from 'axios';
import {toast} from 'react-toastify';
import '../Admin.css';
import './ManageSponsors.css';
import '../../../bodysize.css';


class ManageSponsors extends Component{
    constructor(props){
        super(props);
        this.state = {
            company: '',
            location: '',
            description: '',
            promoCode: '',
            image: '',
            website: ''
        }
    }

    componentDidMount(){
        this.props.fetchSponsors();
        this.props.fetchUser();
    }    

    fileUploader = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => reader.result;
        setTimeout(()=>this.setState({image: reader.result}) , 500)
    }


    onCompanyChange(e){
        this.setState({
            company: e
        })
    }
    onLocationChange(e){
        this.setState({
            location: e
        })
    }
    onDescriptionChange(e){
        this.setState({
            description: e
        })
    }
    onPromoCodeChange(e){
        this.setState({
            promoCode: e
        })
    }

    onWebsiteChange(e){
        this.setState({
            website: e
        })
    }

    
    handleAddNewSponsor(e){
        e.preventDefault();
        axios.post('/api/sponsors/addNewSponsor', {
                location: this.state.location,
                company: this.state.company,
                description: this.state.description,
                promoCode: this.state.promoCode,
                image: this.state.image,
                website: this.state.website
        }).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Sponsor Added', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                this.props.fetchSponsors();
            }else{
                toast.error('🦄 Sponsor NOT added', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            
        })
    }

    handleDeleteSponsor(e, id){
        e.preventDefault();
        axios.delete(`/api/sponsors/deleteSponsor/${id}`).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Sponsor Deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    this.props.fetchSponsors();
            }else{
                toast.error('🦄 Sponsor NOT Deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            
        })
    }

    renderSponsors(){
        switch(this.props.sponsors){
            case null: 
                return null;
            case false: 
                return(<div>No sponsors saved</div>);
            default:

                return this.props.sponsors.map(sponsor =>{
                    return(
                        <div key={sponsor._id} className="sponsor">
                            <div className="sponsor-name">
                                {sponsor.company}
                            </div>
                            <div className="sponsor-image">
                                <RenderImage image={sponsor.image} alt={sponsor.company}/>
                            </div>
                            <div className="sponsor-buttons-wrapper">
                                <Link className="waves-effect waves-light btn edit" to={`/pageadmin/manageSponsors/edit/${sponsor._id}`}>Update <i className="material-icons right">edit</i></Link>
                                <button className="waves-effect waves-light btn delete "onClick={(e)=>this.handleDeleteSponsor(e, sponsor._id)}>Delete<i className="material-icons right">delete</i></button>
                                
                            </div>
                        </div>
                    )
                })
        }
    }
    
    renderAddSponsor(){
        return(
            <form>
                    <label>Company</label>
                    <input onChange={(e)=>{this.onCompanyChange(e.target.value)}}></input>

                    <label>Location</label>
                    <input  onChange={(e)=>{this.onLocationChange(e.target.value)}}></input>

                    <label>Description</label>
                    <input  onChange={(e)=>{this.onDescriptionChange(e.target.value)}}></input>

                    <label>Promo Code</label>
                    <input  onChange={(e)=>{this.onPromoCodeChange(e.target.value)}}></input>

                    <label>Website URL</label>
                    <input  onChange={(e)=>{this.onWebsiteChange(e.target.value)}}></input>

                    <label>Logo</label>
                    <input type="file"  onChange={(e)=>{this.fileUploader(e)}}></input>

                    <button className="waves-effect waves-light btn right" onClick={(e)=>{this.handleAddNewSponsor(e)}}>Add<i className="material-icons right">add</i></button>
                </form>
        )
    }

    renderAdmin(){
        switch(this.props.user){
            case null:
                return <Loading />
            case false: 
                return <LoggedIn />
            default: 
                if(this.props.user.userType === 'admin'){
                    return (
                        <div>
                            <h2>Add New Sponsor</h2>
                            {this.renderAddSponsor()}
                            <div className="sponsors-wrapper">
                                {this.renderSponsors()}
                            </div>
                        </div>
                    )
                        
                }else{
                    return <MustBeAdmin />
                }
        }
    }
 
    render(){
        return(
            <div className="container body-size">
                <div>
                    <Link className="header-link" to="/pageadmin/manageCoaches">Manage Coaches</Link>
                    <Link className="header-link active" to="/pageadmin/manageSponsors">Manage Sponsors</Link>
                    <Link className="header-link" to="/pageadmin/manageSchedule">Manage Schedule</Link>
                </div>
                
                {this.renderAdmin()}
            </div>
        )
    }
}

function mapStateToProps({user, sponsors}){
    return {user, sponsors}
}

export default connect(mapStateToProps, {fetchUser, fetchSponsors})(ManageSponsors)