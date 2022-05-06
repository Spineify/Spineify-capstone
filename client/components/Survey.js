import React, { useCallback } from "react";

import "survey-core/modern.min.css";
// import 'survey-core/survey.min.css';
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

StylesManager.applyTheme("modern");

const surveyJson = {
  title: "Spinefy",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "rating",
          name: "Discomfort level",
          title:
            "Rate your current level of discomfort. (0 = no discomfort, 10=highest level of discomfort)",
          isRequired: true,
          rateMin: 0,
          rateMax: 10,
          minRateDescription: "No",
        },
        {
          type: "checkbox",
          name: "question1",
          title: "Please select all current areas of discomfort.",
          choices: [
            {
              value: "item1",
              text: "Neck",
            },
            {
              value: "item2",
              text: "Shoulders",
            },
            {
              value: "item3",
              text: "Upper-back",
            },
            {
              value: "item4",
              text: "Lower-back",
            },
            {
              value: "item5",
              text: "Hips",
            },
          ],
        },
      ],
    },
  ],
};

function App() {
  const survey = new Model(surveyJson);
  console.log("SURVEY", survey);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default App;

// import React from "react";
// // import "survey-core/modern.min.css";
// // Default theme
// // import 'survey-core/survey.min.css';
// import "survey-core/defaultV2.min.css";
// import "survey-creator-core/survey-creator-core.min.css";
// import { StylesManager, Model } from "survey-core";
// import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

// const creatorOptions = {
//   showLogicTab: true,
//   isAutoSave: true,
// };

// StylesManager.applyTheme("default");

// const defaultJson = {
//   elements: [
//     {
//       name: "FirstName",
//       title: "Enter your first name:",
//       type: "text",
//     },
//     {
//       name: "LastName",
//       title: "Enter your last name:",
//       type: "text",
//     },
//   ],
// };
// export function Survey() {
//   const creator = new SurveyCreator(creatorOptions);
//   creator.text =
//     window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
//   creator.saveSurveyFunc = (saveNo, callback) => {
//     window.localStorage.setItem("survey-json", creator.text);
//     callback(saveNo, true);
//     // saveSurveyJson(
//     //     "https://your-web-service.com/",
//     //     creator.JSON,
//     //     saveNo,
//     //     callback
//     // );
//   };
//   return <SurveyCreatorComponent creator={creator} />;
// }

// export default Survey;
