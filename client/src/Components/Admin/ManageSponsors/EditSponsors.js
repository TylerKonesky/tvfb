import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import RenderImage from '../../Helpers/renderImage';


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
            console.log(res.data)
        })
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
                    

                    <button onClick={(e)=>{this.handleUpdateSponsor(e)}}>Update</button>
                </form>
        )
    }
    render(){
        return(
            <div className="container">
                This is the edit sponsor page
                {this.renderEditableSponsor()}
            </div>
            
        )
    }
}

export default connect()(EditSponsor)