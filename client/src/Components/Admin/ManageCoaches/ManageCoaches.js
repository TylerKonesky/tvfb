import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCoaches} from '../../../actions';
import './ManageCoaches.css';
import '../Admin.css';
import axios from 'axios';

class ManageCoaches extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            position: '',
            bio: '',
            image: ''
        }
    }

    componentDidMount(){
        this.props.fetchCoaches();
    }

    updateName(e){
        this.setState({name: e})
    }

    updatePosition(e){
      
        this.setState({position: e})
    }
    updateBio(e){
        this.setState({bio: e})
    }

    fileUploader = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => reader.result;
        setTimeout(()=>this.setState({image: reader.result}) , 500)
    }

    addNewCoach(e){
        e.preventDefault();
        axios.post('/api/addNewCoach', {name: this.state.name, position: this.state.position, bio: this.state.bio, image: this.state.image})
    }
    renderImage(image){
        const newString = image.split(',');
        return(
            <img className="bio-image"src={`data:image/jpeg;base64, ${newString[1]}`} alt="coach"></img>
        )
    }

    renderCoaches(){
        switch(this.props.coaches){
            case null:
                return(<div>Loading...</div>);
            case false: 
                return(<div>No Coaches Saved</div>);
            default:
                console.log(this.props.coaches)
                return this.props.coaches.map(coach =>{
                    return(
                        <div className="row">
                            <div className="col s12 m7">
                                <div className="card card-size">
                                    <div className="card-image">
                                        {this.renderImage(coach.image)}
                                    </div>
                                    <div className="card-content">
                                        <p>Name: {coach.name}</p>
                                        <p>Position: {coach.position}</p>
                                        <p>Bio: {coach.bio}</p>
                                    </div>
                                    <div className="card-action button-wrappers">
                                        <button className="waves-effect waves-light btn edit"><i className="material-icons">edit</i></button>
                                        <button className="waves-effect waves-light btn button-right delete" ><i className="material-icons">cancel</i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
        }
    }

    render(){
        return(
            <div className="container">
                <div>
                    <Link className="header-link active" to="/pageadmin/manageCoaches">Manage Coaches</Link>
                    <Link className="header-link" to="/pageadmin/manageSponsors">Manage Sponsors</Link>
                    <Link className="header-link" to="/pageadmin/manageSchedule">Manage Schedule</Link>
                </div>
                <div>
                    <h2>Add New Coach</h2>
                    <form>
                        <label>Name</label>
                        <input type="text" onChange={(e)=>this.updateName(e.target.value)}></input>

                        <label>Position</label>
                        <input type="text" onChange={(e)=>this.updatePosition(e.target.value)}></input>

                        <label>Bio</label>
                        <input type="text" onChange={(e)=>this.updateBio(e.target.value)}></input>

                        <label>Image</label>
                        <input type="file" onChange={(e)=>this.fileUploader(e)}></input>
                        <div>
                            {this.state.bio !== '' && this.state.name !== '' && this.state.image !== '' && this.state.position !== '' ? <button className="waves effect waves-light btn right" onClick={(e)=>this.addNewCoach(e)}>Add<i className="material-icons right">add</i></button> : null} 
                        </div>
                    </form>
                </div>
                {this.renderCoaches()}
            </div>
        )
    }
}

function mapStateToProps({user, coaches}){
    return {user, coaches}
}
export default connect(mapStateToProps, {fetchCoaches})(ManageCoaches)