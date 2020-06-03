import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import './Admin.css';

class Admin extends Component{
    render(){
        return(
            <div>
                <Link className="header-link" to="/pageadmin/manageCoaches">Manage Coaches</Link>
                <Link className="header-link" to="/pageadmin/manageSponsors">Manage Sponsors</Link>
                <Link className="header-link" to="/pageadmin/manageSchedule">Manage Schedule</Link>
            </div>
        )
    }
}

export default Admin