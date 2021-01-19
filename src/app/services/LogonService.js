const User = require('../../models/user')
const { compare, crypt } = require('../utils/encypt')
const generateToken = require('../utils/generateToken')

module.exports = {
  async create(req, res) {
    const { body } = req
    const { email } = body

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'User already exists' })
      }

      const hashedPassword = await crypt({ value: body.password })
      body.password = hashedPassword

      const user = await User.create(body)

      user.password = undefined
      return res.json({
        user,
        token: generateToken({ id: user._id })
      })
    } catch (err) {
      console.error(err)
      return res.status(400).send({ error: 'Registration failed' })
    }
  },

  async logon(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email }).select('+password')

      if (!user) return res.status(400).send({ error: 'User not found' })

      const passwordIsValid = await compare({
        value: password,
        hash: user.password
      })

      if (!passwordIsValid) {
        return res.status(400).send({ error: 'Invalid password' })
      }

      user.password = undefined

      return res.json({ user, token: generateToken({ id: user._id }) })
    } catch (error) {
      return res.status(400).send('Authentication failed ' + error)
    }
  }
}
