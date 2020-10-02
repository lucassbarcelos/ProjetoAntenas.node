const mongoose = require('../database/connection')

const MedalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: String,
  description: String
})

const Medal = mongoose.model('medal', MedalSchema)

module.exports = Medal
