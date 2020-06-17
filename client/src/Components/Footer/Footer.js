import React, {Component} from 'react';
import {SocialIcon} from 'react-social-icons'
import './Footer.css'
import '../../bodysize.css'

class Footer extends Component{
    render(){
        return(
            <footer class="page-footer footer-background ">
            <div class="container">
              <div class="row">
                {/* <div class="col l6 s12">
                  <h5 class="white-text">Footer Content</h5>
                  <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                </div> */}
                <div class="col l4 offset-l2 s12">
                  <ul className="buttons">
                    <li><SocialIcon url="https://www.facebook.com/TvilleHS" bgColor="#ffffff"/></li>
                    <li><SocialIcon className="insta" url="https://www.instagram.com/tvillewarriorfootball" bgColor="#ffffff"/></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="footer-copyright">
              <div class="container">
              © 2020 Copyright
              </div>
            </div>
          </footer>
        )
    }
}

export default Footer