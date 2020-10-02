const mongoose = require('mongoose')
const { uri, options } = require('../config/mongo')

mongoose.connect(uri, { ...options })
mongoose.Promise = global.Promise

mongoose.connection.on('error', () =>
  console.error('❌ an error occurred while attempting to connect')
)

module.exports = mongoose
