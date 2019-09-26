const express = require('express')
const Property = require('../models/Property')
const router = express.Router()

// GET Properties FOR RENT
router.get('/', (req, res, next) => {
  Property.find({ kind: 'For Rent' })
    .then(properties => {
      res.json(properties)
    })
    .catch(err => next(err))
})

// Route to add a country
// router.post('/', (req, res, next) => {
//   let { name, capitals, area, description } = req.body
//   Country.create({ name, capitals, area, description })
//     .then(country => {
//       res.json({
//         success: true,
//         country,
//       })
//     })
//     .catch(err => next(err))
// })

module.exports = router
