const express = require('express')
const Property = require('../models/Property')
const router = express.Router()

// Route to get all properties
router.get('/', (req, res, next) => {
  Property.find()
    .then(properties => {
      res.json(properties)
    })
    .catch(err => next(err))
})

// Route to get properties FOR SALE
router.get('/:id', (req, res, next) => {
  Property.findById(req.params.id)
    .then(properties => {
      res.json(properties)
    })
    .catch(err => {
      next({ message: 'No property', status: 400 })
    })
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
