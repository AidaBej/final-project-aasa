const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: String,
    password: String,
    favorite: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Properties',
      },
    ],
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
