import React, { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap/";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { BaseContainer } from "../../helpers/layout";
import DataService from "../../services/DataService";
import { Spinner } from "../../views/design/Spinner";
import EditUserDialog from "../editUserDialog/EditUserDialog";
import User from "../shared/models/User";

const ProfilContainer = styled(BaseContainer)`
  color: white;
  text-align: center;
  width: 60%;
  margin: auto;
`;

class UserProfil extends Component {
  state = {
    user: null,
    showEditDialog: false,
    canEdit: false
  };

  componentDidMount() {
    this.fetchUserDate();
  }

  handleCloseModal(successful) {
    this.setState({ showEditDialog: false });
    if (successful) {
      this.fetchUserDate();
    }
  }

  fetchUserDate() {
    const { id } = this.props.match.params;

    DataService.getRequest(`/users/${id}`)
      .then(async res => {
        if (!res.ok) {
          const error = await res.json();
          alert(error.message);
          this.props.history.push("/game");
        } else {
          const user = new User(await res.json());
          this.setState({ user });

          DataService.postRequest(`/edit`, {
            id: id,
            token: localStorage.getItem("token")
          }).then(async res => {
            if (!res.ok) {
              const error = await res.json();
              alert(error.message);
            } else {
              this.setState({
                canEdit: await res.json()
              });
            }
          });
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

  formatDate(dateTime) {
    const date = new Date(dateTime);
    const day = date.getDate();
    const monthIndex = date.getMonth() + 1; // Index 0 is january
    const year = date.getFullYear();

    return `${day}. ${monthIndex}. ${year}`;
  }

  getUser() {
    return this.state.user;
  }

  render() {
    return (
      <ProfilContainer>
        {!this.state.user ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Table striped hover>
              <tbody>
                <tr>
                  <td>Username:</td>
                  <td>{this.state.user.username}</td>
                </tr>
                <tr>
                  <td>Online Status:</td>
                  <td>{this.state.user.status}</td>
                </tr>
                <tr>
                  <td>Creation Date:</td>
                  <td>{this.formatDate(this.state.user.createDate)}</td>
                </tr>
                <tr>
                  <td>Birthday:</td>
                  <td>{this.formatDate(this.state.user.birthday)}</td>
                </tr>
              </tbody>
            </Table>
            {this.state.canEdit ? (
              <React.Fragment>
                <ButtonToolbar>
                  <Button
                    variant="primary"
                    onClick={() => this.setState({ showEditDialog: true })}
                  >
                    Edit
                  </Button>
                </ButtonToolbar>
                {this.state.showEditDialog ? (
                  <EditUserDialog
                    user={this.getUser()}
                    onClose={evt => this.handleCloseModal(evt)}
                  />
                ) : null}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </ProfilContainer>
    );
  }
}

export default withRouter(UserProfil);
