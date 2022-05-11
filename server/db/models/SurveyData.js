const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const SurveyData = db.define("surveyData", {
  discomfort_level: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pain_area: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = SurveyData;
