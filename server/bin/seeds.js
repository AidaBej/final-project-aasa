const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const mongoose = require('mongoose')
const propertyModel = require('../models/Property')

// const bcrypt = require('bcrypt')
// const User = require('../models/User')
// const bcryptSalt = 10

require('../configs/database')
// ['Apartment', 'Triplex', 'Loft', 'Penthouse', 'Barge'],
// ['For Rent', 'For Sale'],
// ['Balcony', 'Swimming Pool', 'Terrace', 'Caretaker'],

const properties = [
  {
    title: 'Old workshop with a bohemian spirit',
    type: 'Apartment',
    kind: 'For Sale',
    location: 'Paris 2',
    budget: 1298000,
    size: 101,
    rooms: 3,
    bedrooms: 2,
    picture: '/img-properties/old-whorkshop-bohemian-1.jpg', '/img-properties/old-whorkshop-bohemian-2.jpg', '/img-properties/old-whorkshop-bohemian-3.jpg', '/img-properties/old-whorkshop-bohemian-4.jpg', '/img-properties/old-whorkshop-bohemian-5.jpg', '/img-properties/old-whorkshop-bohemian-6.jpg', '/img-properties/old-whorkshop-bohemian-7.jpg', '/img-properties/old-whorkshop-bohemian-8.jpg', '/img-properties/old-whorkshop-bohemian-9.jpg',
    description:
      'Near the Montorgueil district, this former workshop of 101 m2 Carrez is located on the 3rd floor of a small condominium without elevator. The entrance serves a living room of 41 m2 extended kitchen open, then a master bedroom with storage and bathroom, a second bedroom, a bathroom and separate toilet. Between two courtyards, this crossing apartment is bathed in light thanks to its many openings giving clear views. This calm place of life, with pleasant volumes, is decorated in bohemian chic spirit. A cellar completes this property. Subject to the status of the condominium. Metro: Sentier. Contact : Aïda, 0624409581',
  },
  {
    title: 'Mini loft in Montorgueil',
    type: 'Apartment',
    kind: 'For Sale',
    location: 'Paris 2',
    budget: 1298000,
    size: 101,
    rooms: 3,
    bedrooms: 2,
    picture: '/img-properties/old-whorkshop-bohemian-1.jpg', '/img-properties/old-whorkshop-bohemian-1.jpg'
    localisation: '',
    description:
      'Rue de la Lune, space designed by architect of 29 m2 (28,55 m2 carrez) square located on the ground floor in a charming condominium. The crossing place offers a stay with a done up kitchen on courtyard, and side street a dining area. Between two windows, a bed has been cleverly arranged. A walk-in shower room with toilet completes the place. Contemporary spirit, optimized plan, quality materials, characterizes this apartment sold furnished and equipped. Metro Bonne Nouvelle. Contact : Aimée, 0666789151',
  },
]

function insertProperties() {
  propertyModel
    .insertMany(properties)
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr))
}

insertProperties()

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
