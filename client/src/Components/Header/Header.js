import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css'


class Header extends Component{
    render(){
        return(
            <nav>
                <div className="nav-wrapper header-color header-wrapper">
                    <a className="left brand-logo logo header-text">Taylorsville Football</a>
                    <ul className="right">
                        <li><Link>Coaches</Link></li>
                        <li><Link>Schedule</Link></li>
                        <li><Link>Live</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header