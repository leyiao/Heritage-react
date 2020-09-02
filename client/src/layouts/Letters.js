import React, { Component } from "react";

class Letters extends Component {
  render() {
    
    return (
      <div>
        
        <h1> {"this is " + this.props.match.params.id} </h1>


        
      </div>
    );
  }
}

export default Letters;
