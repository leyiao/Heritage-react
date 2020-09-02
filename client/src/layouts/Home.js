import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Jumbotron,
  Image,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import '../App.css';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      imageData: [],
      imageArtifactNum: [],
      DoneLoadedImage1: false,
      DoneLoadedImage2: false,
      DoneLoadedImage3: false,

      array_of_all: [],
    };
  }

  componentDidMount() {
    axios.get('/api/users').then(resp => {
      this.setState({ data: resp.data[0], DoneLoadedImage1: true });
    });
    axios.get('/api/photo-all').then(resp => {
      this.setState({
        array_of_all: resp.data,
        DoneLoadedImage2: true,
      });
    });

    //------------------ Get cover image of each page -------------------/
    axios.get('/api/image-single').then(resp => {
      var arr = [];

      for (var i = 0; i < resp.data.length; i++) {
        arr.push(resp.data[i].ArtifactImageID);
      }
      this.setState({
        imageData: resp.data,
        imageArtifactNum: arr,
        DoneLoadedImage3: true,
      });
    });
  }

  render() {
    function GenerateRandom(arr) {
        /* eslint-disable no-extend-native  */
      Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)];
      };
       /* eslint-enable no-extend-native  */
      var temparr = [];
      while (true) {
        var new_num = arr.random();
        if (temparr.length === 5) {
          break;
        }
        if (temparr.includes(new_num)) {
        } else {
          temparr.push(new_num);
        }
      }
      return temparr;
    }
    if (
      this.state.DoneLoadedImage1 &&
      this.state.DoneLoadedImage2 &&
      this.state.DoneLoadedImage3
    ) {
      var temp = [];
      var RandomNumberArray = [];
      var Images = [];
      //Get all availiable artifact ID
      for (var i = 0; i < this.state.array_of_all.length; i++) {
        temp.push(this.state.array_of_all[i].ArtifactID);
      }

      //Get 5 random ArtifactID
      RandomNumberArray = GenerateRandom(temp);

      //Getting artifact with that id's
      for (i = 0; i < RandomNumberArray.length; i++) {
        for (var j = 0; j < this.state.imageData.length; j++) {
          if (
            this.state.imageData[j].Artifact_ArtifactID === RandomNumberArray[i]
          ) {
            Images.push(
              <Link
                to={`/photos/${this.state.imageData[j].Artifact_ArtifactID}`}
              >
                <Image
                  style={{
                    width: 200,
                    height: 230,
                    marginLeft: '7px',
                    marginRight: '7px',
                    objectFit: 'cover',
                    marginBottom: '7px',
                  }}
                  src={this.state.imageData[j].FilePath}
                  thumbnail
                />
              </Link>
            );
          }
        }
      }

      return (
        <React.Fragment>
          <Jumbotron
            fluid
            className="jumbotronHome"
            style={{ backgroundColor: '#00617F', color: 'white' }}
          >
            <h3>Welcome to</h3>
            <h1>Leon Sterling's Family Photo Artifacts</h1>
            <p>
              This web application is created by Team LECXE on basis of IT
              Project COMP30022
            </p>
          </Jumbotron>
          <Container>
            <Jumbotron className="jumbotronHome">
              <h2>Highlights</h2>
              <p>
                Revisit the past through a randomly selected set of artifacts
              </p>
              <Row>{<div>{Images}</div>}</Row>
              <br></br>
              <Button variant="primary" href="/artifacts">
                Browse Artifacts
              </Button>
            </Jumbotron>
            <Row>
              <Col md>
                <Jumbotron
                  className="jumbotronHome"
                  style={{ minHeight: '300px', marginBottom: '1em' }}
                >
                  <h2>Family Tree</h2>
                  <p>
                    Discover the lineage of Leon Sterling's family like never
                    before
                  </p>
                  <Button variant="primary" href="/familytree">
                    Explore Family Tree
                  </Button>
                </Jumbotron>
                <br></br>
              </Col>
              <Col md>
                <Jumbotron
                  className="jumbotronHome"
                  style={{ minHeight: '300px', marginBottom: '1em' }}
                >
                  <h2>Timeline</h2>
                  <p>Find out what happened and when</p>
                  <Button variant="primary" href="/timeline">
                    Browse Timeline
                  </Button>
                </Jumbotron>
                <br></br>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <h3> Loading ....</h3>
          <Spinner animation="grow" variant="primary" />
        </div>
      );
    }
  }
}

export default Home;
