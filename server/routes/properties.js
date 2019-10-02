const express = require('express')
const Property = require('../models/Property')
const router = express.Router()
const User = require('../models/User')
require('dotenv').config()
require('../configs/database')

// GET all  Properties
router.get('/all', (req, res, next) => {
  Property.find()
    .then(properties => {
      console.log(properties)
      res.json(properties)
    })
    .catch(err => next(err))
})

// GET Properties FOR RENT
router.get('/forrent', (req, res, next) => {
  Property.find({ kind: 'For Rent' })
    .then(properties => {
      console.log(properties)
      res.json(properties)
    })
    .catch(err => next(err))
})

// GET properties FOR SALE
router.get('/forsale', (req, res, next) => {
  Property.find({ kind: 'For Sale' })
    .then(properties => {
      res.json(properties)
    })
    .catch(err => next(err))
})

// Checkbox à choix multiples

// Property.find({ rooms: [] })
//   .then(res => console.log(res.length))
//   .catch(err => console.log(err))

// Property.find({ bedrooms: [] })
//   .then(res => console.log(res.length))
//   .catch(err => console.log(err))

// Property.find({ others: [] })
//   .then(res => console.log(res.length))
//   .catch(err => console.log(err))

/* GET the page showing ONE property */

router.get('/detail/:id', (req, res, next) => {
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

// GET FAVORITE properties
router.get('/favorites', (req, res, next) => {
  User.find()
    .populate('favorite')
    .then(favorites => {
      res.json(favorites)
    })
    .catch(err => next(err))
})

router.post('/favorites', (req, res) => {
  let query = {}

  console.log('req.body', req.body.hearts)
  if (req.body.hearts.length) {
    console.log('query', query)
    query = req.body.hearts
  }
  User.findOneAndUpdate(
    { email: req.session.currentUser.email },
    { favorite: query }
  )
    .then(properties => res.send(properties))
    .catch(err => console.log(err))
})

router.post('/favorites/savefav', (req, res) => {
  User.findOne({ email: req.session.currentUser.email })
    .then(response => {
      res.send(response)
    })
    .catch(error => console.log(err))
})

router.post('/favorites/fav/delete', (req, res) => {
  let query = []

  if (req.body.hearts.length) {
    query = req.body.hearts
  }
  User.findOneAndUpdate(
    { email: req.session.currentUser.email },
    { favorite: query }
  )
    .then(properties => {
      {
        User.findOne({ email: req.session.currentUser.email })
          .populate('favorite')
          .then(response => {
            res.send(response)
          })
          .catch(error => console.log(error))
      }
    })
    .catch(err => console.log(err))
})
module.exports = router
