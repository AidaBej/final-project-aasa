const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title of the property is required'],
    minlength: 1,
  },
  type: {
    type: String,
    enum: ['Apartment', 'Triplex', 'Loft', 'Penthouse', 'Barge'],
    required: true,
  },
  kind: {
    type: String,
    enum: ['For Rent', 'For Sale'],
    required: true,
  },
  location: {
    type: String,
    enum: [
      'Paris 1er',
      'Paris 2e',
      'Paris 3e',
      'Paris 4e',
      'Paris 5e',
      'Paris 6e',
      'Paris 7e',
      'Paris 8e',
      'Paris 9e',
      'Paris 10e',
      'Paris 11e',
      'Paris 12e',
      'Paris 13e',
      'Paris 14e',
      'Paris 15e',
      'Paris 16e',
      'Paris 17e',
      'Paris 18e',
      'Paris 19e',
      'Paris 20e',
    ],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  others: {
    type: String,
    enum: ['Balcony', 'Swimming Pool', 'Terrace', 'Caretaker'],
  },
  picture: {
    type: String,
  },
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property
