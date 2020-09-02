import React, { Component } from 'react';
import CommentTextArea from '../components/CommentTextArea';
import ArtifactDetail from '../components/ArtifactDetail';
import TagsArea from '../components/TagsArea';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Comment from '../components/Comment';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Card,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import '../App.css';
import ImageGallery from 'react-image-gallery';
import { WithContext as ReactTags } from 'react-tag-input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chips from 'react-chips';
import {
  faTags,
  faCommentDots,
  faScroll,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Delete_Modal from '../components/Delete_Modal';
import '../layouts/Photos.css';

import axios from 'axios';
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Photos extends Component {
  constructor(props) {
    super(props);
    //----------------------------- Bindings -----------------------
    this.ShowModal = this.ShowModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.CloseModal = this.CloseModal.bind(this);
    this.LocationSelection = this.LocationSelection.bind(this);
    this.watch_Location = this.watch_Location.bind(this);
    this.onChangeChips_Location = this.onChangeChips_Location.bind(this);
    this.onChangeChips_Owner = this.onChangeChips_Owner.bind(this);
    this.watch_Owner = this.watch_Owner.bind(this);
    this.postArtifact = this.postArtifact.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.state = {
      data: {},
      Existing_location: true,
      tags: [],
      tags_Modal: [],
      activeModal: false,
      DoneInitialLoading: false,
      pageImage: [],
      FamilyMember_FirstName: [],
      FamilyMember_Suggestion: [],
      Location: [],
      Location_Suggestion: [],
      Tagging: [],
      Tagging_Suggestion: [],
      DoneLoaded: false,
      acquireDate: '',
      //----- edit Artifact Temp holder-----//
      edit_title: '',
      edit_day: '',
      edit_month: '',
      edit_year: '',
      edit_accuracy: '',
      edit_description: '',
      edit_new_Location: '',

      //------------- Validation Status ------------------------
      TitleValidate: false,
      DayValidate: false,
      MonthValidate: false,
      YearValidate: false,
      AccuracyValidate: false,
      DescriptionValidate: false,
    
    };
  }
  componentDidMount() {
    var url = '/api/photo/' + this.props.match.params.id;

    //------------------- Get single artifact page details ---------------------//
    axios.get(url).then(resp => {
      this.setState({
        data: resp.data[0],
      });

      if (resp.data[0].Tags != null) {
        this.setState({
          tags: resp.data[0].Tags.split(','),
        });
      }
      // check Acquire Year
      if (this.state.data.DateAcquireYear !== null) {
        // check Acquire Month
        if (this.state.data.DateAcquireMonth !== null) {
          // check Acquire Day
          if (this.state.data.DateAcquireDay !== null) {
            this.setState({
              acquireDate:
                this.state.data.DateAcquireDay +
                ' / ' +
                this.state.data.DateAcquireMonth +
                ' / ' +
                this.state.data.DateAcquireYear,
            });
          } else {
            this.setState({
              acquireDate:
                this.state.data.DateAcquireMonth +
                ' / ' +
                this.state.data.DateAcquireYear,
            });
          }
        } else {
          this.setState({ acquireDate: this.state.data.DateAcquireYear });
        }
      } else {
        this.setState({ acquireDate: 'unknown' });
      }

      //----------------- Generate all possible user ------------------//
      axios.get('/api/users').then(resp => {
        var tempArr = [];
        var tempArr2 = [];

        for (var i = 0; i < resp.data.length; i++) {
          tempArr.push(
            'FM: ' + resp.data[i].Firstname + ' ' + resp.data[i].Lastname
          );
          tempArr2.push(resp.data[i].Firstname);
        }

        this.setState({
          FamilyMember_FirstName: tempArr2,
        });
      });
      //----------------- Generate all possible Year &&  Location including null values && Tagging Tags------------------//
      axios.get('/api/photo-all').then(resp => {
        var tempArr = [];
        var LocationArr = [];
        var EventArr = [];

        for (var i = 0; i < resp.data.length; i++) {
          //Event Tags

          var tags = resp.data[i].Tags;
          if (tags != null) {
            var tagsSplit = tags.split(',');

            tagsSplit.forEach(function(data) {
              if (EventArr.includes(data)) {
              } else {
                EventArr.push(data);
              }
            });
          }

          //Location
          if (LocationArr.includes(resp.data[i].Geotag) == true) {
            continue;
          } else if (resp.data[i].Geotag == null) {
            continue;
          } else {
            LocationArr.push(resp.data[i].Geotag);
          }
        }

        this.setState({
          Tagging: EventArr,
          Location: LocationArr,
          DoneLoaded: true,
        });

        for (var i = 0; i < EventArr.length; i++) {
          EventArr[i] = 'Tags: ' + EventArr[i];
        }

        for (var i = 0; i < LocationArr.length; i++) {
          LocationArr[i] = 'Location: ' + LocationArr[i];
        }
      });
    });

    // ------------------- Get single artifact page image---------------------//
    axios.get('/api/image-all').then(resp => {
      var tempArr = [];
      for (var i = 0; i < resp.data.length; i++) {
        if (resp.data[i].Artifact_ArtifactID == this.props.match.params.id) {
          tempArr.push(resp.data[i]);
        }
      }

      this.setState({
        pageImage: tempArr,
      });
      this.setState({
        DoneInitialLoading: true,
      });
    });
  }

  ShowModal() {
    var tags_temp = this.state.tags;
    var Json_Arr = [];

    for (var i = 0; i < tags_temp.length; i++) {
      Json_Arr.push({
        id: 'Tags: ' + tags_temp[i],
        text: 'Tags: ' + tags_temp[i],
      });
    }

    var arrr = [];
    var arr_owner = [];
    arrr.push(this.state.data.Geotag);
    arr_owner.push(this.state.data.CurrentOwner);
    this.setState({
      edit_title: this.state.data.Name,
      edit_day: this.state.data.DateAcquireDay,
      edit_month: this.state.data.DateAcquireMonth,
      edit_year: this.state.data.DateAcquireYear,
      edit_description: this.state.data.description,
      edit_accuracy: this.state.data.AccuracyAcquire,
      activeModal: true,
      chips_Location: arrr,
      chips_Owner: arr_owner,
      tags_Modal: Json_Arr,
      FamilyMember_Suggestion: this.state.FamilyMember_FirstName,
      Location_Suggestion: this.state.Location,
    });
  }

  handleAddition(tags) {
    var temp_Json = tags;
    var checkTag = temp_Json.id.split(':');
    if (checkTag[0] == 'Tags') {
    } else {
      temp_Json.id = 'Tags: ' + tags.id;
      temp_Json.text = 'Tags: ' + tags.text;
    }

    this.setState(state => ({ tags_Modal: [...state.tags_Modal, temp_Json] }));
  }

  handleDelete(i) {
    const { tags_Modal } = this.state;
    this.setState({
      tags_Modal: tags_Modal.filter((tags_Modal, index) => index !== i),
    });
  }
  CloseModal() {
    this.setState({
      activeModal: false,
    });
  }
  LocationSelection(e) {
    if (e.target.value == 1) {
      this.setState({
        Existing_location: false,
      });
    }
    if (e.target.value == 2) {
      this.setState({
        edit_new_Location: '',
        Existing_location: true,
        Location_Suggestion: this.state.Location,
      });
    }
  }
  onChangeChips_Location = chips_Location => {
    if (chips_Location.length == 0) {
      this.setState({
        Location_Suggestion: this.state.Location,
      });
    }
    this.setState({
      chips_Location,
    });
  };

  onChangeChips_Owner = chips_Owner => {
    if (chips_Owner.length == 0) {
      this.setState({
        FamilyMember_Suggestion: this.state.FamilyMember_FirstName,
      });
    }

    this.setState({
      chips_Owner,
    });
  };

  watch_Owner() {
    // watcher watch for search chips and restricts it to 1 tags
    if (this.state.chips_Owner != undefined) {
      var maximum_chips = 1;
      if (this.state.chips_Owner.length == maximum_chips) {
        this.state.FamilyMember_Suggestion = [];
      }
    }
  }
  watch_Location() {
    // watcher watch for search chips and restricts it to 1 tags
    if (this.state.chips_Location != undefined) {
      var maximum_chips = 1;
      if (this.state.chips_Location.length == maximum_chips) {
        this.state.Location_Suggestion = [];
      }
    }
  }
  postArtifact() {
    const obj = {
      title: this.state.edit_title,
      day: this.state.edit_day,
      month: this.state.edit_month,
      year: this.state.edit_year,
      accuracy: this.state.edit_accuracy,
      location: this.state.chips_Location,
      new_location: this.state.edit_new_Location,
      tags: this.state.tags_Modal,
      current_owner: this.state.chips_Owner,
      description: this.state.edit_description,
    };

    var url = '/api/edit/' + this.props.match.params.id;

    axios
      .put(url, obj)
      .then(response => {
        if (response.data == 'success') {
          window.location.reload();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeTitle(e) {
    //Artifact name
    if (e.target.placeholder == 'Artifact name') {
      this.setState({
        edit_title: e.target.value,
        TitleValidate: true,
      });
    }

    //Date
    if (e.target.placeholder == 'DD (Optional)') {
      this.setState({
        edit_day: e.target.value,
        DayValidate: true,
      });
    }
    if (e.target.placeholder == 'MM (Optional)') {
      this.setState({
        edit_month: e.target.value,
        MonthValidate: true,
      });
    }
    //Year
    if (e.target.placeholder == 'YYYY') {
      this.setState({
        edit_year: e.target.value,
        YearValidate: true,
      });
    }
    //Accuracy
    if (e.target.id == 'formSelectCat') {
      this.setState({
        edit_accuracy: e.target.value,
        AccuracyValidate: true,
      });
    }

    if (e.target.placeholder == 'Detailed artifact description...') {
      this.setState({
        edit_description: e.target.value,
        DescriptionValidate: true,
      });
    }
    //Location
    if (e.target.placeholder == 'Example: Melbourne') {
      this.setState({
        edit_new_Location: e.target.value,
      });
    }
  }

  render() {
    this.watch_Owner();
    this.watch_Location();

    //------------------ Loading the single artifact page image -------------------------------------//
    const images = [];
    if (this.state.DoneInitialLoading) {
      for (var i = 0; i < this.state.pageImage.length; i++) {
        const obj = {
          original: this.state.pageImage[i].FilePath,
          thumbnail: this.state.pageImage[i].FilePath,
        };
        images.push(obj);
      }
    }

    return (
      <React.Fragment>
        <div style={{ backgroundColor: '#1E1E1E' }}>
          <Container style={{ marginTop: '0em' }}>
            <ImageGallery items={images} thumbnailPosition="right" />
          </Container>
        </div>
        <Container>
     
          <Row>
            <Col sm={9}>
              <h1 style={{ fontSize: '1.75rem' }}> {this.state.data.Name} </h1>
            </Col>
            <Col sm={3}>
              <div>
                <Button
                  variant="secondary"
                  onClick={this.ShowModal}
                  style={{ width: '100%', marginBottom: '0.25rem' }}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>

                <Modal
                  show={this.state.activeModal}
                  size="xl"
                  onHide={this.CloseModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h2 style={{ marginBottom: '0rem' }}>
                        <FontAwesomeIcon icon={faEdit} /> Edit Artifact
                      </h2>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                      <Form noValidate validated={this.state.TitleValidate}>
                        <Form.Group>
                          <Form.Label>
                            <h4 className="darkGray">
                              <b>Artifact Name</b>
                              <br />
                            </h4>
                            <p style={{ marginBottom: '0rem' }}>
                              Artifact name should be no longer than{' '}
                              <b>50 characters</b>
                            </p>
                          </Form.Label>
                          <Form.Control
                            required
                            type="name"
                            defaultValue={this.state.data.Name}
                            placeholder="Artifact name"
                            onChange={this.onChangeTitle}
                            maxLength="50"
                          />
                          <Form.Control.Feedback type="invalid">
                            Artifact name is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form>
                      <Form.Label>
                        <h4 className="darkGray">
                          <b>Date Acquired</b>
                          <br />
                        </h4>
                        <p style={{ marginBottom: '0rem' }}>
                          Acquired <b>year</b> and <b>accuracy</b> required. Day
                          and Month are optional.
                        </p>
                      </Form.Label>
                      <Form.Row>
                        <Col md>
                          <Form noValidate validated={this.state.DayValidate}>
                            <Form.Group as={Col} controlId="formGrid">
                              <Form.Control
                                type="number"
                                placeholder="DD (Optional)"
                                defaultValue={this.state.data.DateAcquireDay}
                                min="1"
                                max="31"
                                onChange={this.onChangeTitle}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid day.
                              </Form.Control.Feedback>
                            </Form.Group>
                           </Form>
                        </Col>
                        <Col md>
                          <Form noValidate validated={this.state.MonthValidate}>
                            <Form.Group as={Col} controlId="formGrid" style={{ padding: '0rem' }}>
                              <Form.Control
                                type="number"
                                placeholder="MM (Optional)"
                                defaultValue={this.state.data.DateAcquireMonth}
                                min="1"
                                max="12"
                                onChange={this.onChangeTitle}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid month.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Col>

                        <Col md>
                            <Form noValidate validated={this.state.YearValidate}>
                              <Form.Group as={Col} controlId="formGrid" style={{ padding: '0rem' }}>
                                <Form.Control
                                  required
                                  type="number"
                                  placeholder="YYYY"
                                  defaultValue={this.state.data.DateAcquireYear}
                                  min="1700"
                                  max="2100"
                                  onChange={this.onChangeTitle}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a valid year.
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Form>
                        </Col>
                        <Col md>
                            <Form noValidate validated={this.state.AccuracyValidate}>
                              <Form.Group controlId="formSelectCat">
                                <Form.Control
                                  as="select"
                                  onChange={this.onChangeTitle}
                                  placeholder="AccuracyDate"
                                  defaultValue={this.state.data.AccuracyAcquire}
                                  required
                                >
                                  <option value="" disabled selected>
                                    Choose One
                                  </option>
                                  <option>Likely</option>
                                  <option>Accurate</option>
                                  <option>Documented</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  Please choose an accuracy
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Form>
                          </Col>
                      </Form.Row>

                      <Form.Group controlId="formLocation">
                        <Form.Label>
                          <h4 className="darkGray">
                            <b>Artifact Location</b>
                          </h4>
                        </Form.Label>
                        <div>
                          <ToggleButtonGroup
                            type="radio"
                            name="options"
                            defaultValue={[2]}
                            onClick={this.LocationSelection}
                          >
                            <ToggleButton value={1}>New Location</ToggleButton>
                            <ToggleButton value={2}>
                              Use Existing Location
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                        <br></br>

                        <div>
                          {this.state.Existing_location ? (
                            <Chips
                              value={this.state.chips_Location}
                              onChange={this.onChangeChips_Location}
                              suggestions={this.state.Location_Suggestion}
                              chipTheme={{
                                chip: {
                                  margin: '3px',
                                  padding: 5,
                                  background: '#0275d8',
                                  color: 'white',
                                  fontSize: '20px',
                                },
                              }}
                            />
                          ) : (
                            <Form.Control
                              required
                              type="name"
                              placeholder="Example: Melbourne"
                              onChange={this.onChangeTitle}
                            />
                          )}
                        </div>
                      </Form.Group>
                      <Form.Group controlId="formTag">
                        <Form.Label>
                          <h4 className="darkGray">
                            <b>Tags</b>
                          </h4>
                        </Form.Label>

                        <div>
                          <ReactTags
                            tags={this.state.tags_Modal}
                            suggestions={this.state.Tagging.map(output1 => {
                              return {
                                id: output1,
                                text: output1,
                              };
                            })}
                            delimiters={delimiters}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            allowDragDrop="false"
                          />
                        </div>
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group controlId="formCurrentOwner">
                            <Form.Label>
                              <h4 className="darkGray">
                                <b>Current Owner</b>
                              </h4>
                            </Form.Label>
                            <div>
                              <Chips
                                value={this.state.chips_Owner}
                                onChange={this.onChangeChips_Owner}
                                suggestions={this.state.FamilyMember_Suggestion}
                                chipTheme={{
                                  chip: {
                                    margin: '3px',
                                    padding: 5,
                                    background: '#0275d8',
                                    color: 'white',
                                    fontSize: '20px',
                                  },
                                }}
                              />
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form noValidate validated={this.state.DescriptionValidate}>             
                      <Form.Group controlId="formTextarea">
                        <Form.Label>
                          <h4 className="darkGray">
                            <b>Description</b>
                          </h4>
                        </Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          rows="5"
                          defaultValue={this.state.data.description}
                          placeholder="Detailed artifact description..."
                          onChange={this.onChangeTitle}
                        />
                        <Form.Control.Feedback type="invalid">
                          Artifact description required
                        </Form.Control.Feedback>
                      </Form.Group>
                      </Form>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.CloseModal}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      // onClick={this.handleClose}
                      type="submit"
                      onClick={this.postArtifact}
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Delete_Modal pageNum={this.props.match.params.id} />
              </div>
            </Col>
          </Row>
          <div className="span-divider"></div>
          <h4 className="darkGray">
            <FontAwesomeIcon icon={faTags} /> <b>Tags</b>
          </h4>
          <TagsArea tags={this.state.tags} />
          <div className="span-divider"></div>
          <div>
            <h4 className="darkGray">
              <FontAwesomeIcon icon={faScroll} /> <b>Description</b>
            </h4>
            <p>{this.state.data.description}</p>
          </div>
          <br></br>
          <h4 className="darkGray">
            <FontAwesomeIcon icon={faInfoCircle} /> <b>Detailed Information</b>
          </h4>
          <ArtifactDetail
            name={this.state.data.Name}
            yearAdd={this.state.data.DateAddedYear}
            monthAdd={this.state.data.DateAddedMonth}
            dateAdd={this.state.data.DateAddedDay}
            accuracy={this.state.data.AccuracyAcquire}
            dateAcq={this.state.acquireDate}
          />
          <h4 className="darkGray">
            <FontAwesomeIcon icon={faCommentDots} /> <b>Comments</b>
          </h4>
          <CommentTextArea id={this.props.match.params.id} />
        </Container>
      </React.Fragment>
    );
  }
}

export default Photos;
