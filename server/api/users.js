const router = require('express').Router()
const {
	models: { User, Posture, PetPlant, Stretch, UserStretch },
} = require('../db')

module.exports = router

// do not need router to get all users
// router.get('/', async (req, res, next) => {
// 	try {
// 		const users = await User.findAll({
// 			// explicitly select only the id and username fields - even though
// 			// users' passwords are encrypted, it won't help if we just
// 			// send everything to anyone who asks!
// 			attributes: ['id', 'firstName', 'lastName', 'email'],
// 		})
// 		res.json(users)
// 	} catch (err) {
// 		next(err)
// 	}
// })

//GET /users/poses (get all)
router.get('/poses', async (req, res, next) => {
	try {
		//token check, in axios, set authorization header
		const user = await User.findByToken(req.headers.authorization)
		const poses = await Posture.findAll({ where: { userId: user.id } })
		res.send(poses)
	} catch (error) {
		next(error)
	}
})

//POST /users/pose (add pose)
router.post('/pose', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		const { data, type } = req.body
		const pose = Posture.create({ data, type, userId: user.id })
		res.send(pose)
	} catch (error) {
		next(error)
	}
})

router.get('/favorites', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		const favorites = await UserStretch.findAll({
			where: {
				userId: user.id,
			},
			include: {
				model: Stretch,
			},
		})
		res.send(favorites)
	} catch (err) {
		next(err)
	}
})

router.post('/favorites', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		const checkFavorite = await UserStretch.findOne({
			where: {
				userId: user.id,
				stretchId: req.body.id,
			},
		})
		if (!checkFavorite) {
			const newFavorite = await UserStretch.create({
				userId: user.id,
				stretchId: req.body.id,
			})
			res.send(newFavorite)
		} else console.log('already in favorites!')
	} catch (err) {
		next(err)
	}
})

router.delete('/favorites/:stretchId', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		await UserStretch.destroy({
			where: {
				userId: user.id,
				stretchId: req.params.stretchId,
			},
		})
		res.sendStatus(204)
	} catch (err) {
		next(err)
	}
})

//GET /users/plant (get single plant)
router.get('/plant', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		const petPlant = await PetPlant.findOne({ where: { userId: user.id } })
		res.send(petPlant)
	} catch (error) {
		next(error)
	}
})

//PUT /api/users
router.put('/plant', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		let petPlant = await PetPlant.findOne({ where: { userId: user.id } })
		let { level, points, inventory } = petPlant

		//define point system for each reward
		const pointSystem = { fertilizer: 3, nutritiousWater: 2, water: 1 }

		//determine ingredient given to tree
		const { item } = req.body

		//update instance (inventory, points, level)
		points = points + pointSystem[item]
		if (points >= 12) {
			if (level !== 15) {
				level++
				points = points - 12
			} else {
				points = 12
			}
		}
		inventory = { ...inventory, [item]: inventory[item] - 1 }

		//update petPlant with new attribute values
		res.send(
			await petPlant.update({
				level,
				points,
				inventory,
				lastPointIncrease: new Date(),
			})
		)
	} catch (error) {
		console.log(error)
		next(error)
	}
})
