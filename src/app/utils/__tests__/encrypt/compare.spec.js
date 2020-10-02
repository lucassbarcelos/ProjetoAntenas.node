const { crypt, compare } = require('../../encypt')

describe('utils/encrypt -> compare', () => {
  it('should return true when a valid hash is provided', async () => {
    const value = 'test'
    const hash = await crypt({ value })

    const comparation = await compare({ value, hash })

    expect(comparation).toBeTruthy()
  })

  it('should return false when a invalid hash is provided', async () => {
    const value = 'test'
    const invalidHash = 'a'.repeat(60)

    const invalidComparation = await compare({ value, hash: invalidHash })

    expect(invalidComparation).toBeFalsy()
  })
})
