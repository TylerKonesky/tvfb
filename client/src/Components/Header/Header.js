import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';
import './Header.css'


class Header extends Component{
    componentDidMount(){
        let elements = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elements)
    }
    render(){
        return(
            <div>
                <nav className="full-screen">
                    <div className="nav-wrapper header-color header-wrapper">
                        <a href="/" className="left brand-logo logo header-text">Taylorsville Football</a>
                        <ul className="right">
                            <li><Link to="/coaches">Coaches</Link></li>
                            <li><Link to="/schedule">Schedule</Link></li>
                            <li><Link to="live">Live</Link></li>
                        </ul>
                    
                    </div>
                </nav>
                <nav className="mobile-screen"> 
                    <div className="nav-wrapper header-color">   
                        <a href="/" className="left brand-logo logo header-text">Taylorsville Football</a>
                        <a className="dropdown-button right dropdown-button-settings dropdown-trigger" href="#!" data-target="dropdown"><i className="material-icons large">dehaze</i></a>
                            <ul id="dropdown" className="dropdown-content"> 
                                <li><Link to="/coaches">Coaches</Link></li>
                                <li><Link to="/schedule">Schedule</Link></li>
                                <li><Link to="live">Live</Link></li>
                            </ul> 
                    </div>
                </nav>
                

            </div>
            
               
           
        )
    }
}

export default Header
