import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCoaches, fetchUser} from '../../../actions';
import RenderImage from '../../Helpers/renderImage';
import {toast} from 'react-toastify';
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
        this.props.fetchUser();
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
        axios.post('/api/coaches/addNewCoach', {name: this.state.name, position: this.state.position, bio: this.state.bio, image: this.state.image}).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Coach Added', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }else{
                toast.error('🦄 Coach NOT Added', {
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

    deleteCoach(e, id){
        e.preventDefault();
        axios.delete(`/api/coaches/deleteCoach/${id}`).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Coach Deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    this.props.fetchCoaches();
            }else{
                toast.error('🦄 Coach NOT Deleted', {
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

    renderCoaches(){
        switch(this.props.coaches){
            case null:
                return(<div>Loading...</div>);
            case false: 
                return(<div>No Coaches Saved</div>);
            default:
                return this.props.coaches.map(coach =>{
                    return(
                        <div key={coach._id} className="row">
                            <div className="col s12 m7">
                                <div className="card card-size">
                                    <div className="card-image">
                                        <RenderImage image={coach.image} alt="coach"/>
                                    </div>
                                    <div className="card-content">
                                        <p>Name: {coach.name}</p>
                                        <p>Position: {coach.position}</p>
                                        <p>Bio: {coach.bio}</p>
                                    </div>
                                    <div className="card-action button-wrappers">
                                        <Link  to={`/pageadmin/manageCoaches/edit/${coach._id}`} className="waves-effect waves-light btn edit"><i className="material-icons">edit</i></Link>
                                        <button className="waves-effect waves-light btn button-right delete" onClick={(e)=>{this.deleteCoach(e, coach._id)}} ><i className="material-icons">cancel</i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
        }
    }
    renderAccess(){
        switch(this.props.user){
            case null:
                return;
            case false: 
                return(<div>You must be logged in to view this page</div>)
            default:
                if(this.props.user.userType === 'admin'){
                    return (
                        <div>
                            {this.renderAdminView()}
                        </div>
                    )
                }else{
                    return(<div>You must be an admin to view this page</div>)
                }
        }
    }

  

    renderAdminView(){
        return(
            <div>
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

    render(){
        return(
            <div className="container">
                {this.renderAccess()}
            </div>
        )
    }
}

function mapStateToProps({user, coaches}){
    return {user, coaches}
}
export default connect(mapStateToProps, {fetchCoaches, fetchUser})(ManageCoaches)