const jwt = require('jsonwebtoken')
const generateToken = require('../../generateToken')
const { JWT_SECRET } = process.env

describe('utils/generateToken -> generateToken', () => {
  it('should return provided params when token is verified', async () => {
    const params = { id: 1, user: 'test' }
    const token = generateToken(params)

    const decodedToken = await jwt.verify(
      token,
      JWT_SECRET,
      (_, decode) => decode
    )

    expect(decodedToken.id).toEqual(params.id)
    expect(decodedToken.user).toEqual(params.user)
  })
})
