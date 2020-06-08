import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser, fetchEvents} from '../../../actions';
import axios from 'axios';

class EditEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
            event: '',
            date: '',
            location: '',
            time: '',
            opponent: '',
            description: '',
            score: '',
            summary: '',
            mvp: ''

        }
    }

    componentDidMount(){
        this.props.fetchEvents();
        axios.get(`/api/events/getOneEvent/${this.props.match.params.id}`).then(res =>{
            console.log(res.data)
            this.setEvent(res.data)
        })
    }

    setEvent(event){
        this.setState({
            event: event.event,
            date: event.date,
            location: event.location,
            time: event.time,
            opponent: event.opponent,
            description: event.description,
            score: event.score,
            summary: event.summary,
            mvp: event.mvp
        })
    }

    updateEvent(e){
        this.setState({
            event: e
        })
    }

    handleDateChange(e){
        this.setState({
            date: e
        })
    }

    handleLocationChange(e){
        this.setState({
            location: e
        })
    }

    handleTimeChange(e){
        this.setState({
            time: e
        })
    }

    handleOpponentChange(e){
        this.setState({
            opponent: e
        })
    }

    handleDescriptionChange(e){
        this.setState({
            description: e
        })
    }

    handleScoreChange(e){
        this.setState({
            score: e
        })
    }

    handleSummaryChange(e){
        this.setState({
            summary: e
        })
    }

    handleMVPChange(e){
        this.setState({
            mvp: e
        })
    }
    
        

    renderEditEvent(){
        switch(this.props.events){
            case null:
                return;
            case false:
                return;
            default:
                return this.props.events.map(event =>{
                    if(event._id === this.props.match.params.id){
                       
                        return(
                            <div>
                                <label>Event</label>
                                <div>
                                    <input defaultValue={this.state.event} onChange={(e)=>{this.updateEvent(e.target.value)}}></input>
                                </div>
                                <label>Date</label>
                                <div>
                                    <input defaultValue={this.state.date} onChange={(e)=>{this.handleDateChange(e.target.value)}}></input>
                                </div>
                                <label>Time</label>
                                <div>
                                    <input defaultValue={this.state.time} onChange={(e)=>{this.handleTimeChange(e.target.value)}}></input>
                                </div>
                                <label>Location</label>
                                <div>
                                    <input defaultValue={this.state.location} onChange={(e)=>{this.handleLocationChange(e.target.value)}}></input>
                                </div>
                                <label>Description</label>
                                <div>
                                    <input defaultValue={this.state.description} onChange={(e)=>{this.handleDescriptionChange(e.target.value)}}></input>
                                </div>
                                <label>Score</label>
                                <div>
                                    <input defaultValue={this.state.score} onChange={(e)=>{this.handleScoreChange(e.target.value)}}></input>
                                </div>
                                <label>Summary</label>
                                <div>
                                    <input defaultValue={this.state.summary} onChange={(e)=>{this.handleSummaryChange(e.target.value)}}></input>
                                </div>
                                <label>MVP</label>
                                <div>
                                    <input defaultValue={this.state.mvp} onChange={(e)=>{this.handleMVPChange(e.target.value)}}></input>
                                </div>
                                <label>Opponent</label>
                                <div>
                                    <input defaultValue={this.state.opponent} onChange={(e)=>{this.handleOpponentChange(e.target.value)}}></input>
                                </div>
                               
                                
                            </div>
                        )
                    }
                })
        }
    }
    
    render(){
        return(
            <div className="container">
                This is the Edit Event Page
                {this.renderEditEvent()}
            </div>
        )
    }
}

function mapStateToProps({user, events}){
    return {user, events}
}

export default connect(mapStateToProps, {fetchEvents, fetchUser})(EditEvent)