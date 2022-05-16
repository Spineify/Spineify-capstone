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
	inventory: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: { water: 0, nutritiousWater: 0, fertilizer: 0 },
	},
})

module.exports = PetPlant
