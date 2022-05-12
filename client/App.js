import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Screenshot from "./components/Screenshot";
import Tracker from "./components/Tracker";
import { getModel } from "./store/tmModel";
import SurveyModal from "./components/SurveyModal";
import { Alert, Button } from "react-bootstrap";

const App = () => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  //load teachable machine model
  useEffect(() => {
    dispatch(getModel());
  }, []);

  // if (show) {
  //   return (
  //     <Alert variant="success" onClose={() => setShow(false)} dismissible>
  //       <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
  //       <p>
  //         Change this and that and try again. Duis mollis, est non commodo
  //         luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
  //         Cras mattis consectetur purus sit amet fermentum.
  //       </p>
  //     </Alert>
  //   );
  // }

  return (
    <div>
      <Navbar />
      <Routes />
      {show ? (
        <Alert color="primary" variant="success" closeLabel="Close alert">
          Don't forget to take your daily survey! 🌱
          <button type="button" onClick={() => setShow(false)}>
            Close
          </button>
        </Alert>
      ) : null}
      <Tracker />
      <SurveyModal />
    </div>
  );
};

export default App;

{
  /* <Alert
        color="primary"
        isOpen={alertState}
        toggle={() => setAlertState(false)}
      >
        Don't forget to take your daily survey!
      </Alert> */
}
