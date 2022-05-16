import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import {addFavoriteStretch} from '../store/favorite'

export default (props) => {
  const dispatch = useDispatch();
  const stretchList = useSelector((state) => state.stretchList)
  const [favorite, setFavorite] = useState({})

  useEffect(()=> {
    console.log('clicked', favorite)
    if(favorite.id){
      console.log('got into if')
      dispatch(addFavoriteStretch(favorite))
    }
  },[favorite])

  return (
    <div>
      {stretchList.length !== 0 ?
        <div>
          <h2>Suggested Stretches: </h2>
          <Container className="h-50 d-inline-block">
            <Row >
              {stretchList.map((stretch) => {
                return (
                  <Col xs key={stretch.id} >
                    <Card >
                      <Card.Img variant="top" src={stretch.imageURL} />
                      <Card.Title>{stretch.name}</Card.Title>
                      <Card.Text>{stretch.directions}</Card.Text>
                      <Button onClick={()=>
                        {setFavorite(stretch)
                          console.log('ONCLICK', favorite)}
                        }>Add to Favorites</Button>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Container>
        </div> : ''}
        <br />
    </div>

  )
}
