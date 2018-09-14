import React from "react";
import { Button, Modal, Icon, Card, Image } from "semantic-ui-react";

import MovieDetails from "./MovieDetails";

const MovieList = props => {
  return (
    <Card.Group itemsPerRow={4} stackable>
      {props.movies.map(movie => (
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
                  onClick={() => props.onMovieRemove(movie.movie.imdbID)}
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
                <Card.Header>
                  {movie.title} ({movie.movie.Released})
                </Card.Header>
                <Card.Meta>{movie.movie.Genre}</Card.Meta>
                <Card.Meta>by {movie.movie.Director}</Card.Meta>
              </Card.Content>
            </Card>
          }
          closeIcon
        >
          <Modal.Content>
            <MovieDetails movie={movie.movie} token={props.token} />
          </Modal.Content>
        </Modal>
      ))}
    </Card.Group>
  );
};

export default MovieList;
