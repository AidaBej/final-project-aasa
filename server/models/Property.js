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
      'Paris 1',
      'Paris 2',
      'Paris 3',
      'Paris 4',
      'Paris 5',
      'Paris 6',
      'Paris 7',
      'Paris 8',
      'Paris 9',
      'Paris 10',
      'Paris 11',
      'Paris 12',
      'Paris 13',
      'Paris 14',
      'Paris 15',
      'Paris 16',
      'Paris 17',
      'Paris 18',
      'Paris 19',
      'Paris 20',
    ],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
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
  localisation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number],
  },
  description: {
    type: String,
  },
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property
