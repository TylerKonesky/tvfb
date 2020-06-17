import React, {Component} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import Loading from '../../ReusableComponents/Loading';
import MustBeAdmin from '../../ReusableComponents/MustBeAdmin';
import LoggedIn from '../../ReusableComponents/LoggedIn';
import {connect} from 'react-redux';
import {fetchUser} from '../../../actions';

class EditCoach extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            position: '',
            bio: '',
            image: ''
        }
    }

    componentDidMount(){
        this.props.fetchUser();
        axios.get(`/api/coaches/getOneCoach/${this.props.match.params.id}`).then(res =>{
            this.setCoach(res.data)
        })
    }

    setCoach(coach){
        this.setState({
            id: coach._id,
            name: coach.name,
            position: coach.position,
            bio: coach.bio,
            image: coach.image
        })
    }

    updateCoach(e){
        e.preventDefault();
        axios.put(`/api/coaches/updateCoach`, {id: this.state.id, name: this.state.name, position: this.state.position, bio: this.state.bio, image: this.state.image}).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Coach Updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }else{
                toast.success('🦄 Coach NOT Updated', {
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

    renderImage(image){
        const newString = image.split(',');
        return(
            <img className="bio-image"src={`data:image/jpeg;base64, ${newString[1]}`} alt="coach"></img>
        )
    }

    renderAdmin(){
        switch(this.props.user){
            case null:
                return <Loading />
            case false:
                return <LoggedIn />
            default:
                if(this.props.user.userType === 'admin'){
                    return this.renderCoach();
                }else{
                    return <MustBeAdmin />
                }

        }
    }

    renderCoach(){
        switch(this.state.name){
            case '':
                return <Loading />;
            default:
                return(
                    <form>
                        <label>Name</label>
                        <input type="text" defaultValue={this.state.name} onChange={(e)=>this.updateName(e.target.value)}></input>

                        <label>Position</label>
                        <input type="text" defaultValue={this.state.position} onChange={(e)=>this.updatePosition(e.target.value)}></input>

                        <label>Bio</label>
                        <input type="text" defaultValue={this.state.bio} onChange={(e)=>this.updateBio(e.target.value)}></input>

                        <label>Image</label>
                        <input type="file" onChange={(e)=>this.fileUploader(e)}></input>
                        <div className="image-thumbnail">
                            {this.renderImage(this.state.image)}
                        </div>
                        <div>
                            {this.state.bio !== '' && this.state.name !== '' && this.state.image !== '' && this.state.position !== '' ? <button className="waves effect waves-light btn right" onClick={(e)=>this.updateCoach(e)}>Update<i className="material-icons right">add</i></button> : null} 
                        </div>
                    </form>
                )          
        }
    }

    render(){
        return(
            <div className="container">
                Edit this coach....
                {this.renderAdmin()}
            </div>
        )
    }
}

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps, {fetchUser})(EditCoach)