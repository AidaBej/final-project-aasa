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
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406185/ironhack-project-3/properties/old-whorkshop-bohemian-1_xda3yc.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/old-whorkshop-bohemian-2_xun8hh.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/old-whorkshop-bohemian-3_bm0rh2.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-4_yfq3aq.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-5_vfmteo.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-6_kir6ge.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-7_qqnyin.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-8_vceidy.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-9_yq4ib2.jpg',
    ],
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
    pictures: [],
    localisation: '',
    description:
      'Rue de la Lune, space designed by architect of 29 m2 (28,55 m2 carrez) square located on the ground floor in a charming condominium. The crossing place offers a stay with a done up kitchen on courtyard, and side street a dining area. Between two windows, a bed has been cleverly arranged. A walk-in shower room with toilet completes the place. Contemporary spirit, optimized plan, quality materials, characterizes this apartment sold furnished and equipped. Metro Bonne Nouvelle. Contact : Aimée, 0666789151',
  },
]

propertyModel
  .deleteMany()
  .then(() => {
    return propertyModel.create(properties)
  })
  .then(propertyCreated => {
    console.log(
      `${propertyCreated.length} property created with the following id:`
    )
    console.log(propertyCreated.map(property => property._id))
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
