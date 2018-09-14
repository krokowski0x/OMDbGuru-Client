import React, { Component } from "react";
import { Card, Button, Input, Icon } from "semantic-ui-react";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      id: this.props.id,
      comments: [],
      newComment: ""
    };
  }

  componentDidMount() {
    this.getCommentList();
  }

  getCommentList = () => {
    fetch(`https://omdb-guru.herokuapp.com/comments/${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": this.state.token
      }
    })
      .then(res => res.json())
      .then(result => this.setState({ comments: result.comments }))
      .catch(err => console.error(err));
  };

  onCommentAdd = () => {
    fetch(`https://omdb-guru.herokuapp.com/comments/`, {
      method: "POST",
      body: JSON.stringify({
        id: this.state.id,
        comment: this.state.newComment
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Auth": this.state.token
      }
    })
      .then(() => this.setState({ newComment: "" }))
      .then(() => this.getCommentList())
      .catch(err => console.error(err));
  };

  onCommentRemove = async id => {
    try {
      await fetch(`https://omdb-guru.herokuapp.com/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": this.state.token
        }
      });
      this.getCommentList();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem"
        }}
      >
        <h2>Comments:</h2>
        <br />
        <Input
          placeholder="Add..."
          value={newComment}
          onChange={e => this.setState({ newComment: e.target.value })}
          style={{
            paddingBottom: "3rem",
            width: "50vw"
          }}
        />
        <Button positive onClick={this.onCommentAdd}>
          Add New
        </Button>
        {comments.length !== 0 ? (
          <Card.Group centered>
            {comments.map(entry => (
              <Card fluid key={entry.id}>
                <Button
                  animated="vertical"
                  onClick={() => this.onCommentRemove(entry._id)}
                >
                  <Button.Content hidden>Delete</Button.Content>
                  <Button.Content visible>
                    <Icon name="x" />
                  </Button.Content>
                </Button>
                <Card.Header>{entry.createdAt}</Card.Header>
                <Card.Content>{entry.comment}</Card.Content>
              </Card>
            ))}{" "}
          </Card.Group>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
