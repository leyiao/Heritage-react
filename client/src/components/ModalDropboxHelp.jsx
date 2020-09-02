import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Image } from 'react-bootstrap';
import dropboxSS1 from '../assets/dropboxSS1.png';
import dropboxSS2 from '../assets/dropboxSS2.png';

class ModalDropboxHelp extends Component {
  constructor(props, context) {
    super(props, context);
    //----------------------------- Bindings -----------------------
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    console.log(this.state.data);

    return (
      <>
        <Button variant="secondary" size="sm" onClick={this.handleShow}>
          View Dropbox Guide
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 style={{ marginBottom: '0rem' }}>
                Dropbox Photo Sharing Guide
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display:'flex', flexDirection:'column', alignItems: 'center', width: '100%' }}>
              <Image src={dropboxSS1} rounded style={{ width: '100%' }} />
              <Image src={dropboxSS2} rounded style={{ width: '100%' }} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalDropboxHelp;
