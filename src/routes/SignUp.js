import React, { Component } from "react";
import { Button, Form, Card } from "semantic-ui-react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        username: "",
        password: ""
      },
      errorMessage: ""
    };
  }

  onSignUp = () => {
    const { currentUser, loggedIn } = this.state;

    fetch("https://omdb-guru.herokuapp.com/users", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(currentUser),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(error => console.error("Error:", error));
  };

  onLogIn = () => {
    const { currentUser, loggedIn } = this.state;

    fetch("https://omdb-guru.herokuapp.com/users/login", {
      method: "POST",
      body: JSON.stringify(currentUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => this.props.onSignIn(result.tokens[0].token))
      .catch(error => console.error("Error:", error));
  };

  render() {
    const {
      currentUser: { username, password }
    } = this.state;

    return (
      <Card centered fluid style={{ padding: "5rem", width: "40vw" }}>
        <h2 style={{ marginBottom: "5rem" }}>
          Sign Up / Log In to enter OMDbGuru!
        </h2>
        <Form>
          <Form.Field required>
            <label>Username</label>
            <input
              placeholder="Username"
              value={username}
              onChange={e =>
                this.setState({
                  currentUser: {
                    username: e.target.value,
                    password: password
                  }
                })
              }
            />
          </Form.Field>

          <Form.Field required>
            <label>Password</label>
            <input
              placeholder="Password"
              value={password}
              onChange={e =>
                this.setState({
                  currentUser: {
                    username: username,
                    password: e.target.value
                  }
                })
              }
            />
          </Form.Field>

          <Button.Group>
            <Button onClick={this.onSignUp}>Sign Up</Button>
            <Button.Or />
            <Button positive onClick={this.onLogIn}>
              Log In
            </Button>
          </Button.Group>
        </Form>
      </Card>
    );
  }
}
