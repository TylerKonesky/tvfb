import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {fetchUser, fetchEvents} from '../../../actions';
import M from 'materialize-css';
import axios from 'axios';
import {toast} from 'react-toastify';

class EditEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
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
        let elements = document.querySelectorAll('.event-select');
        M.FormSelect.init(elements);
        let dateElements = document.querySelectorAll('.datepicker')
        M.Datepicker.init(dateElements, {onSelect: (date) => {this.setState({date: date}) }, defaultDate: this.state.date});
        let timeElements = document.querySelectorAll('.timepicker')
        M.Timepicker.init(timeElements)
    }

    setEvent(event){
        this.setState({
            id: event._id,
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
        console.log(e)
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
    handleUpdate(e){
        e.preventDefault();
        let event = {
            id: this.state.id,
            event: this.state.event,
            date: this.state.date, 
            time: this.state.time,
            location: this.state.location,
            description: this.state.description,
            score: this.state.score,
            summary: this.state.summary,
            mvp: this.state.mvp,
            opponent: this.state.opponent,

        }
        console.log(event)
        axios.put('/api/events/update', event).then(res=>{
            if(res.status === 200){
                toast.success('🦄 Event Updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
               
            }else{
                toast.error('🦄 ERROR', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
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
                            <form>
                                <label>Event</label>
                                <select value={this.state.event} className="event-select browser-default" onChange={(e)=>{this.updateEvent(e.target.value)}}>
                                        <option value="">Select One</option> 
                                        <option value="Game">Game</option>   
                                        <option value="Practice">Practice</option>  
                                        <option value="Fundraiser">Fundraiser</option>  
                                        <option value="Other">Other</option>   
                                    </select> 
                                <label>Date</label>
                                <div>
                                    <input className="datepicker" id="date" type="text" defaultValue={this.state.date} onChange={(e)=>{this.handleDateChange(e.target.value)}}></input>
                                </div>
                                <label>Time</label>
                                <div>
                                    <input className="timepicker" type="text" defaultValue={this.state.time} onSelect={(e)=>{this.handleTimeChange(e.target.value)}}></input>
                                </div>
                                <label>Location</label>
                                <div>
                                    <input defaultValue={this.state.location} onChange={(e)=>{this.handleLocationChange(e.target.value)}}></input>
                                </div>
                                <label>Description</label>
                                <div>
                                    <textarea  defaultValue={this.state.description} onChange={(e)=>{this.handleDescriptionChange(e.target.value)}}></textarea >
                                </div>
                                <label>Score</label>
                                <div>
                                    <input defaultValue={this.state.score} onChange={(e)=>{this.handleScoreChange(e.target.value)}}></input>
                                </div>
                                <label>Summary</label>
                                <div>
                                    <textarea  defaultValue={this.state.summary} onChange={(e)=>{this.handleSummaryChange(e.target.value)}}></textarea >
                                </div>
                                <label>MVP</label>
                                <div>
                                    <textarea defaultValue={this.state.mvp} onChange={(e)=>{this.handleMVPChange(e.target.value)}}></textarea >
                                </div>
                                <label>Opponent</label>
                                <div>
                                    <input defaultValue={this.state.opponent} onChange={(e)=>{this.handleOpponentChange(e.target.value)}}></input>
                                </div>
                               
                                <button onClick={(e)=>this.handleUpdate(e)}>Update</button>
                                <Link to='/pageadmin/manageSchedule'>Cancel</Link>
                            </form>
                        )
                    }
                })
        }
    }
    
    render(){
        return(
            <div className="container">
                <h2>Edit Event</h2>
                {this.renderEditEvent()}
            </div>
        )
    }
}

function mapStateToProps({user, events}){
    return {user, events}
}

export default connect(mapStateToProps, {fetchEvents, fetchUser})(EditEvent)