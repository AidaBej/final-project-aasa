const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
  label: {
    name: String,
    required: true,
  },
})

const adminSchema = mongoose.model('Tag', tagSchema)

module.exports = adminSchema
