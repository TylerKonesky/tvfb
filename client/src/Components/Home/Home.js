import React, {Component} from 'react';
import M from 'materialize-css';
import './Home.css'
import image1 from '../../images/image1.jpg'
import logo from '../../images/logo.png'
import '../../bodysize.css';

class Home extends Component{
    componentDidMount(){
        let elements = document.querySelectorAll('.parallax');
        M.Parallax.init(elements)
    }
    render(){
        return(
            <div className="home-page-wrapper body-size">
                <div className="parallax-container">
                    <div className="parallax parallax-images">
                        <img src={image1} alt="Taylorsville Football Field"></img>
                    </div>
                </div>
                <div className="section home-body-wrapper">
                    <div className="row container">
                        <div className="logo-wrapper">
                            <img className="" src={logo} alt="Taylorsville Logo"></img>
                        </div>
                        
                    </div>
                </div>
                <div className="parallax-container">
                    <div className="parallax parallax-images">
                        <img className=""  src={image1} alt="Taylorsville Football Field"></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home