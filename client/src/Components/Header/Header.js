import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css'


class Header extends Component{
    render(){
        return(
            <nav>
                <div className="nav-wrapper header-color header-wrapper">
                    <a href="/" className="left brand-logo logo header-text">Taylorsville Football</a>
                    <ul className="right">
                        <li><Link to="/coaches">Coaches</Link></li>
                        <li><Link to="/schedule">Schedule</Link></li>
                        <li><Link to="live">Live</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header