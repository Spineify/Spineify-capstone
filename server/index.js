const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");
const {
  models: { User, PetPlant, Posture },
} = require("./db");
const cron = require("node-cron");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();

cron.schedule("* * * * *", async () => {
  console.log("this runs every minute");
  const users = await User.findAll();
  let today = new Date().toISOString();
  let date = today.substr(0, 10);
  for (let i = 0; i < users.length; i++) {
    let currentUser = users[i];
    const plant = await PetPlant.findOne({ where: { userId: currentUser.id } });
    //console.log("plant", plant);
    const poses = await Posture.findAll({
      where: {
        userId: currentUser.id,
      },
    });
    const todaysPoses = poses.filter((pose) => {
      let currentDate = new Date(pose.createdAt).toISOString();
      return currentDate.substr(0, 10) == date;
    });
    const numOfPoses = todaysPoses.length;
    const numOfGoodPoses = todaysPoses.filter(
      (pose) => pose.type === "Good Posture"
    ).length;
    const percentageOfGood = (numOfGoodPoses / numOfPoses) * 100;

    if (percentageOfGood >= 90) {
      plant.inventory.fertilizer++;
    } else if (percentageOfGood >= 75) {
      plant.inventory.nutritiousWater++;
    } else if (percentageOfGood >= 50) {
      plant.inventory.water++;
    }
    // console.log("UPDATED PLANT", plant);
    const newPlant = await plant.save();
    //console.log("Saved plant", newPlant);
  }
});
