import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { getDomain } from "../../helpers/getDomain";
import { BaseContainer } from "../../helpers/layout";
import DataService from "../../services/DataService";
import { Button } from "../../views/design/Button";
import { Spinner } from "../../views/design/Spinner";
import Player from "../../views/Player";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  showUser(id) {
    this.props.history.push(`/user/${id}`);
  }

  logout() {
    DataService.postRequest("/logout", {
      token: localStorage.getItem("token")
    })
      .then(async res => {
        localStorage.removeItem("token");
        this.props.history.push("/login");
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the sign up: ${err.message}`);
        }
      });
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async users => {
        await new Promise(resolve => setTimeout(resolve, 800));

        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}>
                    <Player
                      user={user}
                      showUser={() => {
                        this.showUser(user.id);
                      }}
                    />
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
