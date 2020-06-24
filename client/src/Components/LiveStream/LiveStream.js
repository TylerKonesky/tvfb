import React from 'react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import '../../bodysize.css';

class LiveStream extends React.Component{
    
    render(){
    
        return (
            <div className="container body-size">
                <h2>Tavlorsville Football</h2>
                {/* <ReactTwitchEmbedVideo channel="teepee"/> */}
            </div>
        ) 
    }
}

export default LiveStream