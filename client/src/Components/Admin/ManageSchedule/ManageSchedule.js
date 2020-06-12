import React, {Component} from 'react';
import M from 'materialize-css';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import {fetchUser, fetchEvents} from '../../../actions';
import DateFormat from '../../Helpers/dateFormat';
import '../Admin.css';
import './ManageSchedule.css';
import axios from 'axios';

class ManageSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            event: '',
            time: '',
            date: '',
            location: '',
            description: ''
        }
    }

    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchEvents();
        let elements = document.querySelectorAll('.event-select');
        M.FormSelect.init(elements);
        let dateElements = document.querySelectorAll('.datepicker')
        M.Datepicker.init(dateElements, {onSelect: (date) => {this.setState({date: date}) }});
        let timeElements = document.querySelectorAll('.timepicker')
        M.Timepicker.init(timeElements);
    }

    onEventChange(e){
        this.setState({
            event: e
        })
    }
    
    onTimeChange(e){
        this.setState({
            time: e
        })
    }

    locationChange(e){
        this.setState({
            location: e
        })
    }

    descriptionChange(e){
        this.setState({
            description: e
        })
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state.date, this.state.time, this.state.event)
        axios.post('/api/events/addNewEvent', {
            event: this.state.event,
            date: this.state.date, 
            time: this.state.time,
            location: this.state.location,
            description: this.state.description
        }).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Event Added', {
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
            this.props.fetchEvents();
        })
    }

    handleDelete(id){
        axios.delete(`/api/events/delete/${id}`).then(res=>{
            if(res.status === 200){
                toast.success('🦄 Event Deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

                this.props.fetchEvents();
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

    sortEvents(events){
        let sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedEvents;
    }

    renderEvents(){
        
        switch(this.props.events){
            case null:
                return;
            case false:
                return;
            default:
                return this.sortEvents(this.props.events).map(event =>{    
                    return(
                        <tr key={event._id}>
                            <td>
                                {event.event}
                            </td>
                            {/* <td>
                                {event.opponent || null}
                            </td> */}
                            <td>
                                <DateFormat date={event.date}/>
                            </td>
                            <td>
                            <Link className="waves effect waves-light amber lighten-2 btn" to={`/pageadmin/manageSchedule/edit/${event._id}`}><i className="material-icons">edit</i></Link>
                            </td>
                            <td>
                            <button className="waves effect waves-light red btn" onClick={()=>{this.handleDelete(event._id)}}><i className="material-icons">cancel</i></button>
                            </td>
                            
                            
                        </tr>
                    )
                })
                
        }
    }
    


    renderAddNewSchedule(){
        switch(this.props.user){
            case null:
                return(<div>Loading...</div>)
            case false:
                return(<div>You must be logged in to view this page</div>);
            default:
                if(this.props.user.userType === 'admin'){
                    return(
                        <div>
                            <form>
                                <label>Event Type</label> 
                                <div className="input-field col s12">
                                    <select className="event-select browser-default" onChange={(e)=>{this.onEventChange(e.target.value)}}>
                                        <option value="">Select One</option> 
                                        <option value="Game">Game</option>   
                                        <option value="Practice">Practice</option>  
                                        <option value="Fundraiser">Fundraiser</option>  
                                        <option value="Other">Other</option>   
                                    </select> 
                                </div>    
                                <label>Date</label>
                                <div>
                                    <input type="text" className="datepicker" id="date" ></input>
                                </div>
                               
                                
                                <label>Time</label>
                                <div className="input-field col s12">
                                    <input type="text" className="timepicker" onSelect={(e)=>{this.onTimeChange(e.target.value)}}></input>
                                </div> 

                                <label>Location</label>
                                <div>
                                    <input type="text" defaultValue={this.state.location} onChange={(e)=>{this.locationChange(e.target.value)}}></input>
                                </div>

                                <label>Description</label>
                                <div>
                                    <textarea type="text" defaultValue={this.state.description} onChange={(e)=>{this.descriptionChange(e.target.value)}}></textarea>
                                </div>                                
                            </form> 
                            <button onClick={(e)=>{this.onSubmit(e)}}>Submit</button>
                            
                        </div>
                    )
                }
                return(
                    <div>You do not have access to this page</div>
                )
        }
    }
   
    render(){
        return(
            <div className="container"> 
                <div>
                    <Link className="header-link" to="/pageadmin/manageCoaches">Manage Coaches</Link>
                    <Link className="header-link" to="/pageadmin/manageSponsors">Manage Sponsors</Link>
                    <Link className="header-link active" to="/pageadmin/manageSchedule">Manage Schedule</Link>
                </div>
                <div>
                    {this.renderAddNewSchedule()}
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Event</th>
                                <th></th>
                                <th></th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {this.renderEvents()}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}


function mapStateToProps({user, events}){
    return {user, events}
}

export default connect(mapStateToProps, {fetchUser, fetchEvents})(ManageSchedule)