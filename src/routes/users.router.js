const { Router } = require('express')
const UserController = require('../controllers/users.controllers.js')

const router = Router()
const {
    getUsers,
    updateUser,
    deleteUser
} = new UserController

router.get('/', getUsers)

router.put('/:uid', updateUser)

router.delete('/:uid', deleteUser)