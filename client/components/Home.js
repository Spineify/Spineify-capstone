import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getPoses } from "../store/posture";
//import Tracker from './Tracker'
import PetPlant from "./PetPlant";
import SurveyModal from "./SurveyModal";
import StretchList from "./StretchList";
import { getPlant } from "../store/petPlant";
import { Alert } from "react-bootstrap";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const userId = useSelector((state) => state.auth.id);
  const plant = useSelector((state) => state.plantReducer);
  const [modalShow, setModalShow] = React.useState(false);

  //get all poses
  useEffect(() => {
    dispatch(getPoses());
    dispatch(getPlant());
  }, []);

  //rerender home component when user takes/completes survey. ModalShow is used in PetPlant componenet so it doesnt refresh the survey at intervals when user is taking survey. see line 27 of petplant component
  useEffect(() => {}, [modalShow]);

  return (
    <div id="home">
      <div>
        {userId && (
          <div>
            {show ? (
              <Alert color="primary" variant="success" closeLabel="Close alert">
                Don't forget to take your daily survey! 🌱
                <button
                  className="tracker-button"
                  type="button"
                  onClick={() => setShow(false)}
                >
                  X
                </button>
              </Alert>
            ) : null}
          </div>
        )}
      </div>
      <div className="home-info">
        <div className="welcome-info">
          <h3 className="welcome-name">Hello, {firstName}.</h3>
          <p className="welcome-paragraph">
            Welcome to Spineify! To start tracking your posture, click on the
            'Start Tracking' button. Your posture will be tracked through the
            webcam on your computer. To stop tracking at any time, click 'Stop
            Tracking'. Every day fill out a daily survey to track your levels of
            discomfort and areas of pain. Suggested stretches based on your pain
            points will be recommended after each survey. Check out your results
            in the data section to monitor your progress. Win prizes for your
            pet plant by maintaining good posture during the day. You got this!
          </p>
          <SurveyModal setModalShow={setModalShow} modalShow={modalShow} />
          <StretchList />
        </div>
        <div className="homeContent">
          {Object.keys(plant).length && <PetPlant modalShow={modalShow} />}
        </div>
        <br />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(Home);
