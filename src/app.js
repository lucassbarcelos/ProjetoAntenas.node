require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  morgan.token('graphql-query', (req) => {
    const { query, variables, operationName } = req.body
    return `GRAPHQL: \nOperation Name: ${operationName} \nQuery: ${query} \nVariables: ${JSON.stringify(
      variables
    )}\n`
  })
  app.use(morgan(':graphql-query'))
}

require('./app/controllers/index')(app)

module.exports = app
