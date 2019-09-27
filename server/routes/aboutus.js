const express = require('express')
// const Property = require('../models/Property')

const router = express.Router()

// Route to get all countries
router.get('/', (req, res, next) => {
  About.find()
    .then(aboutus => {
      res.json(aboutus)
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
