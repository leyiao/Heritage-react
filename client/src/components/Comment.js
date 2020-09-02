import React from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    //----------------------------- Bindings -----------------------
    this.DeleteComment = this.DeleteComment.bind(this);
    this.CloseModal = this.CloseModal.bind(this);
    this.refreshComment = this.refreshComment.bind(this);
    this.EditComment = this.EditComment.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.UpdateComment = this.UpdateComment.bind(this);

    this.state = {
      uniqueID: this.props.uniqueID,
      show: false,
      show_edit: false,
      id: this.props.id,
      temp_edit: '',
      text: this.props.text,
      EditValidate: false,
    };
  }
  UpdateComment() {
    if (this.state.temp_edit.length === 0) {
      this.setState({
        EditValidate: true,
      });
    } else {
      const obj = {
        comment: this.state.temp_edit,
        uniqueID: this.state.uniqueID,
      };
      axios.put('/api/comment-edit', obj).then(resp => {
        if (resp.data === 'success') {
          this.setState({
            show_edit: false,
            text: this.state.temp_edit,
          });
        }
      });
    }
  }
  onChangeTitle(e) {
    if (e.target.placeholder === 'edit comment') {
      this.setState({
        temp_edit: e.target.value,
        EditValidate: true,
      });
    }
  }
  refreshComment() {
    this.props.DidMount(this.state.id);
  }
  CloseModal() {
    this.setState({
      show: false,
    });
  }
  EditComment() {
    this.setState({
      show_edit: true,
    });
  }

  DeleteComment() {
    this.setState({
      show: true,
    });
    var url1 = '/api/comment-delete/' + this.state.uniqueID;
    axios.delete(url1).then(resp => {
      if (resp.data === 'done') {
        this.setState({
          show: false,
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Card border="info" style={{ width: '100%', marginBottom: '1em' }}>
          <Card.Header
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <strong>{this.props.name}</strong>
            <div>
              <Button
                variant="outline-secondary"
                style={{ marginRight: '0.5em' }}
                onClick={this.EditComment}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button variant="danger" onClick={this.DeleteComment}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <div>
              {this.state.show_edit ? (
                <div>
                  <Form noValidate validated={this.state.EditValidate}>
                    <Form.Group controlId="formSelectCat">
                      <Form.Label>
                        <h4 className="darkGray">
                          <b>Edit here</b>
                          <br />
                        </h4>
                      </Form.Label>
                      <Form.Control
                        required
                        type="name"
                        defaultValue={this.state.text}
                        placeholder="edit comment"
                        onChange={this.onChangeTitle}
                        maxLength="50"
                      />
                      <Form.Control.Feedback type="invalid">
                        This section cannot be blank.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                  <Button variant="primary" onClick={this.UpdateComment}>
                    Done
                  </Button>
                </div>
              ) : (
                <Card.Text style={{ fontSize: '0.9em' }}>
                  {this.state.text}
                </Card.Text>
              )}
            </div>
          </Card.Body>

          <Card.Footer className="text-right">
            <small className="text-muted">{`${this.props.day}/${this.props.month}/${this.props.year}`}</small>
          </Card.Footer>
        </Card>

        <Modal show={this.state.show} size="m" onHide={this.CloseModal}>
          <Modal.Header>
            <Modal.Title>Comment is Deleted</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="primary" onClick={this.refreshComment}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
