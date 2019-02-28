import "./login.css";

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
import User from "../shared/models/User";

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
   */
  login() {
    DataService.postRequest("/login", {
      username: this.state.username,
      password: this.state.password
    })
      .then(async res => {
        if (!res.ok) {
          const error = await res.json();
          alert(error.message);

          this.setState({ username: "" });
          this.setState({ password: "" });
        } else {
          const user = new User(await res.json());

          localStorage.setItem("token", user.token);
          this.props.history.push(`/game`);
        }
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
  }

  signUp() {
    this.props.history.push("/sign-up");
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <Label>Username</Label>
            <InputField
              value={this.state.username}
              onChange={e => {
                this.handleInputChange("username", e.target.value);
              }}
            />
            <Label>password</Label>
            <InputField
              type="password"
              value={this.state.password}
              onChange={e => {
                this.handleInputChange("password", e.target.value);
              }}
            />
            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>
              <Button
                className="sign-up-button"
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

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
