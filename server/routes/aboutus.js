const express = require('express')
// const Property = require('../models/Property')

const router = express.Router()

// Route to About us page
router.get('/', (req, res, next) => {
  About.find()
    .then(aboutus => {
      res.json(aboutus)
    })
    .catch(err => next(err))
})

module.exports = router
