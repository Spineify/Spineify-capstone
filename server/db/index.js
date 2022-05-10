//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Posture = require('./models/Posture')
const Stretch = require('./models/Stretch')
const SurveyData = require('./models/SurveyData')
// const BaseCalibration = require('./models/BaseCalibration')

//associations could go here!

User.hasMany(Posture)
Posture.belongsTo(User)
User.hasMany(SurveyData)
SurveyData.belongsTo(User)
// User.hasMany(BaseCalibration)
// BaseCalibration.belongsTo(User)

module.exports = {
	db,
	models: {
		User,
		Stretch,
		Posture,
		SurveyData,
		// BaseCalibration,
	},
}
