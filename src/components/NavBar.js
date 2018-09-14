import React from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import NetguruLogo from "../img/netguru_logo.png";

const NavBar = props => {
  return (
    <Menu secondary>
      <Menu.Item name="home">
        <h1>
          <span style={{ color: "#00d664" }}>OMDb</span>
          <span>GURU</span>
        </h1>
        <span style={{ marginLeft: "5%" }}>by</span>
        <img
          alt="Netguru logo"
          src={NetguruLogo}
          style={{ height: "3rem", width: "auto" }}
        />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button
            animated
            onClick={() => {
              fetch("https://omdb-guru.herokuapp.com/users/me/token", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "X-Auth": props.token
                }
              }).then(() => props.onLogOut());
            }}
          >
            <Button.Content visible>Log out</Button.Content>
            <Button.Content hidden>
              <Icon name="log out" />
            </Button.Content>
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
