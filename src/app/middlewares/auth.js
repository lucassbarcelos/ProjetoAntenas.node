const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).send({ error: 'No token provided' })

  jwt.verify(authHeader, JWT_SECRET, (error, decode) => {
    if (error) return res.status(401).send({ error: 'Invalid token ' + error })

    req.userId = decode.id

    return next()
  })
}
