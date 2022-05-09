const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios')

const Stretch = db.define("stretch", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  directions: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    // validate: {
    //   isIn: [["neck", "upper-back", "lower-back", "shoulders", "hips"]],
    // },
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Stretch
