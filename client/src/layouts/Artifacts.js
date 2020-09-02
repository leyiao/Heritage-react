import React, { Component } from 'react';
import { Container, Row, Jumbotron, Button } from 'react-bootstrap';
import './Artifacts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImages,
  faPlusCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

class Artifacts extends Component {
  render() {
    return (
      <React.Fragment>
        <Jumbotron
          fluid
          style={{
            backgroundColor: '#00617F',
            color: 'white',
            paddingTop: '0px',
          }}
        >
          <Container>
            <h1>
              <FontAwesomeIcon icon={faImages} /> Artifacts
            </h1>
          </Container>
        </Jumbotron>

        <Container>
          <Row>
            <Button
              href="/search/search-all"
              variant="primary"
              style={{
                width: '100%',
                paddingTop: '2em',
                paddingBottom: '2em',
                marginBottom: '1em',
                fontSize: '1.25em',
              }}
            >
              <FontAwesomeIcon icon={faSearch} /> View Photo Artifacts
            </Button>
          </Row>
          <Row>
            <Button
              href="/add-new"
              variant="primary"
              style={{
                width: '100%',
                paddingTop: '2em',
                paddingBottom: '2em',
                marginBottom: '1em',
                fontSize: '1.25em',
              }}
            >
              <FontAwesomeIcon icon={faPlusCircle} /> Add New Photo Artifacts
            </Button>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Artifacts;
