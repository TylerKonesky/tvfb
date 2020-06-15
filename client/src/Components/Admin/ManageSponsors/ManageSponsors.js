import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser, fetchSponsors} from '../../../actions';
import RenderImage from '../../Helpers/renderImage';
import axios from 'axios';
import '../Admin.css';
import './ManageSponsors.css';

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
                image: this.state.image
        }).then(res =>{
            console.log(res.data)
            this.props.fetchSponsors();
        })
    }

    handleDeleteSponsor(e, id){
        e.preventDefault();
        axios.delete(`/api/sponsors/deleteSponsor/${id}`).then(res =>{
            console.log('Deleted Sponsor')
            this.props.fetchSponsors();
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
                        <div key={sponsor._id}>
                            <div>
                                {sponsor.company}
                            </div>
                            <div>
                                <RenderImage image={sponsor.image} alt={sponsor.company}/>
                            </div>
                            <div>
                                <Link to={`/pageadmin/manageSponsors/edit/${sponsor._id}`}>Update</Link>
                                <button onClick={(e)=>this.handleDeleteSponsor(e, sponsor._id)}>Delete</button>
                                
                            </div>
                        </div>
                    )
                })
        }
    }
 

    render(){
        return(
            <div className="container">
                <div>
                    <Link className="header-link" to="/pageadmin/manageCoaches">Manage Coaches</Link>
                    <Link className="header-link active" to="/pageadmin/manageSponsors">Manage Sponsors</Link>
                    <Link className="header-link" to="/pageadmin/manageSchedule">Manage Schedule</Link>
                </div>
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

                    <button onClick={(e)=>{this.handleAddNewSponsor(e)}}>Add</button>
                </form>
                <div>
                    {this.renderSponsors()}
                </div>
            </div>
        )
    }
}

function mapStateToProps({user, sponsors}){
    return {user, sponsors}
}

export default connect(mapStateToProps, {fetchUser, fetchSponsors})(ManageSponsors)