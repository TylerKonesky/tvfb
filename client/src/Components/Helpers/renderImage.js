import React, {Component} from 'react';
import Moment from 'moment';

function RenderImage(props) {
    const newString = props.image.split(',')
    return(
        <img className="bio-image activator image-size"src={`${newString[0]}, ${newString[1]}`} alt={props.alt}></img>
    )
}

export default RenderImage;
