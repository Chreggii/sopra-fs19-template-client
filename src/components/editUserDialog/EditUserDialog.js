import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap/";
import DataService from "../../services/DataService";

class EditUserDialog extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      user: this.props.user,
      username: "",
      birthday: "",
      show: true
    };
  }

  // When closing the dialog
  handleClose() {
    this.setState({ show: false });
    this.props.onClose(false);
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSave() {
    DataService.putRequest(`/users/${this.state.user.id}`, {
      username: this.state.username,
      birthday: this.state.birthday
    })
      .then(async res => {
        if (res.status === 204) {
          this.setState({ show: false });
          this.props.onClose(true);
        } else {
          // Show error message and reset input fields
          const error = await res.json();
          alert(error.message);
          this.setState({ username: "" });
          this.setState({ birthday: "" });
        }
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the sign up: ${err.message}`);
        }
      });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.user.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>New username:</Form.Label>
              <Form.Control
                type="text"
                value={this.state.username}
                onChange={e => {
                  this.handleInputChange("username", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="birthday">
              <Form.Label>New birthday:</Form.Label>
              <Form.Control
                type="date"
                value={this.state.birthday}
                onChange={e => {
                  this.handleInputChange("birthday", e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button
            disabled={!this.state.username || !this.state.birthday}
            variant="primary"
            onClick={() => this.handleSave()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditUserDialog;
