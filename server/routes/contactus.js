const express = require('express')
// const Property = require('../models/Property')

const router = express.Router()

// Route to get all countries
router.get('/', (req, res, next) => {
  ContactUs.find()
    .then(contactus => {
      res.json(contactus)
    })
    .catch(err => next(err))
})

module.exports = router
