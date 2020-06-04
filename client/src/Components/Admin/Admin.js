import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../../actions'
import './Admin.css';

class Admin extends Component{
    componentDidMount(){
        this.props.fetchUser();
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
                            <Link className="header-link" to="/pageadmin/manageCoaches">Manage Coaches</Link>
                            <Link className="header-link" to="/pageadmin/manageSponsors">Manage Sponsors</Link>
                            <Link className="header-link" to="/pageadmin/manageSchedule">Manage Schedule</Link>
                            <div>
                                {`Welcome, ${this.props.user.name}`}    
                            </div>
                        </div>
                    )
                }else{
                    return(<div>You must be an admin to view this page</div>)
                }
        }
    }
    render(){
        return(
            <div className="container">
                {this.renderAccess()}
            </div>
        )
    }
}

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps, {fetchUser})(Admin)