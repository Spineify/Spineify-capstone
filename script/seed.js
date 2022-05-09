"use strict";

const {
  db,
  models: { User, Stretch },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const stretches = await Promise.all([
    //put stretches here. Check data types in db!
    Stretch.create({
      name: "Neck stretch",
      directions:
        "1) Relax in your chair and lean your head forward\n2) Slowly roll toward one side and hold for 10 seconds\n3) Repeat on other side\n4) Relax again and lift your chin back to starting position\n5) Repeat 3 times in each direction",
      category: ["neck"],
      imageURL:
        "https://www.performancehealth.com/media/wysiwyg/blog/articles/shutterstock_464539835.jpg",
    }),
    Stretch.create({
      name: "Latissimus or Overhead Reach stretch",
      directions:
        "1) Extend your right arm overhead and reach to the opposite side\n2) Hold for 10 to 30 seconds\n3) Repeat on the other side using your left arm",
      category: ["shoulders"],
      imageURL:
        "https://www.performancehealth.com/media/wysiwyg/blog/articles/shutterstock_1134004811.jpg",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
