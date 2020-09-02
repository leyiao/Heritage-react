import React from "react";
import PropTypes from 'prop-types';

const PhotoSample = ({property}) => {
    const {index, picture} = property;
    return (
        <div id={`PhotoSample-${index}`} className= 'PhotoSample'>
            <div className = "imgbg">
                <img className= 'rounded mb-0' src={'https://leonsharedstorage.s3-ap-southeast-2.amazonaws.com/long-res.jpg'} alt={index}/>
            </div>
            <div className="details">
                <span className="index">{index+1}</span>
            </div>
        </div>
    )
}
PhotoSample.propTypes = {
    property: PropTypes.object.isRequired
}
export default PhotoSample;
