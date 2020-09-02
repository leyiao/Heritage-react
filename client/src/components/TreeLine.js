import React, { Component } from "react";

class TreeLine extends Component {
    render(){
        return(
            <div>
                    <svg height={this.props.height} width={this.props.width}>
                        <polyline 
                            points = {this.props.startPoint + " "+ this.props.point2 + " "+ this.props.point3 + " "+ this.props.endPoint}
                            stroke="#4d2800" 
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
        );
    }
}
export default TreeLine;