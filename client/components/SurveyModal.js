import React, { useCallback, useEffect } from "react";
import { addData } from "../store/surveyData";
import { connect, useSelector } from "react-redux";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { Modal, Button } from "react-bootstrap";

StylesManager.applyTheme("modern");

const surveyJson = {
  title: "Daily Check-in",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "rating",
          name: "discomfort_level",
          title:
            "Rate your current level of discomfort. (0 = no discomfort, 10 = highest level of discomfort)",
          isRequired: true,
          rateMin: 0,
          rateMax: 10,
          minRateDescription: "None",
          maxRateDescription: "Max",
        },
        {
          type: "checkbox",
          name: "pain_area",
          visibleIf: "{discomfort_level} >= 1",
          title: "Please select all current areas of discomfort.",
          choices: [
            {
              value: "neck",
              text: "Neck",
            },
            {
              value: "shoulders",
              text: "Shoulders",
            },
            {
              value: "upper-back",
              text: "Upper-back",
            },
            {
              value: "lower-back",
              text: "Lower-back",
            },
            {
              value: "hips",
              text: "Hips",
            },
          ],
          hasSelectAll: true,
        },
      ],
    },
  ],
};

function MyVerticallyCenteredModal(props) {
  const survey = new Model(surveyJson);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Daily Check-In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Survey model={survey} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const SurveyModal = (props) => {
  let userId = useSelector((state) => state.auth.id);
  const [modalShow, setModalShow] = React.useState(false);

  const survey = new Model(surveyJson);

  let jsonData;

  const alertResults = useCallback(
    (sender) => {
      const results = JSON.stringify(sender.data);
      jsonData = JSON.parse(results);
      jsonData.userId = userId;
      console.log("JSONDATA", jsonData);
      console.log("USERID", userId);
      if (userId) {
        console.log("if statement for add");
        addData(jsonData);
        // here we can have a if jsonData.discomfort_level > 0
        // getStretches() api call
      }
    },
    [userId]
  );

  survey.onComplete.add(alertResults);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Take Daily Check-In Survey
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

const mapDispatch = (dispatch) => {
  return {
    addData: (data) => dispatch(addData(data)),
  };
};

export default connect(null, mapDispatch)(SurveyModal);

{
  /* <div className="modal-container">
<button
  type="button"
  class="btn btn-primary"
  data-toggle="modal"
  data-target="#exampleModalCenter"
>
  Take Daily Survey
</button>
<div
  class="modal fade"
  id="exampleModalCenter"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">
          Daily Survey
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <Survey model={survey} />
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <button type="button" value="Complete" class="btn btn-primary">
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>
</div> */
}
