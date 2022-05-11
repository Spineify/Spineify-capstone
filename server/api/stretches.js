const router = require("express").Router();
module.exports = router;
const Stretch = require('../db/models/Stretch')
const { Op } = require('sequelize')

//GET all stretches request
router.get('/', async (req, res, next) => {
  try {
    const data = await Stretch.findAll();
  res.send(data)
  } catch (err) {
    next(err);
  }
})

router.get('/:painArea', async (req, res, next) => {
  console.log(req.params.painArea)
  try {
    console.log('got into try???')
    const painArea = [req.params.painArea]
    const data = await Stretch.findAll({
      where: {
        category: painArea
      }
    })
    console.log("STRETCH DATA: ", data)
    res.send(data)
  } catch(err) {
    next(err)
  }
})
