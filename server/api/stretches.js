const router = require("express").Router();
module.exports = router;
const Stretch = require('../db/models/Stretch')

//GET request
router.get('/', async (req, res, next) => {
  try {
    const data = await Stretch.findAll();
  res.send(data)
  } catch (err) {
    next(err);
  }
})
