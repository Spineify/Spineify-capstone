
import React, { useCallback, useEffect } from "react";
import { addData } from "../store/surveyData";
import { suggestStretch } from "../store/stretch";
import { connect, useSelector } from "react-redux";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";


StylesManager.applyTheme('modern')

const surveyJson = {
	title: 'Daily Check-in',
	logoPosition: 'right',
	pages: [
		{
			name: 'page1',
			elements: [
				{
					type: 'rating',
					name: 'discomfort_level',
					title:
						'Rate your current level of discomfort. (0 = no discomfort, 10 = highest level of discomfort)',
					isRequired: true,
					rateMin: 0,
					rateMax: 10,
					minRateDescription: 'None',
					maxRateDescription: 'Max',
				},
				{
					type: 'checkbox',
					name: 'pain_area',
					visibleIf: '{discomfort_level} >= 1',
					title: 'Please select all current areas of discomfort.',
					choices: [
						{
							value: 'neck',
							text: 'Neck',
						},
						{
							value: 'shoulders',
							text: 'Shoulders',
						},
						{
							value: 'upper-back',
							text: 'Upper-back',
						},
						{
							value: 'lower-back',
							text: 'Lower-back',
						},
						{
							value: 'hips',
							text: 'Hips',
						},
					],
					hasSelectAll: true,
				},
			],
		},
	],
}

function App({ addData, suggestStretch }) {
  let userId = useSelector((state) => state.auth.id);
  const survey = new Model(surveyJson);

  const alertResults = useCallback(
    (sender) => {
      const results = sender.data;
      results.userId = userId;
      // console.log("results: ", results);
      if (userId) {
        addData(results);
      }
      if (results.pain_area) {
        suggestStretch(results.pain_area);
      }
    },
    [userId]
  );

  survey.onComplete.add(alertResults);


	return <Survey model={survey} />
}

const mapDispatch = (dispatch) => {
  return {
    addData: (data) => dispatch(addData(data)),
    suggestStretch: (pain_area) => dispatch(suggestStretch(pain_area)),
  };
};


export default connect(null, mapDispatch)(App)
