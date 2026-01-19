import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteStretch } from "../store/favoriteList";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { deleteFavoriteStretch } from "../store/favoriteList";

export const FavoriteStretches = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const favoritesArray = useSelector((state) => state.favoriteList);
  const [stretchToDelete, deleteStretch] = useState({});

  useEffect(() => {
    const fetchFavorites = () => {
      if (userId) {
        dispatch(getFavoriteStretch());
      }
    };
    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    if (stretchToDelete.id) {
      dispatch(deleteFavoriteStretch(stretchToDelete));
    }
  }, [stretchToDelete]);

  return (
    <div className="favorites-container">
      <h3 id="favorites-title">My Favorites</h3>
      <Container>
        <Row>
          {favoritesArray.length === 0 ? (
            <p className="no-stretches">Feel free to add some stretches!</p>
          ) : (
            favoritesArray.map((favorite) => {
              const stretch = favorite.stretch;
              return (
                <Col md={4} key={stretch.id}>
                  <Card className="favorites-card">
                    <Card.Img variant="top" src={stretch.imageURL} />
                    <Card.Title>{stretch.name}</Card.Title>
                    <Card.Text>{stretch.directions}</Card.Text>
                    <Button
                      variant="success"
                      className="favorites-remove-button"
                      onClick={() => {
                        deleteStretch(stretch);
                      }}
                    >
                      Remove from Favorites
                    </Button>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};
