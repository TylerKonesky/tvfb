import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCoaches} from '../../actions';
import RenderImage from '../Helpers/renderImage';
import './Coaches.css';
import '../../bodysize.css';

class Coaches extends Component{
  
    componentDidMount(){
        this.props.fetchCoaches();
    }

    renderCoaches(){
        switch(this.props.coaches){
            case null:
            case false: 
                return; 
            default:
                return this.props.coaches.map(coach =>{
                    return(
                        <div key={coach._id} className="card card-width">
                            <div className="card-image waves-effect waves-block waves-light"> 
                                <RenderImage image={coach.image} alt="coach"/>
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
            <div className="container page-wrapper body-size body-background">
                <h2 className="page-title">Coaches</h2>
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