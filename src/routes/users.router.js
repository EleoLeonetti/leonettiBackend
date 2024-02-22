const { Router }           = require('express')
const { passportCall }     = require('../utils/passportCall.js')
const { authorizationJwt } = require('../middlewars/jwtPassport.middleware.js')
const UserController       = require('../controllers/users.controller.js')

const router = Router()

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = new UserController()

router
    .get('/',        passportCall('jwt'), authorizationJwt('admin'), getUsers)
    .get('/:uid',    getUser)
    .post('/',       createUser)
    .put('/:uid',    updateUser)
    .delete('/:uid', deleteUser)

module.exports = router