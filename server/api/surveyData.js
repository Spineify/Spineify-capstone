const router = require('express').Router()
const SurveyData = require('../db/models/SurveyData')
const {
	models: { User },
} = require('../db')
const { Op } = require('sequelize')

module.exports = router

// GET request
// we do not need to get all survey data (no admin feature)
// router.get('/', async (req, res, next) => {
// 	try {
// 		const data = await SurveyData.findAll()
// 		res.send(data)
// 	} catch (err) {
// 		next(err)
// 	}
// })

// GET /api/surveydata/today
router.get('/today', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		const today = new Date().toISOString()
		let data = await SurveyData.findAll({
			where: {
				userId: user.id,
			},
		})
		data = data.filter((element) => {
			const date = element.createdAt.toISOString()
			return date.substr(0, 10) === today.substr(0, 10)
		})
		res.send(data)
	} catch (err) {
		next(err)
	}
})

// POST request
router.post('/', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		const newData = await SurveyData.create({
			userId: user.id,
			discomfort_level: req.body.discomfort_level,
			pain_area: req.body.pain_area,
		})
		res.send(newData).status(201)
	} catch (err) {
		next(err)
	}
})
