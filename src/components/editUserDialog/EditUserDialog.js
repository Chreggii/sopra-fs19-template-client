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

  handleClose() {
    this.setState({ show: false });
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSave() {
    DataService.putRequest(`/users/${this.state.user.id}`, {
      username: this.state.username,
      birthday: this.state.birthday
    }).then(async res => {
      if (res.status === 204) {
        this.setState({ show: false });
      } else {
        const error = await res.json();
        alert(error.message);
        this.setState({ username: "" });
        this.setState({ birthday: "" });
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
                onChange={e => {
                  this.handleInputChange("username", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="birthday">
              <Form.Label>New birthday:</Form.Label>
              <Form.Control
                type="date"
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
