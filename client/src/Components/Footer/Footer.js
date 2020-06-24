import React, {Component} from 'react';
import {SocialIcon} from 'react-social-icons'
import './Footer.css'
import '../../bodysize.css'

class Footer extends Component{
    render(){
        return(
            <footer className="page-footer footer-background ">
            <div className="container">
              <div className="row">
                <div className="col l6 s12">
                  {/* <h5 class="white-text">Footer Content</h5> */}
                  <p className="grey-text text-lighten-4"><i className="material-icons left">place</i>5225 S Redwood Rd, Taylorsville, UT 84123</p>
                  <p className="grey-text text-lighten-4"><i className="material-icons left">phone</i>(385) 646-5455</p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <ul className="buttons">
                    <li><SocialIcon url="https://www.facebook.com/groups/taylorsvillehighfootball" bgColor="#ffffff"/></li>
                    <li><SocialIcon className="insta" url="https://www.instagram.com/tvillewarriorfootball" bgColor="#ffffff"/></li>
                    <li><SocialIcon className="insta" url="https://twitter.com/tvillefb" bgColor="#ffffff"/></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container">
              © 2020 Copyright
              </div>
            </div>
          </footer>
        )
    }
}

export default Footer