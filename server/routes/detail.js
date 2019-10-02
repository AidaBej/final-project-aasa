const express = require('express')
const router = express.Router()
const Property = require('../models/Property')

/* GET the page showing ONE property */

router.get('/:id', (req, res, next) => {
  console.log('ici', req.params.id)
  Property.findById(req.params.id)
    .then(dbRes => {
      console.log(dbRes)
      res.send(dbRes)
    })
    .catch(error => {
      console.log('error', error)
    })
})

module.exports = router
