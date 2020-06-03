import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import '../Admin.css';
import './ManageSchedule.css';


class ManageSchedule extends Component{
    render(){
        return(
            <div className="container"> 
                <div>
                    <Link className="header-link" to="/pageadmin/manageCoaches">Manage Coaches</Link>
                    <Link className="header-link" to="/pageadmin/manageSponsors">Manage Sponsors</Link>
                    <Link className="header-link active" to="/pageadmin/manageSchedule">Manage Schedule</Link>
                </div>
                Manage Schedule...
            </div>
        )
    }
}

export default ManageSchedule