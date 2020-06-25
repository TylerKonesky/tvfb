import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser, fetchStore} from '../../actions'
// import 'semantic-ui-css/semantic.min.css';
import M from 'materialize-css';
import './Header.css'


class Header extends Component{
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchStore();
        let elements = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elements)
    }
    renderAdminHeader(){
        switch(this.props.user){
            case null:
            case false:
                return null;
            default:
                if(this.props.user.userType === 'admin'){
                    return(
                        <li><Link to="/pageadmin">Admin</Link></li>
                    )
                }
        }
    }
    renderStore(){
        switch(this.props.store){
            case null:
            case false: 
                return null
            default:
                switch(this.props.store[0]){
                    case null:
                    case undefined:
                        return null;
                    default:
                        return(
                            <li><a href={this.props.store[0].storeURL || null} target="_blank" rel="noopener noreferrer">Store</a></li>
                        )

                }
                
        }
    }
    render(){
        return(
            <div>
                <nav className="full-screen">
                    <div className="nav-wrapper header-color header-wrapper">
                        <a href="/" className="left brand-logo logo header-text">Taylorsville Football</a>
                        <ul className="right">
                            {this.renderAdminHeader()}
                            <li><Link to="/coaches">Coaches</Link></li>
                            <li><Link to="/schedule">Schedule</Link></li>
                            <li><Link to="/sponsors">Sponsors</Link></li>
                            <li><Link to="/fundraisers">Fundraisers</Link></li>
                            <li><Link to="/live/tvillefootball">Live</Link></li>
                            {this.renderStore()}
                        </ul>
                    
                    </div>
                </nav>
                <nav className="mobile-screen"> 
                    <div className="nav-wrapper header-color">   
                        <a href="/" className="left brand-logo logo header-text ">Taylorsville Football</a>
                        <a className="dropdown-button right dropdown-button-settings dropdown-trigger" href="#!" data-target="dropdown"><i className="material-icons large">dehaze</i></a>
                            <ul id="dropdown" className="dropdown-content"> 
                                {this.renderAdminHeader()}
                                <li><Link to="/coaches">Coaches</Link></li>
                                <li><Link to="/schedule">Schedule</Link></li>
                                <li><Link to="/sponsors">Sponsors</Link></li>
                                <li><Link to="/fundraisers">Fundraisers</Link></li>
                                <li><Link to="/live/tvillefootball">Live</Link></li>
                                {this.renderStore()}
                            </ul> 
                    </div>
                </nav>
            </div>
            
               
           
        )
    }
}

function mapStateTopProps({user, store}){
    return {user, store}
}

export default connect(mapStateTopProps, {fetchUser, fetchStore})(Header)
