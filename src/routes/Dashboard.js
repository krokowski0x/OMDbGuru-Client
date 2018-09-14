import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

import MovieList from "../components/MovieList";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      token: this.props.token,
      title: "",
      loading: false
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
    const { title, token } = this.state;
    this.setState({ loading: true });
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
      this.setState({ loading: false });
    } catch (err) {
      console.error("Error:", err);
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
    const { movies, title, token, loading } = this.state;

    return (
      <div>
        <h1>Welcome to OMDbGuru!</h1>
        <h2>Let's add some movie titles to Your collection!</h2>
        <Input
          style={{ paddingBottom: "3rem", width: "40vw" }}
          placeholder="Add..."
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <Button positive onClick={this.onMovieAdd} loading={loading}>
          Add
        </Button>
        <MovieList
          movies={movies}
          token={token}
          onMovieRemove={id => this.onMovieRemove(id)}
        />
      </div>
    );
  }
}
