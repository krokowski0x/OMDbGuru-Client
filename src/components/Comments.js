import React, { Component } from "react";
import { Card, Button, Input, Icon, Message } from "semantic-ui-react";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      id: this.props.id,
      comments: [],
      newComment: "",
      loading: false,
      errorMessage: ""
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
      .then(result =>
        this.setState({ comments: result.comments, loading: false })
      )
      .catch(err => console.error(err));
  };

  onCommentAdd = async () => {
    this.setState({ loading: true });
    try {
      await fetch(`https://omdb-guru.herokuapp.com/comments/`, {
        method: "POST",
        body: JSON.stringify({
          id: this.state.id,
          comment: this.state.newComment
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Auth": this.state.token
        }
      });
      this.setState({ newComment: "" });
      await this.getCommentList();
    } catch (err) {
      console.error(err);
    }
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
      await this.getCommentList();
    } catch (err) {
      this.setState({
        errorMessage: "Hey, don't even try that! It's not Your comment!"
      });
    }
  };

  render() {
    const { comments, newComment, loading, errorMessage } = this.state;

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
          style={{ paddingBottom: "3rem", width: "40vw" }}
        />
        <Button positive onClick={this.onCommentAdd} loading={loading}>
          Add New
        </Button>
        {errorMessage ? <Message negative>{errorMessage}</Message> : <div />}

        {comments.length !== 0 ? (
          <Card.Group centered>
            {comments.map(entry => (
              <Card fluid key={entry._id}>
                <Card.Content extra textAlign="left">
                  {entry.createdAt}
                  <Button
                    floated="right"
                    animated="vertical"
                    onClick={() => this.onCommentRemove(entry._id)}
                  >
                    <Button.Content hidden>Delete</Button.Content>
                    <Button.Content visible>
                      <Icon name="x" />
                    </Button.Content>
                  </Button>
                </Card.Content>
                <Card.Content>{entry.comment}</Card.Content>
              </Card>
            ))}
          </Card.Group>
        ) : (
          <h3>No comments yet. Add the first one!</h3>
        )}
      </div>
    );
  }
}
