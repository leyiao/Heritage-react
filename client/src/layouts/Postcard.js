import React, { Component } from "react";
import  CommentTextArea from '../components/CommentTextArea'
class Postcard extends Component {
  render() {
    
    return (
      <div>
        
        <h1> {"this is " + this.props.match.params.id} </h1>


        <CommentTextArea/>
      </div>
    );
  }
}

export default Postcard;
