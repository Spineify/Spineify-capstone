const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios')

const Posture = db.define('posture', {
	data: {
		type: Sequelize.JSON,
		allowNull: false,
	},
	type: {
		type: Sequelize.ENUM(
			'Good Posture',
			'OK Posture',
			'Bad Posture',
			'No Posture'
		),
		allowNull: false,
	},
})

module.exports = Posture
