import React, { Component } from 'react';
import AddNewArtifact from '../components/AddNewArtifact';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <AddNewArtifact/>
      </React.Fragment>
    );
  }
}

export default Form;
