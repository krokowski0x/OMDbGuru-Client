import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";

import Comments from "./Comments";

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.movie,
      token: this.props.token
    };
  }

  render() {
    const {
      Poster,
      Title,
      Genre,
      Year,
      Runtime,
      Country,
      Rated,
      Director,
      Writer,
      Actors,
      Plot,
      imdbID
    } = this.state.movie || null;

    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src={Poster} size="medium" centered />
          </Grid.Column>
          <Grid.Column>
            <h2>
              {Title} ({Year})
            </h2>
            <h3>
              {Genre} | {Runtime} | {Country} | {Rated}
            </h3>
            <h3>Director: {Director}</h3>
            <h3>Writer: {Writer}</h3>
            <h3>Stars: {Actors}</h3>
            <div
              style={{
                margin: "2rem 0",
                height: "5px",
                width: "100%",
                borderRadius: "10px",
                background: "linear-gradient(45deg, #00d664, cyan)"
              }}
            />
            <h4>{Plot}</h4>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Comments id={imdbID} token={this.state.token} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
