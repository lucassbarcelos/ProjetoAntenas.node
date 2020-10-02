const bcrypt = require('bcrypt')

const { SALT_ROUNDS } = process.env

async function crypt({ value }) {
  try {
    const rounds = Number(SALT_ROUNDS)

    const salt = await bcrypt.genSalt(rounds)

    const hash = await bcrypt.hash(value, salt)

    return hash
  } catch (err) {
    console.error(err)
    return err
  }
}

async function compare({ value, hash }) {
  const comparation = await bcrypt.compare(value, hash)

  return comparation
}

module.exports = {
  crypt,
  compare
}
