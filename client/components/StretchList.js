import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

export default (props) => {
  const dispatch = useDispatch();
  const stretchList = useSelector((state) => state.stretchList)
  console.log('STRETCH LIST', stretchList)
  //This only works if you come from the survey rn

  let example = stretchList[0]
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
                      <Button>Add to Favorites</Button>
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
