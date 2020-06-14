import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


class EditSponsor extends Component{
    constructor(props){
        super(props)
        this.state = {
            company: '',
            location: '',
            description: '',
            image: '',
            promoCode: ''
        }
    }

    componentDidMount(){
        axios.get(`/api/sponsors/getOneSponsor/${this.props.match.params.id}`).then(res =>{
            this.setSponsor(res.data);
        })
    }

    setSponsor(sponsor){
        this.setState({
            company: sponsor.company,
            location: sponsor.location,
            description: sponsor.description,
            image: sponsor.image,
            promoCode: sponsor.promoCode
        })
    }

    renderEditableSponsor(){
        
    }
    render(){
        return(
            <div>
                This is the edit sponsor page
                {this.props.match.params.id}
            </div>
            
        )
    }
}

export default connect()(EditSponsor)