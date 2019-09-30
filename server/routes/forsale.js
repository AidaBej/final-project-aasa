require('dotenv').config()
require('../configs/database')
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

// Checkbox à choix multiples

Property.find({ rooms: [] })
  .then(res => console.log(res.length))
  .catch(err => console.log(err))

Property.find({ bedrooms: [] })
  .then(res => console.log(res.length))
  .catch(err => console.log(err))

Property.find({ others: [] })
  .then(res => console.log(res.length))
  .catch(err => console.log(err))

//ADD NEW PROPERTIES FOR SALE
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
