const express = require('express')
const router = express.Router()
const Property = require('../models/Property')

/* GET the page showing ONE property to Edit*/

router.get('/:id', (req, res, next) => {
  Property.findByIdAndRemove(req.params.id)
    .then(dbRes => {
      res.redirect('/manage-property')
    })
    .catch(error => {
      console.log('error', error)
    })
})

module.exports = router
