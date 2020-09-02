import React, { Component } from 'react';
import { Form, Jumbotron, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Comment from '../components/Comment';

class CommentTextArea extends Component {
  constructor(props) {
    super(props);
    //----------------------------- Bindings -----------------------
    this.postComment = this.postComment.bind(this);
    this.storeValue = this.storeValue.bind(this);
    this.CloseModal = this.CloseModal.bind(this);
    this.refreshComment = this.refreshComment.bind(this);
    this.handleDidMount = this.handleDidMount.bind(this);
    this.state = {
      comment: '',
      name: ' ',
      show: false,
      exist_comment: [],
      id: this.props.id,
      NameValidate: false,
      CommentValidate: false,
    };
  }

  componentDidMount() {
    var url1 = '/api/comment/' + this.state.id;
    axios.get(url1).then(resp => {
      this.setState({ exist_comment: resp.data });
    });
  }

  handleDidMount(num) {
    this.setState({
      id: num,
    });
    this.componentDidMount();
  }
  refreshComment() {
    this.componentDidMount();
    this.setState({
      show: false,
    });
  }
  CloseModal() {
    this.setState({
      show: false,
    });
  }

  storeValue(e) {
    if (e.target.placeholder === 'Give a name') {
      this.setState({
        name: e.target.value,
        NameValidate: true,
      });
    }
    if (e.target.placeholder === 'Comment') {
      this.setState({
        comment: e.target.value,
        CommentValidate: true,
      });
    }
  }

  postComment() {
    if (this.state.name === ' ' || this.state.comment.length === 0) {
      if (this.state.name === ' ') {
        this.setState({
          NameValidate: true,
        });
      }
      if (this.state.comment.length === 0) {
        this.setState({
          CommentValidate: true,
        });
      }
    } else if (this.state.name === ' ' && this.state.comment.length === 0) {
      this.setState({
        CommentValidate: true,
        NameValidate: true,
      });
    } else {
      const obj = {
        name: this.state.name,
        comment: this.state.comment,
        id: this.props.id,
      };
      axios.post('/api/comment-add', obj).then(resp => {
        if (resp.data === 'success') {
          this.setState({
            show: true,
          });
        }
      });
    }
  }
  render() {
    var comment_holder = [];

    for (var i = 0; i < this.state.exist_comment.length; i++) {
      comment_holder.push(
        <Comment
          id={this.state.id}
          name={this.state.exist_comment[i].name}
          text={this.state.exist_comment[i].Comment}
          day={this.state.exist_comment[i].day}
          month={this.state.exist_comment[i].month}
          year={this.state.exist_comment[i].year}
          uniqueID={this.state.exist_comment[i].uniqueID}
          DidMount={this.handleDidMount}
        />
      );
    }
    return (
      <React.Fragment>
        <Jumbotron style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <Form noValidate validated={this.state.NameValidate}>
            <Form.Group controlId="formSelectCat">
              <Form.Label>
                <p style={{ marginBottom: '0.1em' }}>
                  <b>Name:</b>
                </p>
              </Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Give a name"
                onChange={this.storeValue}
                maxLength="50"
              />
              <Form.Control.Feedback type="invalid">
                This section cannot be blank.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Form noValidate validated={this.state.CommentValidate}>
            <Form.Group controlId="formSelectCat">
              <Form.Label>
                <p style={{ marginBottom: '0.1em' }}>
                  <b>Comment:</b>
                </p>
              </Form.Label>
              <Form.Control
                as="textarea"
                required
                type="name"
                placeholder="Comment"
                onChange={this.storeValue}
                maxLength="50"
                rows="3"
              />
              <Form.Control.Feedback type="invalid">
                This section cannot be blank.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button
            variant="secondary"
            onClick={this.postComment}
            style={{ width: 'auto' }}
          >
            Add Comment
          </Button>

          <Modal show={this.state.show} size="m" onHide={this.CloseModal}>
            <Modal.Header>
              <Modal.Title>Comment is Posted</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                onClick={this.refreshComment}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div> {comment_holder}</div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default CommentTextArea;
