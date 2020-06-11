import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCoaches} from '../../actions'
import './Coaches.css';

class Coaches extends Component{
  
    componentDidMount(){
        this.props.fetchCoaches();
    }

    renderImage(image){
        const newString = image.split(',');
        return(
            <img className="bio-image activator image-size"src={`data:image/jpeg;base64, ${newString[1]}`} alt="coach"></img>
        )
    }

    renderCoaches(){
        switch(this.props.coaches){
            case null:
            case false: 
                return; 
            default:
                return this.props.coaches.map(coach =>{
                    return(
                        <div className="card card-width">
                            <div className="card-image waves-effect waves-block waves-light"> 
                                {this.renderImage(coach.image)}
                            </div>      
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">{coach.name}<i className="material-icons right">more_vert</i></span>
                                <p>{coach.position}</p>
                            </div>  
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Name: {coach.name}<i className="material-icons right">close</i></span>
                                <p>Position: {coach.position}</p>
                                <p>Bio: {coach.bio}</p>
                            </div>
                            
                        </div>
                    )
                })
        }
    }

    render(){
        return(
            <div className="container page-wrapper">
                <h1 className="page-title">Coaches</h1>
                <div className="coaches-grid">
                    {this.renderCoaches()}
                </div>
                
            </div>
        )
    }
}
function mapStateToProps({coaches}){
    return {coaches}
}

export default connect(mapStateToProps, {fetchCoaches})(Coaches)