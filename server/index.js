const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed')
const {
	models: { User, PetPlant, Posture },
} = require('./db')
const cron = require('node-cron')
const Sequelize = require('sequelize')

const init = async () => {
	try {
		if (process.env.SEED === 'true') {
			await seed()
		} else {
			await db.sync()
		}
		// start listening (and create a 'server' object representing our server)
		app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
	} catch (ex) {
		console.log(ex)
	}
}

init()

//right now its at 5pm everday
cron.schedule('0 17 * * *', async () => {
	// cron.schedule('*/5 * * * * *', async () => {
	console.log('this runs every day to check on posture')
	const users = await User.findAll()
	let today = new Date().toISOString()
	let date = today.substr(0, 10)
	for (let i = 0; i < users.length; i++) {
		let currentUser = users[i]
		const poses = await Posture.findAll({
			where: {
				userId: currentUser.id,
			},
		})
		const todaysPoses = poses.filter((pose) => {
			let currentDate = new Date(pose.createdAt).toISOString()
			return currentDate.substr(0, 10) == date
		})
		const numOfPoses = todaysPoses.length
		const numOfGoodPoses = todaysPoses.filter(
			(pose) => pose.type === 'Good Posture'
		).length
		const percentageOfGood = (numOfGoodPoses / numOfPoses) * 100

		//define daily reward item
		let item
		if (percentageOfGood >= 90) {
			item = 'fertilizer'
		} else if (percentageOfGood >= 75) {
			item = 'nutritiousWater'
		} else if (percentageOfGood >= 50) {
			item = 'water'
		}

		await currentUser.updateInventory(item)
	}
})

//right now its at 5pm every two days
cron.schedule('0 17 */2 * *', async () => {
	// cron.schedule('*/10 * * * * *', async () => {
	console.log('this runs every 2 days and check if user fed tree')
	const users = await User.findAll()
	let today = new Date().getTime()
	//check when the plant instance was last updated
	//if updatedAt < 2 days from today, then do nothing
	//if updatedAt >= 2 days from today, then deduct 2 points
	for (let i = 0; i < users.length; i++) {
		let currentUser = users[i]
		const plant = await PetPlant.findOne({ where: { userId: currentUser.id } })
		const { lastPointIncrease } = plant

		const lastUpdatedDate = new Date(lastPointIncrease).getTime()
		let differenceInDays = (today - lastUpdatedDate) / (1000 * 3600 * 24)

		if (differenceInDays >= 2) {
			await currentUser.deductPoints()
		}
	}
})
