const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Posture = db.define("posture", {
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM("good", "bad", "ok"),
    allowNull: false,
  },
});

module.exports = Posture;
