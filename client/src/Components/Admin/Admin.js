import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../../actions'
import MustBeAdmin from '../ReusableComponents/MustBeAdmin';
import Loading from '../ReusableComponents/Loading';
import LoggedIn from '../ReusableComponents/LoggedIn';
import './Admin.css';
import '../../bodysize.css'
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
        axios.get('/api/storeURL').then(res =>{
            this.setState({
                storeURL: res.data
            })
        })
    }

    handleStoreURLChange(e){
        this.setState({
            storeURL: e
        })
    }

    submitStoreURL(e){
        axios.put('/api/storeURL/update', {url: this.state.storeURL}).then(res =>{
            if(res.status === 200){
                console.log("success")
            }else{
                console.log('failure')
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
                                {/* <div>
                                    <label>Store URL</label>
                                    <input type="text" defaultValue={this.state.storeURL} onChange={(e)=>{this.handleStoreURLChange(e.target.value)}}></input>
                                    <button onClick={(e)=>{this.submitStoreURL(e)}}>Update</button>
                                </div>   */}
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

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps, {fetchUser})(Admin)