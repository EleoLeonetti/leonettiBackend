const { Router }           = require('express')
const { passportCall }     = require('../utils/passportCall.js')
const { authorizationJwt } = require('../middlewars/jwtPassport.middleware.js')
const SessionController    = require('../controllers/sessions.controller.js')

const router = Router()

const { 
    register,
    login,
    logout,
    authorization
} = new SessionController()

router
    .post('/register', register)
    .post('/login',    login)
    .post('/logout',   logout)
    .get('/current',   passportCall('jwt'), authorizationJwt('user'), authorization)

module.exports = router