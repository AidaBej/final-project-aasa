const express = require('express')
const router = express.Router()
const Property = require('../models/Property')

/* GET the page showing ONE property to Edit*/

router.get('/:id', (req, res, next) => {
  Property.findById(req.params.id)
    .then(dbRes => {
      res.send(dbRes)
    })
    .catch(error => {
      console.log('error', error)
    })
})

module.exports = router
