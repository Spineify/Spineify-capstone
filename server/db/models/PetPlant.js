const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios')

const PetPlant = db.define('petPlant', {
	level: {
		type: Sequelize.INTEGER(),
		allowNull: false,
		defaultValue: 1,
	},
	points: {
		type: Sequelize.INTEGER(),
		allowNull: false,
		defaultValue: 0,
	},
})

module.exports = PetPlant
