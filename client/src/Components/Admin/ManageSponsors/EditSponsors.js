import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import RenderImage from '../../Helpers/renderImage';
import {fetchUser} from '../../../actions';
import Loading from '../../ReusableComponents/Loading';
import MustBeAdmin from '../../ReusableComponents/MustBeAdmin';
import LoggedIn from '../../ReusableComponents/LoggedIn';
import './EditSponsors.css'
import '../../../bodysize.css';
import '../../buttons.css';


class EditSponsor extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            company: '',
            location: '',
            description: '',
            image: '',
            promoCode: '',
            website: ''
        }
    }

    componentDidMount(){
        this.props.fetchUser();
        axios.get(`/api/sponsors/getOneSponsor/${this.props.match.params.id}`).then(res =>{
            this.setSponsor(res.data);
        })
    }

    setSponsor(sponsor){
        this.setState({
            id: sponsor._id,
            company: sponsor.company,
            location: sponsor.location,
            description: sponsor.description,
            image: sponsor.image,
            promoCode: sponsor.promoCode,
            website: sponsor.website
        })
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
    handleUpdateSponsor(e){
        e.preventDefault();
        axios.put('/api/sponsors/updateSponsor', {
                id: this.state.id,
                location: this.state.location,
                company: this.state.company,
                description: this.state.description,
                promoCode: this.state.promoCode,
                image: this.state.image,
                website: this.state.website
        }).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Sponsor Updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }else{
                toast.error('🦄 Sponsor NOT Updated', {
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

    renderAdmin(){
        switch(this.props.user){
            case null:
                return <Loading />;
            case false: 
                return <LoggedIn />;
            default:
                if(this.props.user.userType === 'admin'){
                    return this.renderEditableSponsor()
                }else{
                    return <MustBeAdmin />
                }
        }   
    }

    renderEditableSponsor(){
        return(
            <form>
                    <label>Company</label>
                    <input onChange={(e)=>{this.onCompanyChange(e.target.value)}} defaultValue={this.state.company}></input>

                    <label>Location</label>
                    <input  onChange={(e)=>{this.onLocationChange(e.target.value)}} defaultValue={this.state.location}></input>

                    <label>Description</label>
                    <input  onChange={(e)=>{this.onDescriptionChange(e.target.value)}} defaultValue={this.state.description}></input>

                    <label>Promo Code</label>
                    <input  onChange={(e)=>{this.onPromoCodeChange(e.target.value)}} defaultValue={this.state.promoCode}></input>

                    <label>Website URL</label>
                    <input  onChange={(e)=>{this.onWebsiteChange(e.target.value)}} defaultValue={this.state.website}></input>
                    
                    <div>
                        <label>Current Logo</label>
                        <RenderImage image={this.state.image}/>
                    </div>
                    
                    <div>
                        <label>Logo</label>
                        <input type="file"  onChange={(e)=>{this.fileUploader(e)}}></input>
                    </div>
                    

                    <div className="button-wrapper">
                    <Link className="waves-effect waves-light btn delete-button right"to="/pageadmin/manageSponsors">Cancel<i className="material-icons right">cancel</i></Link>
                    <button className="waves-effect waves-light btn update-button right"onClick={(e)=>{this.handleUpdateSponsor(e)}}>Update<i className="material-icons right">add</i></button>
                    
                    </div>
                 
                </form>
        )
    }
    render(){
        return(
            <div className="container body-size">
                <h2>Edit Sponsor</h2>
                {this.renderAdmin()}
            </div>
            
        )
    }
}

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps, {fetchUser})(EditSponsor)