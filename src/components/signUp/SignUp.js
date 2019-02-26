import "./signUp.css";

import React, { Component } from "react";

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

class SignUp extends Component {
  state = {
    username: null,
    password: null,
    passwordRepeat: null,
    passwordNotIdentical: false
  };

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  signUp() {
    if (this.state.password !== this.state.passwordRepeat) {
      this.setState({ passwordNotIdentical: true });
      this.setState({ password: "" });
      this.setState({ passwordRepeat: "" });
    } else {
      DataService.postRequest("/sign-up", {
        username: this.state.username,
        password: this.state.password
      }).then(res => {
        console.log(res);
      });
    }
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <Label>Username</Label>
            <InputField
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

export default SignUp;
