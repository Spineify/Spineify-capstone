import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Card, Container, Row, Col } from "react-bootstrap";
import { addFavoriteStretch } from "../store/favoriteChange";

function SuggestedStretchesGrid(props) {
  const dispatch = useDispatch();
  const stretchList = useSelector((state) => state.stretchList);
  const [favorite, setFavorite] = useState({});

  useEffect(() => {
    if (favorite.id) {
      dispatch(addFavoriteStretch(favorite));
    }
  }, [favorite]);
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Suggested Stretches
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            {stretchList.length === 0 ? (
              <p>Please take your daily survey to see suggested stretches!</p>
            ) : (
              stretchList.map((stretch) => {
                return (
                  <Col md={3} key={stretch.id}>
                    <Card className="stretchlist-card">
                      <Card.Img variant="top" src={stretch.imageURL} />
                      <Card.Title>{stretch.name}</Card.Title>
                      <Card.Text>{stretch.directions}</Card.Text>
                      <Button
                        onClick={() => {
                          setFavorite(stretch);
                        }}
                      >
                        Add to Favorites
                      </Button>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const StretchList = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Click to see your suggested stretches!
      </Button>
      <SuggestedStretchesGrid
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default StretchList;
