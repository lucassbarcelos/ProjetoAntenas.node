const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env

module.exports = function generateToken(params = {}) {
  return jwt.sign(params, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME })
}
