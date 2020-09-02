import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  Col,
  Row,
  ToggleButtonGroup,
  ToggleButton,
  Spinner,
} from 'react-bootstrap';
import axios from 'axios';
import Chips from 'react-chips';
import './ReactTagsTest.css';
import { WithContext as ReactTags } from 'react-tag-input';

import ModalDropboxHelp from '../components/ModalDropboxHelp';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class AddNewArtifact extends Component {
  constructor(props) {
    super(props);
    //----------------------------- Bindings -----------------------
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.watch_Location = this.watch_Location.bind(this);
    this.watch_Tag = this.watch_Tag.bind(this);
    this.watch_Owner = this.watch_Owner.bind(this);
    this.LocationSelection = this.LocationSelection.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.postArtifact = this.postArtifact.bind(this);
    this.onChangeChips_Location = this.onChangeChips_Location.bind(this);
    this.onChangeChips_Owner = this.onChangeChips_Owner.bind(this);

    //-----------------------------------------------------------
    this.state = {
      //------------- Post to database ------------------------
      title: '',
      acquireYear: '',
      acquireMonth: '',
      acuqireDay: '',
      accuracy: '',
      Description: '',
      New_Location: '',
      photo_1: '',
      photo_2: '',
      photo_3: '',
      photo_4: '',
      redirect: false,
      redirectid: '',
      //------------- Validation Status ------------------------
      TitleValidate: false,
      DayValidate: false,
      MonthValidate: false,
      YearValidate: false,
      AccuracyValidate: false,
      DescriptionValidate: false,
      Link1Validate: false,
      Link2Validate: false,
      Link3Validate: false,
      Link4Validate: false,

      //------------ get from database -------------------
      data: {},
      user: [],
      DoneLoaded: false,

      //--------------- On off Tags and location selection -------
      Existing_location: false,

      tags: [],

      //----------------Tags -------------------
      Location: [],
      Location_Suggestion: [],
      Tagging: [],
      Tagging_Suggestion: [],
      FamilyMember_FirstName: [],
      FamilyMember_Suggestion: [],
    };
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
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
        FamilyMember: tempArr,
        FamilyMember_FirstName: tempArr2,
        FamilyMember_Suggestion: tempArr2,
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
        if (LocationArr.includes(resp.data[i].Geotag) === true) {
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

      for (var i = 0; i < tempArr.length; i++) {
        tempArr[i] = 'Year: ' + tempArr[i];
      }
      for (var i = 0; i < LocationArr.length; i++) {
        LocationArr[i] = 'Location: ' + LocationArr[i];
      }
    });
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tags, index) => index !== i),
    });
  }

  handleAddition(tags) {
    var temp_Json = tags;
    var checkTag = temp_Json.id.split(':');
    if (checkTag[0] === 'Tags') {
    } else {
      temp_Json.id = 'Tags: ' + tags.id;
      temp_Json.text = 'Tags: ' + tags.text;
    }

    this.setState(state => ({ tags: [...state.tags, temp_Json] }));
  }

  LocationSelection(e) {
    if (e.target.value === 1) {
      this.setState({
        Existing_location: false,
      });
    }
    if (e.target.value === 2) {
      this.setState({
        Existing_location: true,
        Location_Suggestion: this.state.Location,
      });
    }
  }
  onChangeTitle(e) {
    //Artifact name
    if (e.target.placeholder === 'Artifact name') {
      this.setState({
        title: e.target.value,
        TitleValidate: true,
      });
    }

    //Date
    if (e.target.placeholder === 'DD (Optional)') {
      this.setState({
        acquireDay: e.target.value,
        DayValidate: true,
      });
    }
    if (e.target.placeholder === 'MM (Optional)') {
      this.setState({
        acquireMonth: e.target.value,
        MonthValidate: true,
      });
    }
    //Year
    if (e.target.placeholder === 'YYYY') {
      this.setState({
        acquireYear: e.target.value,
        YearValidate: true,
      });
    }
    //Accuracy
    if (e.target.id === 'formSelectCat') {
      this.setState({
        accuracy: e.target.value,
        AccuracyValidate: true,
      });
    }
    //Description
    if (e.target.placeholder ==='Detailed artifact description...') {
      this.setState({
        Description: e.target.value,
        DescriptionValidate: true,
      });
    }
    //Location
    if (e.target.placeholder === 'Example: Melbourne') {
      this.setState({
        New_Location: e.target.value,
      });
    }
    //Photo, link of dropbox
    if (
      e.target.placeholder ===
      'Example: https://www.dropbox.com/s/wrl246ax7v5x3y3/photo_1-1.jpg?raw=1'
    ) {
      this.setState({
        photo_1: e.target.value,
        Link1Validate: true,
      });
    }
    if (
      e.target.placeholder ===
      '(Optional) Example: https://www.dropbox.com/s/wrl246ax7v5x3y3/photo_2-1.jpg?raw=1'
    ) {
      this.setState({
        photo_2: e.target.value,
        Link2Validate: true,
      });
    }
    if (
      e.target.placeholder ===
      '(Optional) Example: https://www.dropbox.com/s/wrl246ax7v5x3y3/photo_3-1.jpg?raw=1'
    ) {
      this.setState({
        photo_3: e.target.value,
        Link3Validate: true,
      });
    }
    if (
      e.target.placeholder ===
      '(Optional) Example: https://www.dropbox.com/s/wrl246ax7v5x3y3/photo_4-1.jpg?raw=1'
    ) {
      this.setState({
        photo_4: e.target.value,
        Link4Validate: true,
      });
    }
  }

  onChangeChips_Location = chips_Location => {
    this.setState({
      chips_Location,
    });
  };

  onChangeChips_Owner = chips_Owner => {
    if (chips_Owner.length === 0) {
      this.setState({
        FamilyMember_Suggestion: this.state.FamilyMember_FirstName,
      });
    }

    this.setState({
      chips_Owner,
    });
  };
  postArtifact() {
    const obj = {
      title: this.state.title,
      acquireYear: this.state.acquireYear,
      acquireMonth: this.state.acquireMonth,
      acquireDay: this.state.acquireDay,
      accuracy: this.state.accuracy,
      Location_Tag: this.state.chips_Location,
      New_Location: this.state.New_Location,
      Tag: this.state.tags,
      CurrentOwner: this.state.chips_Owner[0],
      Description: this.state.Description,
      photo_1: this.state.photo_1,
      photo_2: this.state.photo_2,
      photo_3: this.state.photo_3,
      photo_4: this.state.photo_4,
    };

    // post to database
    axios
      .post('/api/new', obj)
      .then(response => {
        this.setState({
          redirectid: response.data,
          redirect: true,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleRedirect = () => {
    if (this.state.redirect) {
      var url = '/photos/' + this.state.redirectid;
      return <Redirect to={url} />;
    }
  };
  watch_Location() {
    // watcher watch for search chips and restricts it to 1 tags
    if (this.state.chips_Location !== undefined) {
      var maximum_chips = 1;
      if (this.state.chips_Location.length === maximum_chips) {
        this.state.Location_Suggestion = [];
      }
    }
  }

  watch_Tag() {
    // watcher watch for search chips and restricts it to 5 tags
    if (this.state.chips_Tag !== undefined) {
      var maximum_chips = 5;
      if (this.state.chips_Tag.length === maximum_chips) {
        this.state.Tagging_Suggestion = [];
      }
    }
  }

  watch_Owner() {
    // watcher watch for search chips and restricts it to 1 tags
    if (this.state.chips_Owner !== undefined) {
      var maximum_chips = 1;
      if (this.state.chips_Owner.length === maximum_chips) {
        this.state.FamilyMember_Suggestion = [];
      }
    }
  }

  render() {
    this.watch_Location();
    this.watch_Tag();
    this.watch_Owner();
    const Loaded = this.state.DoneLoaded;

    //------------------------ Show loading spinner if data is yet loaded from the backend --------------
    if (Loaded === true) {
      return (
        <Form onSubmit={this.submitHandler}>
          <h3>Please enter the details of your artifact</h3>
          <p>Fields marked with * are required</p>
          <br />
          <Form noValidate validated={this.state.TitleValidate}>
            <Form.Group>
              <Form.Label>
                <h4 className="darkGray">
                  <b>Artifact Name*</b>
                  <br />
                </h4>
                <p style={{ marginBottom: '0rem' }}>
                  Artifact name should be no longer than <b>50 characters</b>
                </p>
              </Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Artifact name"
                onChange={this.onChangeTitle}
                maxLength="50"
              />
              <Form.Control.Feedback type="invalid">
                Artifact name is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <div className="span-divider"></div>
          <Form.Label>
            <h4 className="darkGray">
              <b>Date Acquired</b>
              <br />
            </h4>
            <p style={{ marginBottom: '0rem' }}>
              Acquired <b>year</b> and <b>accuracy</b> required. Day and Month
              are optional.
            </p>
          </Form.Label>
          <Row style={{ width: '100%' }}>
            <Col md>
              <Form noValidate validated={this.state.DayValidate}>
                <Form.Group controlId="formGrid">
                  <Form.Label>
                    <p>Day</p>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="DD (Optional)"
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
                <Form.Group controlId="formGrid" style={{ padding: '0rem' }}>
                  <Form.Label>
                    <p>Month</p>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="MM (Optional)"
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
                  <Form.Label>
                    <p>Year*</p>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="YYYY"
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
                  <Form.Label>
                    <p>Accuracy*</p>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.onChangeTitle}
                    placeholder="AccuracyDate"
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
          </Row>
          <div className="span-divider"></div>
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
                defaultValue={[1]}
                onClick={this.LocationSelection}
              >
                <ToggleButton value={1}>New Location</ToggleButton>
                <ToggleButton value={2}>Use Existing Location</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <br></br>

            <div>
              <p style={{ marginBottom: '0rem' }}>
                Include <b>only one</b> Location*
                <br />
              </p>
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
          <div className="span-divider"></div>
          <Form.Group controlId="formTag">
            <Form.Label>
              <h4 className="darkGray">
                <b>Tags</b>
              </h4>
            </Form.Label>
            <div>
              <p style={{ marginBottom: '0rem' }}>
                Include <b>at least one</b> Tag*
                <br />
              </p>
              <ReactTags
                tags={this.state.tags}
                suggestions={this.state.Tagging.map(output1 => {
                  return {
                    id: output1,
                    text: output1,
                  };
                })}
                delimiters={delimiters}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                handleTagClick={this.handleTagClick}
                allowDragDrop={false}
                autofocus={false}
              />
            </div>
          </Form.Group>
          <div className="span-divider"></div>
          <Row>
            <Col>
              <Form.Group controlId="formCurrentOwner">
                <Form.Label>
                  <h4 className="darkGray">
                    <b>Current Owner</b>
                  </h4>
                </Form.Label>
                <div>
                  <p style={{ marginBottom: '0rem' }}>
                    Include <b>only one</b> Current Owner*
                    <br />
                  </p>
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
          <div className="span-divider"></div>
          <Form noValidate validated={this.state.DescriptionValidate}>
            <Form.Group controlId="formTextarea">
              <Form.Label>
                <h4 className="darkGray">
                  <b>Description</b>
                </h4>
                <p>Include a description for the Photo Artifact*</p>
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="5"
                placeholder="Detailed artifact description..."
                onChange={this.onChangeTitle}
              />
              <Form.Control.Feedback type="invalid">
                Artifact description required
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <div className="span-divider"></div>
          <Form.Label>
            <h4 className="darkGray">
              <b>Dropbox Image Link(s)</b>
              <br />
            </h4>
            <p style={{ marginBottom: '0rem' }}>
              Include <b>at least one</b> Dropbox Image Link*. Insert up to 4 per
              Photo Artifact entry.
              <br />
            </p>
            <ModalDropboxHelp />
          </Form.Label>

          <Form noValidate validated={this.state.Link1Validate}>
            <Form.Group controlID="dropboxLink1">
              <Form.Control
                required
                as="input"
                type="url"
                placeholder="Example: https://www.dropbox.com/s/wrl246ax7v5x3y3/photo_1-1.jpg?raw=1"
                onChange={this.onChangeTitle}
                style={{ marginBottom: '0.5rem' }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid Dropbox Link
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          <Form noValidate validated={this.state.Link2Validate}>
            <Form.Group controlID="dropboxLink2">
              <Form.Control
                as="input"
                type="url"
                placeholder="(Optional) Example: https://www.dropbox.com/s/wrl246ax7v5x3y3/photo_2-1.jpg?raw=1"
                onChange={this.onChangeTitle}
                style={{ marginBottom: '0.5rem' }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid Dropbox Link
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          <Form noValidate validated={this.state.Link3Validate}>
            <Form.Group controlID="dropboxLink3">
              <Form.Control
                as="input"
                type="url"
                placeholder="(Optional) Example: https://www.dropbox.com/s/wrl246ax7v5x3y3/photo_3-1.jpg?raw=1"
                onChange={this.onChangeTitle}
                style={{ marginBottom: '0.5rem' }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid Dropbox Link
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          <Form noValidate validated={this.state.Link4Validate}>
            <Form.Group controlID="dropboxLink4">
              <Form.Control
                as="input"
                type="url"
                placeholder="(Optional) Example: https://www.dropbox.com/s/wrl246ax7v5x3y3/photo_4-1.jpg?raw=1"
                onChange={this.onChangeTitle}
                style={{ marginBottom: '0.25rem' }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid Dropbox Link
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          {this.handleRedirect()}

          <Button variant="primary" onClick={this.postArtifact}>
            Submit
          </Button>
        </Form>
      );
    } else {
      return (
        <div>
          <br />
          <h3> loading.....</h3>
          <Spinner animation="grow" variant="primary" />
        </div>
      );
    }
  }
}

export default AddNewArtifact;
