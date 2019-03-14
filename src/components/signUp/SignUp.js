import "./signUp.css";

import React from "react";
import { withRouter } from "react-router-dom";

import { BaseContainer } from "../../helpers/layout";
import DataService from "../../services/DataService";
import { Button } from "../../views/design/Button";
import {
  ButtonContainer,
  Form,
  FormContainer,
  InputField,
  Label
} from "../../views/design/Form";

/**
 * Sign up view. Which allows a user to register.
 * @Class
 */
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      birthday: "",
      password: "",
      passwordRepeat: "",
      passwordNotIdentical: false
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  // When clicking the sign up button
  signUp() {
    if (this.state.password !== this.state.passwordRepeat) {
      // Reset form if passwords not identically
      this.setState({ passwordNotIdentical: true });
      this.setState({ password: "" });
      this.setState({ passwordRepeat: "" });
    } else {
      // Register new user on server
      DataService.postRequest("/users", {
        name: this.state.name,
        username: this.state.username,
        birthday: this.state.birthday,
        password: this.state.password
      })
        .then(async res => {
          if (!res.ok) {
            // Show error and reset form
            const error = await res.json();
            alert(error.message);
            this.setState({ name: "" });
            this.setState({ username: "" });
            this.setState({ birthday: "" });
            this.setState({ password: "" });
            this.setState({ passwordRepeat: "" });
          } else {
            // Browse to login views
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
          <Form style={{ height: "560px" }}>
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
            <Label>B-Day</Label>
            <InputField
              type="date"
              value={this.state.birthday}
              onChange={e => {
                this.handleInputChange("birthday", e.target.value);
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
                color="orange"
                disabled={
                  !this.state.name ||
                  !this.state.username ||
                  !this.state.password ||
                  !this.state.passwordRepeat ||
                  !this.state.birthday
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
