const express = require('express')
const LogonService = require('../services/LogonService')

const routes = express.Router()

routes.post('/register', LogonService.create)

routes.post('/logon', LogonService.logon)

routes.get('/ping', (req, res) => res.send('pong'))

module.exports = (app) => app.use('/api', routes)
