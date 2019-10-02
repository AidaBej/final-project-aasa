// const express = require('express')
// const Property = require('../models/Property')
// const router = express.Router()

<<<<<<< HEAD
// // GET Properties FOR RENT
// router.get('/', (req, res, next) => {
//   Property.find({ kind: 'For Rent' })
//     .then(properties => {
//       console.log(properties)
//       res.json(properties)
//     })
//     .catch(err => next(err))
// })
=======
// GET Properties FOR RENT
router.get('/', (req, res, next) => {
  Property.find({ kind: 'For Rent' })
    .then(properties => {
      // console.log(properties)
      res.json(properties)
    })
    .catch(err => next(err))
})
>>>>>>> e2efb2e9f29e221f8b7f0d87d24539a8a73f7050

// module.exports = router
