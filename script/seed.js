'use strict'

const {
	db,
	models: { User, Stretch, PetPlant },
} = require('../server/db')

const stretchesInstances = require('./stretches')
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }) // clears db and matches models to tables
	console.log('db synced!')

	// Creating Users
	const users = await Promise.all([
		User.create({
			firstName: 'Grace',
			lastName: 'Hopper',
			email: 'gh@gmail.com',
			password: '123',
		}),
		User.create({
			firstName: 'John',
			lastName: 'Doe',
			email: 'jd@gmail.com',
			password: '123',
		}),
	])

	// Creating Plants
	const plants = await Promise.all([
		PetPlant.create({
			level: 3,
			points: 11,
			userId: 1,
			inventory: { fertilizer: 100, nutritiousWater: 100, water: 100 },
		}),
		PetPlant.create({
			level: 5,
			points: 2,
			userId: 2,
			inventory: { fertilizer: 100, nutritiousWater: 100, water: 100 },
		}),
	])

	//Creating Stretches (Static)
	const stretches = await Promise.all(
		stretchesInstances.map((stretch) => Stretch.create(stretch))
	)

	console.log(
		`seeded ${users.length} users, ${plants.length} plants, and ${stretches.length} stretches`
	)
	console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...')
	try {
		await seed()
	} catch (err) {
		console.error(err)
		process.exitCode = 1
	} finally {
		console.log('closing db connection')
		await db.close()
		console.log('db connection closed')
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
