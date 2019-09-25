const express = require('express')
const Property = require('../models/Property')
const router = express.Router()
const uploader = require('../configs/cloudinary')

// Route to get properties FOR SALE
router.get('/', (req, res, next) => {
  Property.find({ kind: 'For Sale' })
    .then(properties => {
      res.json(properties)
    })
    .catch(err => next(err))
})

// Route to add a new property
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
