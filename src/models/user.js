const mongoose = require('../database/connection')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  type: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  company: {
    type: String,
    required: false
  },
  cnpj: {
    type: Number,
    required: false
  },
  position: {
    type: Number,
    required: false
  },
  medal: {
    type: Array,
    required: false
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
