import React from 'react';

function RenderImage(props) {

    if(props.image === null){
        return null
    }
    const newString = props.image.split(',')
    return(
        <img className={`bio-image activator ${props.classProp}`} src={`${newString[0]}, ${newString[1]}`} alt={props.alt}></img>
    )
}

export default RenderImage;
