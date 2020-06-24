import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEvents} from '../../actions';
import Loading from '../ReusableComponents/Loading';
import DateFormat from '../Helpers/dateFormat'
import './Fundraisers.css'
import '../../bodysize.css'


class Fundraisers extends Component{

    componentDidMount(){
        this.props.fetchEvents();
    }

    sortEvents(events){
        let sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedEvents;
    }

    renderFundraisers(){
        switch(this.props.events){
            case null:
                return <Loading />
            case false: 
                return <div>No Fundraisers Scheduled</div>
            default:
                let sortedEvents = this.sortEvents(this.props.events)
                return sortedEvents.map(event =>{
                    if(event.event === "Fundraiser"){
                        return(
                            <tr>
                                <td><DateFormat date={event.date}/></td>
                                <td>{event.location}</td>
                                <td>{event.description}</td>
                            </tr>
                        )
                    }else{
                        return null;
                    }
                })
        }
    }
    render(){
        return(
            <div className="container body-size body-background">
                <h2 className="fundraiser-header">Fundraisers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderFundraisers()}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

function mapStateToProps({events}){
    return{events}
}
export default connect(mapStateToProps, {fetchEvents})(Fundraisers)