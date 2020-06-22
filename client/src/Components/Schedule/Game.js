import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEvents} from '../../actions';
import './Game.css';
import '../../bodysize.css';

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
                            <div className="score-wrapper">
                                <div className="score">
                                    Score: {event.score}
                                </div>
                                <div className={event.result === 'Win' ? 'win' : 'loss'}>
                                    {event.result}
                                </div>  
                            </div>
                            <div className="mvp-wrapper">
                                <div className="omvp">Offensive MVP: {event.omvp}</div>
                                <div className="dmvp">Defensive MVP: {event.dmvp}</div>
                               
                                
                            </div>
                            <div className="event-summary">
                                <h5>Game Summary</h5>
                                <div>{event.summary}</div>
                            </div>
                        </div>)
                    }
                })
        }
    }
    render(){
        return(
        <div className="container body-size body-background">
            {this.renderGame()}    
        </div>
        )
    }
}

function mapStateToProps({events}){
    return {events}
}

export default connect(mapStateToProps, {fetchEvents})(Game)