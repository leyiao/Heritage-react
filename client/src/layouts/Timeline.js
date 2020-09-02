import React, { Component } from 'react';
import {
  Container,
  Jumbotron,
  Button,
  Form,
  Modal,
  CardColumns,
  Row,
  Col,
} from 'react-bootstrap';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { ArtifactCard } from '../components/ArtifactCard';

class Timeline extends Component {
  constructor(props) {
    super(props);
    //----------------------------- Bindings -----------------------
    this.RangeLowerInput = this.RangeLowerInput.bind(this);
    this.RangeUpperInput = this.RangeUpperInput.bind(this);
    this.SearchByRange = this.SearchByRange.bind(this);
    this.YearValidation = this.YearValidation.bind(this);
    this.ShowModal = this.ShowModal.bind(this);
    this.CloseModal = this.CloseModal.bind(this);
    this.GetImgData = this.GetImgData.bind(this);
    this.DisplayAll = this.DisplayAll.bind(this);

    this.state = {
      // validation status
      lowerYearValidation: false,
      upperYearValidation: false,

      //Search by range
      searchRangeLower: '',
      searchRandeUpper: '',

      data: {},

      // error message for validation
      orderError: '',

      //active modal
      activeModal: false,
      YearToModal: '',
      DataInModal: {},
      ImgData: {},

      //hint for showing search has done
      searchResult:'',
    };
  }

  RangeLowerInput(e) {
    var yearCheck = this.YearValidation(e.target.value);
    if (yearCheck) {
      this.setState({
        searchRangeLower: e.target.value,
      });
    }
    this.setState({
      lowerYearValidation: true,
    });
  }

  RangeUpperInput(e) {
    var yearCheck = this.YearValidation(e.target.value);
    if (yearCheck) {
      this.setState({
        searchRangeUpper: e.target.value,
      });
    }
    this.setState({
      upperYearValidation: true,
    });
  }
  //initialize all aritfacts
  componentDidMount() {
    this.DisplayAll();
  }
  // Generate all aritifacts
  DisplayAll() {
    axios.get('/api/timeline').then(resp => {
      var All_Year_Data = [];
      for (var i = 0; i < resp.data.length; i++) {
        All_Year_Data.push(resp.data[i].DateAcquireYear);
      }
      var Unique_Year_data = [...new Set(All_Year_Data)];
      document.getElementById("clear_lower").reset();
      document.getElementById("clear_upper").reset();
      this.setState({ 
        data: Unique_Year_data.sort(),
        searchResult: "All artifacts:",
        lowerYearValidation: false,
        upperYearValidation: false,
      });
    });

  }
  SearchByRange() {
    if (this.state.searchRangeLower < this.state.searchRangeUpper) {
      axios
        .get('/api//timeline/range', {
          params: {
            lowerYear: this.state.searchRangeLower,
            upperYear: this.state.searchRangeUpper,
          },
        })
        .then(resp => {
          //this is from the backend
          var All_Year_Data = [];
          for (var i = 0; i < resp.data.length; i++) {
            All_Year_Data.push(resp.data[i].DateAcquireYear);
          }
          var Unique_Year_data = [...new Set(All_Year_Data)];
          this.setState({ data: Unique_Year_data.sort() });
        });
      this.setState({
        orderError: '',
        searchResult: 'Artifacts from Year ' + this.state.searchRangeLower + ' to Year ' + this.state.searchRangeUpper + ': ',
      });
    } else {
      this.setState({
        orderError: 'First number should be smaller than the second',
      });
    }
  }
  YearValidation(year) {
    if (year >= 1900 && year <= 2040) {
      return true;
    }
  }

  //active modal

  ShowModal(event) {
    var test = event.target.parentNode.parentNode.getElementsByClassName(
      'vertical-timeline-element-title'
    )[0];
    var year = test.getElementsByTagName('b')[0].innerHTML;

    this.setState({
      activeModal: true,
      YearToModal: year,
    });
    axios
      .get('/api/timeline/year', {
        params: {
          searchYear: year,
        },
      })
      .then(resp => {
        this.setState({ DataInModal: resp.data });
        this.GetImgData(resp.data);
      });
  }

