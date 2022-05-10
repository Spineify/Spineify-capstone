const router = require("express").Router();
const {
  models: { User, Posture },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET /users/:id/poses (get all)
router.get("/:id/poses", async (req, res, next) => {
  try {
    //token check, in axios, set authorization header
    const user = await User.findByToken(req.headers.authorization);
    const poses = await Posture.findAll({ where: { userId: user.id } });
    res.send(poses);
  } catch (error) {
    next(error);
  }
});

//POST /users/:id/pose (add pose)
router.post("/:id/pose", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const data = req.body.data;
    let max = 0;
    let type;
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[i].probability > max) {
        max = data[i].probability;
        type = data[i].className;
      }
    }
    const pose = Posture.create({ data, type, userId: user.id });
    res.send(pose);
  } catch (error) {
    next(error);
  }
});

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    next();
  } catch (e) {
    next(e);
  }
};
