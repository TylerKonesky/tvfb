import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSponsors} from '../../actions';

import RenderImage from '../Helpers/renderImage';

class Sponsors extends Component{
    componentDidMount(){
        this.props.fetchSponsors()
    }

    renderAction(website){
        if(website !== null){
            return(
                <div className="card-action">
                    <a  href={`http://${website}`} target="_blank">View Website</a>
                </div>
            )
        }
        return null;
    }

    renderSponsors(){
        switch(this.props.sponsors){
            case null:
                return(<div>Loading...</div>)
            case false: 
                return(<div>No Sponsors Found</div>)
            default:
                console.log(this.props.sponsors)
                return this.props.sponsors.map(sponsor => {
                    return(
                        <div className="card sticky-action">
                            <div className="card-image waves-effect waves-block waves-light">
                                <RenderImage image={sponsor.image}/>
                            </div>   
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">{sponsor.company}</span>    
                            </div>    
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">{sponsor.company}<i className="material-icons right">close</i></span>
                                <p>{sponsor.description}</p>
                                <p>Promo Code: {sponsor.promoCode}</p>
                            </div>
                            {this.renderAction(sponsor.website)}
                           
                            
                        </div>
                    )
                })
        }
    }
    render(){
        return(
            <div className="container">
                This is the sponsors page
                {this.renderSponsors()}
            </div>
        )
    }
}

function mapStateToProps({sponsors}){
    return {sponsors}
}

export default connect(mapStateToProps, {fetchSponsors})(Sponsors)