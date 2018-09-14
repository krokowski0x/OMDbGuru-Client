import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";

import Dashboard from "./routes/Dashboard";
import SignUp from "./routes/SignUp";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    loggedIn: false,
    token: ""
  };

  render() {
    const { loggedIn, token } = this.state;

    return (
      <div>
        <NavBar
          token={token}
          onLogOut={() => this.setState({ token: "", loggedIn: false })}
        />
        <Container style={{ textAlign: "center", paddingTop: "5rem" }}>
          {loggedIn ? (
            <Dashboard token={token} />
          ) : (
            <SignUp
              onSignIn={token => this.setState({ token, loggedIn: true })}
            />
          )}
        </Container>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
