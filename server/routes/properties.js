const express = require('express')
const Property = require('../models/Property')
const router = express.Router()
const User = require('../models/User')
const cloudinary = require('../configs/cloudinary')

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

//ADD A NEW PROPERTY

router.post(
  '/add-new-property',
  cloudinary.single('pictures'),
  (req, res, next) => {
    const {
      title,
      type,
      kind,
      location,
      localisation,
      budget,
      size,
      rooms,
      bedrooms,
      others,
      description,
    } = req.body
    if (!req.body) {
      res.render('add-new-property', {
        errorMessage: 'Please fill all the form',
      })
      return
    }

    const newProperty = {
      title,
      type,
      kind,
      location,
      localisation,
      rooms,
      bedrooms,
      budget,
      size,
      others,
      description,
    }
    if (req.file) newItem.image = req.file.secure_url

    Property.create(newProperty)
      .then(proprety => {
        res.json({
          succes: true,
          proprety,
        })
      })
      .catch(err => next(err))
  }
)
// res.send('manage-property')
// .catch(error => {
//   console.log(error)
//   res.send('add-new-property', {
//     errorMessage: 'Duplicate property, please update form',
//   })
// })
// }
// )
// .then(country => {
//   res.json({
//     success: true,
//     country,
//   })
// })
// .catch(err => next(err))
// })

/* GET the page showing ONE property to Edit*/

router.get('/edit/:id', (req, res, next) => {
  Property.findById(req.params.id)
    .then(dbRes => {
      res.send(dbRes)
    })
    .catch(error => {
      console.log('error', error)
    })
})

/* GET the edit page to DELETE */

router.get('/delete/:id', (req, res, next) => {
  Property.findByIdAndRemove(req.params.id)
    .then(dbRes => {
      res.redirect('/manage-property')
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
  User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { favorite: req.body.propertyId },
    },
    { new: true }
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

router.delete('/favorites/:propertyId', (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { favorite: req.params.propertyId },
    },
    { new: true }
  )
    .then(properties => res.send(properties))
    .catch(err => console.log(err))
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

// getFavsOfLoggedInUser(id)

router.get(`/favorites/:id`, (req, res) => {
  console.log('here my favorites')
  User.findOne({ _id: req.params.id })
    .populate('favorite')
    .then(response => {
      console.log(response)
      res.send(response)
    })
    .catch(error => console.log(err))
})

module.exports = router
