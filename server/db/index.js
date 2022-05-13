//this is the access point for all things database related!
const db = require('./db')

const User = require('./models/User')
const Posture = require('./models/Posture')
const Stretch = require('./models/Stretch')
const SurveyData = require('./models/SurveyData')
const PetPlant = require('./models/PetPlant')
const UserStretch = require('./models/UserStretch')

//associations
User.hasMany(Posture)
Posture.belongsTo(User)

User.hasMany(SurveyData)
SurveyData.belongsTo(User)

User.hasOne(PetPlant)
PetPlant.belongsTo(User)

User.hasMany(Stretch)
Stretch.belongsToMany(User, {through: UserStretch})

UserStretch.belongsTo(User)
UserStretch.belongsTo(Stretch)

module.exports = {
	db,
	models: {
		User,
		Stretch,
		Posture,
		SurveyData,
		PetPlant,
		UserStretch
	},
}
