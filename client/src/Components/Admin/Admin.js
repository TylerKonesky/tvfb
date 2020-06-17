import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../../actions'
import MustBeAdmin from '../ReusableComponents/MustBeAdmin';
import Loading from '../ReusableComponents/Loading';
import LoggedIn from '../ReusableComponents/LoggedIn';
import './Admin.css';

class Admin extends Component{
    componentDidMount(){
        this.props.fetchUser();
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