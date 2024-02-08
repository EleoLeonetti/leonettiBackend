const { Router }       = require('express')
const SessionController = require('../controllers/sessions.controller.js')
const { passportCall } = require('../utils/passportCall.js')
const { authorizationJwt }                 = require('../middlewars/jwtPassport.middleware.js')

const router       = Router()
const { 
    register,
    login,
    logout,
    authorization
} = new SessionController()

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.get('/current', passportCall('jwt'), authorizationJwt('admin'), authorization)

module.exports = router