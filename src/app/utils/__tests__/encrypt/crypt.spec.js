const { crypt } = require('../../encypt')

describe('utils/encrypt -> crypt', () => {
  it('should create a hash with valide characters', async () => {
    const valideCharacters =
      './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$'
    const valueToEncrypt = 'test'

    const hash = await crypt({ value: valueToEncrypt })
    const hashCharacters = hash.split('')

    hashCharacters.forEach((character) =>
      expect(valideCharacters.includes(character)).toBeTruthy()
    )
  })

  it('should create a hash with 60 characters long', async () => {
    const expectedLength = 60
    const valueToEncrypt = 'test'

    const hash = await crypt({ value: valueToEncrypt })

    expect(hash).toHaveLength(expectedLength)
  })
})
