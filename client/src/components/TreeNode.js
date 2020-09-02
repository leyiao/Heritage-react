import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import { Badge } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './TreeNode.css';
import axios from 'axios';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    //----------------------------- Bindings -----------------------
    this.checkNullValue = this.checkNullValue.bind(this);

    this.state = {
      data: {},
      DOB: '',
      DOD: '',
      MaidenName: '',
    };
  }

  componentDidMount() {
    var url = '/api/users/' + this.props.userID;
    axios.get(url).then(resp => {
      this.setState({ data: resp.data[0] });
      //check null value

      // check DOB Year
      if (this.checkNullValue(this.state.data.DOBYear)) {
        // check DOB Month
        if (this.checkNullValue(this.state.data.DOBMonth)) {
          // check DOB Day
          if (this.checkNullValue(this.state.data.DOBDay)) {
            this.setState({
              DOB:
                this.state.data.DOBDay +
                '/' +
                this.state.data.DOBMonth +
                '/' +
                this.state.data.DOBYear,
            });
          } else {
            this.setState({
              DOB: this.state.data.DOBMonth + '/' + this.state.data.DOBYear,
            });
          }
        } else {
          this.setState({ DOB: this.state.data.DOBYear });
        }
      } else {
        this.setState({ DOB: '-' });
      }

      //check DOD Year
      if (this.checkNullValue(this.state.data.DODYear)) {
        // check DOD Month
        if (this.checkNullValue(this.state.data.DODMonth)) {
          // check DOD Day
          if (this.checkNullValue(this.state.data.DODDay)) {
            this.setState({
              DOD:
                this.state.data.DODDay +
                '/' +
                this.state.data.DODMonth +
                '/' +
                this.state.data.DOBYear,
            });
          } else {
            this.setState({
              DOD: this.state.data.DODMonth + '/' + this.state.data.DODYear,
            });
          }
        } else {
          this.setState({ DOD: this.state.data.DODYear });
        }
      } else {
        this.setState({ DOD: '-' });
      }

      //check MaidenName
      if (this.state.data.MaidenName !== 'null') {
        this.setState({ MaidenName: this.state.data.MaidenName });
      } else {
        this.setState({ MaidenName: '-' });
      }
    });
  }
  checkNullValue(value) {
    return value !== null;
  }
  render() {
    return (
      <OverlayTrigger
        trigger="click"
        placement="top"
        rootClose
        overlay={
          <Popover
            className="popover"
            id="popover-basic"
            style={{ width: 'auto', height: 'auto' }}
          >
            <Popover.Title as="h1">
              {this.state.data.Firstname + ' ' + this.state.data.Lastname}
            </Popover.Title>
            <Popover.Content>
              <b>Maiden Name:</b> {this.state.MaidenName}
              <br />
              <b>Date of Birth:</b> {this.state.DOB}{' '}
              <Badge variant="info">{this.state.data.AccuracyDOB}</Badge>
              <br />
              <b>Date of Death:</b> {this.state.DOD}{' '}
              <Badge variant="info">{this.state.data.AccuracyDOD}</Badge>
              <br />
            </Popover.Content>
          </Popover>
        }
      >
        <div
          className="TreeNode"
          style={{ marginLeft: `${this.props.margin}` }}
        >
          <div className={this.props.gender}>
            <Image
              className="img"
              src={this.props.src}
              alt="Card image"
              roundedCircle
              style={{objectFit:'cover'}}
            />
          </div>
          <div className="NodeName">{this.props.name}</div>
        </div>
      </OverlayTrigger>
    );
  }
}
export default TreeNode;
