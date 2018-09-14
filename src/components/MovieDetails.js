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
    const { Poster, Title, Genre, Released, Plot, imdbID } =
      this.state.movie || null;

    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src={Poster} size="medium" centered />
          </Grid.Column>
          <Grid.Column>
            <h2>{Title}</h2>
            <h3>{Genre}</h3>
            <h3>{Released}</h3>
            <div
              style={{
                height: "5px",
                width: "80%",
                borderRadius: "10px",
                background: "linear-gradient(45deg, #00d664, cyan)"
              }}
            />

            <p>{Plot}</p>
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
