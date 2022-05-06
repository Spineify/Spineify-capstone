const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios')

const BaseCalibration = db.define('baseCalibration', {
	data: {
		type: Sequelize.JSON,
		allowNull: false,
	},
	type: {
		type: Sequelize.ENUM('left', 'center', 'right'),
		allowNull: false,
	},
})

module.exports = BaseCalibration