  //Deactive modal
  CloseModal() {
    this.setState({
      activeModal: false,
      DataInModal: {},
    });
  }
  GetImgData(data) {
    axios.get('/api/image-single').then(resp => {
      this.setState({ ImgData: resp.data });
    });
  }

  render() {
    let All_Search_Artifact = [];
    for (var i = 0; i < this.state.data.length; i++) {
      All_Search_Artifact.push(
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon=<FontAwesomeIcon icon={faClock} />
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ marginBottom: '0.2em' }}
          >
            <b>{this.state.data[i]}</b>
          </h3>
          <div>
            <Button
              variant="outline-primary"
              onClick={e => {
                this.ShowModal(e);
              }}
            >
              View artifacts
            </Button>
            <Modal open={this.state.activeModal} year={this.state.YearToModal}>
              ...
            </Modal>
          </div>
        </VerticalTimelineElement>
      );
    }
    //array for the artifacts card in modal
    let Artifact_In_Modal = [];
    if (this.state.activeModal) {
      for (var i = 0; i < this.state.DataInModal.length; i++) {
        var img_path = '';
        for (var j = 0; j < this.state.ImgData.length; j++) {
          if (
            this.state.ImgData[j].Artifact_ArtifactID ===
            this.state.DataInModal[i].ArtifactID
          ) {
            img_path = this.state.ImgData[j].FilePath;
            break;
          }
        }
        Artifact_In_Modal.push(
          <ArtifactCard
            title={this.state.DataInModal[i].Name}
            link={'/photos/' + this.state.DataInModal[i].ArtifactID}
            img={img_path}
          />
        );
      }
    }

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
          <Container style={{ marginTop: '1em' }}>
            <h1>
              <FontAwesomeIcon icon={faCalendarWeek} /> Timeline
            </h1>
            {/* Search bar */}
            <div>
              <Form.Label>
                <h3>Enter a year range</h3>
              </Form.Label>
              <Row>
                <Col md>
                  {/* onSubmit Handler prevents 'Enter' key from 'Submitting' form */}
                  <Form
                    noValidate
                    validated={this.state.lowerYearValidation}
                    onSubmit={e => {
                      e.preventDefault();
                    }}
                    id = "clear_lower"
                  >
                    <Form.Group controlId="lowerYear">
                      <Form.Label>Minimum Year</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="From"
                        onChange={this.RangeLowerInput}
                        min="1900"
                        max="2040"
                        style={{ width: '100%' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter number between 1900-2040
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md>
                  {/* onSubmit Handler prevents 'Enter' key from 'Submitting' form */}
                  <Form
                    noValidate
                    validated={this.state.upperYearValidation}
                    onSubmit={e => {
                      e.preventDefault();
                    }}
                    id = "clear_upper"
                  >
                    <Form.Group controlId="upperYear">
                      <Form.Label>Maximum Year</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="To"
                        onChange={this.RangeUpperInput}
                        min="1900"
                        max="2040"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter number between 1900-2040
                      </Form.Control.Feedback>
                      <span>{this.state.orderError}</span>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Button
                    variant="primary"
                    onClick={this.SearchByRange}
                    style={{ width: '100%', marginBottom: '1em' }}
                  >
                    Search
                  </Button>
                </Col>
                <Col md>
                  <Button
                    variant="secondary"
                    onClick={this.DisplayAll}
                    style={{ width: '100%' }}
                  >
                    View All Artifacts (Reset)
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </Jumbotron>
        <Container>
          <h5> {this.state.searchResult}</h5>
          <Jumbotron>
            <VerticalTimeline>{All_Search_Artifact}</VerticalTimeline>
          </Jumbotron>
        </Container>

        <Modal
          show={this.state.activeModal}
          onHide={this.CloseModal}
          animation={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title h1>
              Artifacts in year <b>{this.state.YearToModal}</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CardColumns>
              <div>{Artifact_In_Modal}</div>
            </CardColumns>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={this.CloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Timeline;
