const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const SurveyData = db.define("surveyData", {
  discomfort_level: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  pain_area: {
    type: Sequelize.ENUM(
      "neck",
      "upper-back",
      "lower-back",
      "shoulders",
      "hips"
    ),
    allowNull: true,
  },
});

module.exports = SurveyData;
