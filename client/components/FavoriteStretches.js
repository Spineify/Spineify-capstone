import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFavoriteStretch } from '../store/favorite'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

export const FavoriteStretches = props => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const favoritesArray = useSelector((state) => state.favorite)

  useEffect(() => {
    const fetchFavorites = () => {
      if (userId) {
        dispatch(getFavoriteStretch())
      }
    }
    fetchFavorites()
  },[userId])

  console.log('favorites array', favoritesArray)
  return (
  <div>
    <Container>
      <Row>
      {favoritesArray.length === 0 ? <p>Feel free to add some stretches!</p> : favoritesArray.map(favorite => {
      const stretch = favorite.stretch
      return (
        <Col key={stretch.id}>
          <Card>
            <Card.Img variant="top" src={stretch.imageURL} />
            <Card.Title>{stretch.name}</Card.Title>
            <Card.Text>{stretch.directions}</Card.Text>
            <Button>Remove from Favorites</Button>
          </Card>
        </Col>
      )
    })}
      </Row>
    </Container>

  </div>)
}
