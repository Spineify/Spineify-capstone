import React, { useCallback, useEffect, useState } from "react";
import { addData } from "../store/surveyData";
import { connect, useSelector, useDispatch } from "react-redux";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { Modal, Button } from "react-bootstrap";
import { suggestStretch } from "../store/stretch";

StylesManager.applyTheme("modern");

const surveyJson = {
  title: "Daily Check-in",
  logoPosition: "right",
  triggers: [{ type: "complete", expression: "{exit1} = 'Yes'" }],
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

export default function SurveyComponent(props) {
  let userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const survey = new Model(surveyJson);

  const alertResults = useCallback(
    (sender) => {
      const results = sender.data;
      results.userId = userId;
      if (userId) {
        dispatch(addData(results));
      }
      if (results.pain_area) {
        dispatch(suggestStretch(results.pain_area));
      }
    },
    [userId]
  );

  survey.onComplete.add(alertResults);

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
