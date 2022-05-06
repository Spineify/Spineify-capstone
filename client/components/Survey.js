import React from "react";
// import "survey-core/modern.min.css";
// Default theme
// import 'survey-core/survey.min.css';
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { StylesManager, Model } from "survey-core";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};

StylesManager.applyTheme("default");

const defaultJson = {
  elements: [
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
    },
  ],
};
export function Survey() {
  const creator = new SurveyCreator(creatorOptions);
  creator.text =
    window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
  creator.saveSurveyFunc = (saveNo, callback) => {
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);
    // saveSurveyJson(
    //     "https://your-web-service.com/",
    //     creator.JSON,
    //     saveNo,
    //     callback
    // );
  };
  return <SurveyCreatorComponent creator={creator} />;
}

export default Survey;
