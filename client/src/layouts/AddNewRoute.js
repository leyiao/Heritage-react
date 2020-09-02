import React, { Component } from 'react';
import AddNewArtifact from '../components/AddNewArtifact';
import {
  Container,
  Jumbotron,
} from 'react-bootstrap';
class AddNewRoute extends Component {
  render() {
    return (
      <div>
        <Container>
          <Jumbotron>
            <h1>Artifact Form</h1>
            <AddNewArtifact />
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default AddNewRoute;
