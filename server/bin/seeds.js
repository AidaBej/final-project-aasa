const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const User = require('../models/User')
const Property = require('../models/Property')

// const bcryptSalt = 10

require('../configs/database')
// ['Apartment', 'Triplex', 'Loft', 'Penthouse', 'Barge'],
// ['For Rent', 'For Sale'],
// ['Balcony', 'Swimming Pool', 'Terrace', 'Caretaker'],

let properties = [
  {
    title: 'Old workshop with a bohemian spirit',
    type: 'Apartment',
    kind: 'For Sale',
    location: 'Paris 2',
    budget: 1298000,
    size: 101,
    rooms: 3,
    bedrooms: 2,
    others: null,
    picture: '../../client/public/img-properties/old-whorkshop-bohemian-1.jpg',
    localisation: '',
    description:
      'Near the Montorgueil district, this former workshop of 101 m2 Carrez is located on the 3rd floor of a small condominium without elevator. The entrance serves a living room of 41 m2 extended kitchen open, then a master bedroom with storage and bathroom, a second bedroom, a bathroom and separate toilet. Between two courtyards, this crossing apartment is bathed in light thanks to its many openings giving clear views. This calm place of life, with pleasant volumes, is decorated in bohemian chic spirit. A cellar completes this property. Subject to the status of the condominium. Metro: Sentier. Contact : Aïda, 0624409581',
  },
]

// User.deleteMany()
//   .then(() => {
//     return User.create(users)
//   })
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`)
//     console.log(usersCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })
