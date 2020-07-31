const { Router } = require('express')

const authentication = require('../features/authentication')

const authenticationRoutes = Router()

authenticationRoutes
  .post('/login', authentication.login)

module.exports = authenticationRoutes