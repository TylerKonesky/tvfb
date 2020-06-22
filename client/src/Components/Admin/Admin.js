import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser, fetchStore} from '../../actions'
import MustBeAdmin from '../ReusableComponents/MustBeAdmin';
import Loading from '../ReusableComponents/Loading';
import LoggedIn from '../ReusableComponents/LoggedIn';
import {toast} from 'react-toastify';
import './Admin.css';
import '../../bodysize.css'
import '../buttons.css'
import axios from 'axios';

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            storeURL: ''
        }
    }
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchStore();
        axios.get('/api/storeURL/getStore').then(res =>{
            this.setState({
                storeURL: res.data[0]
            })
        })
    }

    handleStoreURLChange(e){
        this.setState({
            storeURL: e
        })
    }

    addNewStore(){
        switch(this.props.store){
            case null:
                return(null)
            case false:
                return(null)
            default:
                if(!this.props.store[0]){
                    return(
                    <div>
                        <button className="waves-effect waves-light btn add-button" onClick={(e)=>{this.addStoreURL(e)}}>Add<i className="material-icons right">add</i></button>
                    </div>)
                }
                return(
                    <div>
                        <button className="waves-effect waves-light btn update-button" onClick={(e)=>{this.updateStoreURL(e)}}>Update<i className="material-icons right">add</i></button>
                    </div>
                )
        }
    }

    addStoreURL(e){
        e.preventDefault();
        axios.post('/api/storeURL/addnewStore', {storeURL: this.state.storeURL}).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Store URL Added', {
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

    updateStoreURL(e){
        e.preventDefault();
        let updateStore = {_id: this.props.store[0]._id, storeURL: this.state.storeURL}
        axios.put('/api/storeURL/update', updateStore).then(res =>{
            if(res.status === 200){
                toast.success('🦄 Store URL Updated', {
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

    renderAccess(){
        switch(this.props.user){
            case null:
                return <Loading />;
            case false: 
                return <LoggedIn />;
            default:
                if(this.props.user.userType === 'admin'){
                    return (
                        <div>
                            <Link className="header-link" to="/pageadmin/manageCoaches">Manage Coaches</Link>
                            <Link className="header-link" to="/pageadmin/manageSponsors">Manage Sponsors</Link>
                            <Link className="header-link" to="/pageadmin/manageSchedule">Manage Schedule</Link>
                            <div>
                                {`Welcome, ${this.props.user.name}`}  
                                <div>
                                    <label>Store URL</label>
                                    <input type="text" defaultValue={this.state.storeURL ? this.state.storeURL.storeURL : ''} onChange={(e)=>{this.handleStoreURLChange(e.target.value)}}></input>
                                    
                                    {this.addNewStore()}
                                </div>  
                            </div>
                        </div>
                    )
                }else{
                    return <MustBeAdmin />
                }
        }
    }
    render(){
        return(
            <div className="container body-size">
                {this.renderAccess()}
            </div>
        )
    }
}

function mapStateToProps({user, store}){
    return {user, store}
}

export default connect(mapStateToProps, {fetchUser, fetchStore})(Admin)