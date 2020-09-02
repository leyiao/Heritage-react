import React, { Component }from "react";
import Slider from 'react-slick';
import "./Album.css"
import PhotoSample from './PhotoSample';
import data from './fake-data/FakeData';

export class Album extends Component{

    constructor(props){
      super(props);
      this.state = {
        properties: data.properties,
        property: data.properties[0]
      }
    }
    render() {
      const {properties} = this.state;
      var settings = {
        dots: true,
        dotsClass: "slick-dots",
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "1px",
        slidesToShow: 3,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
      return (
        <div className="Album">
              <Slider {...settings}>
                {
                  properties.map(property => <PhotoSample key={property._id} property={property} />)
                }
                </Slider>
        </div>

      );
    }
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "inline", background: "blue", border : "solid"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className,style,onClick } = props;
    return (
      <div 
            className={className}
            onClick={onClick}
            style={{ ...style, display: "block", background: "black" }}
        >
        </div>
    );
  }
