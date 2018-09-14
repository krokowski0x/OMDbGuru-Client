import React, { Component } from "react";
import {
  Button,
  Modal,
  Icon,
  Input,
  Grid,
  Card,
  Image
} from "semantic-ui-react";

import MovieDetails from "../components/MovieDetails";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      currentUser: {
        username: "",
        password: ""
      },
      token: this.props.token,
      errorMessage: "",
      title: ""
    };
  }

  componentDidMount() {
    this.getMovieList();
  }

  getMovieList = async () => {
    await fetch("https://omdb-guru.herokuapp.com/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": this.state.token
      }
    })
      .then(res => res.json())
      .then(result => this.setState({ movies: result.movies }));
  };

  onMovieAdd = async () => {
    const { currentUser, loggedIn, title, token, movies } = this.state;
    try {
      await fetch("https://omdb-guru.herokuapp.com/movies", {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
          "X-Auth": token
        }
      });
      await this.getMovieList();
    } catch (err) {
      err => console.err("Error:", err);
    }
  };

  onMovieRemove = async id => {
    const { token } = this.state;
    try {
      await fetch(`https://omdb-guru.herokuapp.com/movies/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": token
        }
      });
      await this.getMovieList();
    } catch (err) {
      console.err("Error:", err);
    }
  };

  render() {
    const { currentUser, movies, title, token } = this.state;
    return (
      <div>
        <h1>Welcome to OMDbGuru!</h1>
        <h2>Let's add some movie titles to Your collection!</h2>
        <Input
          style={{
            paddingBottom: "3rem",
            width: "50vw"
          }}
          placeholder="Add..."
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <Button positive onClick={this.onMovieAdd}>
          Add
        </Button>
        <Card.Group itemsPerRow={4} stackable>
          {movies.map(movie => (
            <Modal
              key={movie.title}
              trigger={
                <Card
                  style={{
                    padding: "1%",
                    boxShadow: "4px 4px 2px 0px rgba(0,0,0,0.3)",
                    borderRadius: "20px"
                  }}
                  key={movie.title}
                >
                  <Card.Content extra textAlign="right">
                    <Button
                      animated="vertical"
                      onClick={() => this.onMovieRemove(movie.movie.imdbID)}
                    >
                      <Button.Content hidden>Delete</Button.Content>
                      <Button.Content visible>
                        <Icon name="x" />
                      </Button.Content>
                    </Button>
                  </Card.Content>
                  <Image
                    src={movie.movie.Poster}
                    style={{ height: "10rem" }}
                    centered
                  />
                  <Card.Content textAlign="center">
                    <Card.Header>{movie.title}</Card.Header>
                    <Card.Meta>{movie.movie.year}</Card.Meta>
                  </Card.Content>
                </Card>
              }
              closeIcon
            >
              <Modal.Content>
                <MovieDetails movie={movie.movie} token={token} />
              </Modal.Content>
            </Modal>
          ))}
        </Card.Group>
      </div>
    );
  }
}
