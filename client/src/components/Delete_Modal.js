import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Delete_Modal extends Component {
  constructor(props, context) {
    super(props, context);
    //----------------------------- Bindings -----------------------
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);

    this.state = {
      show: false,
      redirect: false,
    };
  }

  handleConfirm() {
    var url = '/api/delete-post/' + this.props.pageNum;

    axios.delete(url).then(resp => console.log(resp.data));
    this.setState({
      show: false,
      redirect: true,
    });

    axios.delete(url).then(resp => console.log(resp.data));
    this.setState({
      show: false,
      redirect: true,
    });
  }
  handleRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/artifacts" />;
    }
  };
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {

    return (
      <>
        <Button
          variant="danger"
          onClick={this.handleShow}
          style={{ width: '100%' }}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 style={{ marginBottom: '0rem' }}>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete Artifact
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ marginBottom: '0em' }}>
              <b>Are you sure you would like to delete this artifact?</b>
              <br />
              (This action <i>cannot</i> be undone)
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            {this.handleRedirect()}
            <Button variant="danger" onClick={this.handleConfirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Delete_Modal;
