import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getPoses } from "../store/posture";
import Tracker from "./Tracker";
import PetPlant from "./PetPlant";
import SurveyModal from "./SurveyModal";
import { getPlant } from "../store/petPlant";
import { Alert } from "react-bootstrap";
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const userId = useSelector((state) => state.auth.id);

  //get all poses
  useEffect(() => {
    dispatch(getPoses());
    dispatch(getPlant());
  }, []);

  return (
    <div id="home">
      <h3>Hello, {username}</h3>
      <SurveyModal />
      <div>
        {userId && (
          <div>
            {show ? (
              <Alert color="primary" variant="success" closeLabel="Close alert">
                Don't forget to take your daily survey! 🌱
                <button type="button" onClick={() => setShow(false)}>
                  Close
                </button>
              </Alert>
            ) : null}
          </div>
        )}
      </div>
      <div className="homeContent">
        <Tracker />
        <PetPlant />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
