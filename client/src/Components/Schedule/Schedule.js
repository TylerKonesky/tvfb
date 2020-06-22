import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchEvents} from '../../actions';
import DateFormat from '../Helpers/dateFormat'
import RenderImage from '../Helpers/renderImage';
import './Schedule.css';
import '../../bodysize.css';

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            games: true
        }
    }
    componentDidMount(){
        this.props.fetchEvents();
    }

    sortEvents(events){
        let sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedEvents;
    }

    renderOtherEvents(){
        switch(this.props.events){
            case null:
            case false: 
                return(<div>No events scheduled</div>)
            default: 
                let sortedEvents = this.sortEvents(this.props.events)
                if(this.state.games === false){
                    return sortedEvents.map(event =>{
                        if(event.event !== "Game"){
                            return(
                                <tr key={event._id}>
                                    
                                    <td>
                                        <DateFormat date={event.date}/>
                                    </td>
                                    <td>
                                        {event.time}
                                    </td>
                                    <td>
                                        {event.event}
                                    </td>
                                    
                                    <td>
                                        {event.location}
                                    </td>
                                    <td>
                                        {event.description}
                                    </td>

                                </tr>
                            )
                        }
                        return null
                    })
                }
                return(<div>Events are scheduled</div>)
        }
    }

    renderGames(){
        switch(this.props.events){
            case null:
            case false: 
                return(<div>No events scheduled</div>)
            default: 
            let sortedEvents = this.sortEvents(this.props.events)
                if(this.state.games === true){
                    return sortedEvents.map(event =>{
                        if(event.event === "Game"){
                            return(
                                <tr key={event._id}>
                                    <td>
                                        <DateFormat date={event.date}/>
                                    </td>
                                    <td>
                                        {event.time}
                                    </td>
                                    <td>
                                        <div>
                                            <div><RenderImage image={event.oppLogo} classProp="opponent-logo"/></div>  
                                            {/* {event.opponent}   */}
                                        </div>
                                    </td>
                                    <td>
                                        {event.location}
                                    </td>
                                    <td>
                                        {event.description}
                                    </td>
                                    <td>
                                        <Link to={`/schedule/game/${event._id}`}>{event.score}</Link>
                                    </td>

                                </tr>
                            )
                        }
                        return null
                    })
                }
                return(<div>Events are scheduled</div>)
        }
    }
    render(){
        return(
            <div className="container body-size body-background">
                <div className="header-buttons-wrapper">
                    <button className={this.state.games ? `waves-effect waves-light btn active` : `waves-effect waves-light btn inactive`} onClick={()=>this.setState({games: true})}>Games</button>
                    <button className={this.state.games ? `waves-effect waves-light btn right-button inactive` : `waves-effect waves-light btn right-button active`}  onClick={()=>this.setState({games: false})}>Practice</button>
                </div>
                
                    {
                    this.state.games ? 
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Opponent</th>
                                    <th>Location</th>
                                    <th>Description</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderGames()}
                            </tbody>
                        </table>

                        :

                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Event</th>
                                    <th>Location</th>
                                    <th>Description</th>
                                </tr>    
                            </thead>

                            <tbody>
                                {this.renderOtherEvents()}
                            </tbody>
                        </table>
                    }
                    
                
            </div>
        )
    }
}

function mapStateToProps({events}){
    return {events}
}

export default connect(mapStateToProps, {fetchEvents})(Schedule)