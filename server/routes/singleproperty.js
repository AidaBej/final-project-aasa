const express = require('express')
const router = express.Router()
const Property = require('../models/Property')

/* GET the page showing ONE property */

router.get('/forrent/:id', (req, res, next) => {
  Property.findById(req.params.id)
    .then(dbRes => {
      res.render('singleproperty', { property: dbRes })
    })
    .catch(error => {
      console.log(error)
    })
})

router.get('/forsale/:id', (req, res, next) => {
  Property.findById(req.params.id)
    .then(dbRes => {
      res.render('singleproperty', { property: dbRes })
    })
    .catch(error => {
      console.log(error)
    })
})
