import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Screenshot from "./components/Screenshot";
import Tracker from "./components/Tracker";
import { getModel } from "./store/tmModel";
import SurveyModal from "./components/SurveyModal";
import { Alert, Button } from "react-bootstrap";

const App = () => {
  const [show, setShow] = useState(true);
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  //load teachable machine model
  useEffect(() => {
    dispatch(getModel());
  }, []);

  return (
    <div>
      <Navbar />
      <Routes />
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
            <SurveyModal />
            <Tracker />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
