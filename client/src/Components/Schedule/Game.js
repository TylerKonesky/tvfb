import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEvents} from '../../actions';
import './Game.css'

class Game extends Component{
    componentDidMount(){
        this.props.fetchEvents();
    }

    renderGame(){
        switch(this.props.events){
            case null: 
                return(<div>Loading...</div>);
            case false: 
                return(<div>Game Not Found</div>)
            default: 
                return this.props.events.map(event =>{
                    if(event._id === this.props.match.params.id){
                        return(
                        <div key={event._id} >
                            <h2 className="event-header">
                                Taylorsville VS {event.opponent} 
                            </h2>
                            <div>Score: {event.score} Result: {event.result}</div>
                            <div className="event-mvp">
                                MVP: {event.mvp}
                            </div>
                            <div className="event-summary">
                                <label>Summary</label>
                                 <div>{event.summary}</div>
                            </div>
                        </div>)
                    }
                })
        }
    }
    render(){
        return(
        <div className="container">
            {this.renderGame()}    
        </div>
        )
    }
}

function mapStateToProps({events}){
    return {events}
}

export default connect(mapStateToProps, {fetchEvents})(Game)