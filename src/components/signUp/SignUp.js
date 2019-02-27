import "./signUp.css";

import React from "react";
import { withRouter } from "react-router-dom";

import { BaseContainer } from "../../helpers/layout";
import DataService from "../../services/HttpService";
import { Button } from "../../views/design/Button";
import {
  ButtonContainer,
  Form,
  FormContainer,
  InputField,
  Label
} from "../../views/design/Form";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      password: "",
      passwordRepeat: "",
      passwordNotIdentical: false
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  signUp() {
    if (this.state.password !== this.state.passwordRepeat) {
      this.setState({ passwordNotIdentical: true });
      this.setState({ password: "" });
      this.setState({ passwordRepeat: "" });
    } else {
      DataService.postRequest("/users", {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      })
        .then(async res => {
          if (!res.ok) {
            const error = await res.json();
            alert(error.message);
            this.setState({ name: "" });
            this.setState({ username: "" });
            this.setState({ password: "" });
            this.setState({ passwordRepeat: "" });
          } else {
            this.props.history.push("/login");
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
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form style={{ height: "470px" }}>
            <Label>Name</Label>
            <InputField
              value={this.state.name}
              onChange={e => {
                this.handleInputChange("name", e.target.value);
              }}
            />
            <Label>Username</Label>
            <InputField
              value={this.state.username}
              onChange={e => {
                this.handleInputChange("username", e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField
              type="password"
              value={this.state.password}
              onChange={e => {
                this.handleInputChange("password", e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField
              type="password"
              value={this.state.passwordRepeat}
              onChange={e => {
                this.handleInputChange("passwordRepeat", e.target.value);
              }}
            />

            {this.state.passwordNotIdentical ? (
              <p className="warning-message">
                Passwords needs to be identical!
              </p>
            ) : null}

            <ButtonContainer>
              <Button
                className="sign-up-button"
                disabled={
                  !this.state.name ||
                  !this.state.username ||
                  !this.state.password ||
                  !this.state.passwordRepeat
                }
                width="50%"
                onClick={() => {
                  this.signUp();
                }}
              >
                Sign Up
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(SignUp);
