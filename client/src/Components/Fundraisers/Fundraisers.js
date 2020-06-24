import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEvents} from '../../actions';
import Loading from '../ReusableComponents/Loading';
import '../../bodysize.css'


class Fundraisers extends Component{

    componentDidMount(){
        this.props.fetchEvents();
    }

    renderFundraisers(){
        switch(this.props.events){
            case null:
                return <Loading />
            case false: 
                return <div>No Fundraisers Scheduled</div>
            default:
                console.log(this.props.events)
                return this.props.events.map(event =>{
                    if(event.event === "Fundraiser"){
                        return(
                            <div>{event.event}</div>
                        )
                    }
                })
        }
    }
    render(){
        return(
            <div className="container body-size body-background">
                <h2>Fundraisers</h2>
                {this.renderFundraisers()}
            </div>
        )
    }
}

function mapStateToProps({events}){
    return{events}
}
export default connect(mapStateToProps, {fetchEvents})(Fundraisers)