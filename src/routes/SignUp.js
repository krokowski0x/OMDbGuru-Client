import React, { Component } from "react";
import { Button, Form, Card, Message } from "semantic-ui-react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        username: "",
        password: ""
      },
      errorMessage: "",
      loading: false
    };
  }

  onSignUp = () => {
    const { currentUser } = this.state;
    this.setState({
      errorMessage: ""
    });
    fetch("https://omdb-guru.herokuapp.com/users", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(currentUser),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(err =>
      this.setState({
        errorMessage:
          "Something went wrong. Make sure Your username is 5 to 20 characters long and password is at lesat 6."
      })
    );
  };

  onLogIn = () => {
    const { currentUser } = this.state;
    this.setState({ loading: true });
    fetch("https://omdb-guru.herokuapp.com/users/login", {
      method: "POST",
      body: JSON.stringify(currentUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ loading: false });
        this.props.onSignIn(result.tokens[0].token);
      })
      .catch(err =>
        this.setState({
          errorMessage:
            "Something went wrong. Make sure You sign up first or check Your spelling."
        })
      );
  };

  render() {
    const {
      currentUser: { username, password },
      errorMessage,
      loading
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
          {errorMessage ? <Message negative>{errorMessage}</Message> : <div />}
          <Button.Group>
            <Button onClick={this.onSignUp}>Sign Up</Button>
            <Button.Or />
            <Button positive onClick={this.onLogIn} loading={loading}>
              Log In
            </Button>
          </Button.Group>
        </Form>
      </Card>
    );
  }
}
