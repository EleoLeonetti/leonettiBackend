const { Router }       = require('express')
const passport         = require('passport')
const userDaoMongo     = require('../daos/Mongo/userDaoMongo')
const { passportCall } = require('../utils/passportCall.js')
const { createHash, isValidPassword }      = require('../utils/hashPassword')
const { createToken, authenticationToken } = require('../utils/jwt.js')
const { authorizationJwt }                 = require('../middlewars/jwtPassport.middleware.js')

const router       = Router()
const usersService = new userDaoMongo()

router.post('/register', async (request, response) => {
    const { first_name, last_name, birthdate, email, role, password } = request.body
    if(first_name === '' || last_name === '' || birthdate === '' || email === '' || password === ''){
        return response.send('All fields are required')
    }

    const user = await usersService.getUserBy({email})
    if(user) return response.status(401).send({status: 'error', message: 'The email is already registered'})

    const newUser = {
        first_name,
        last_name,
        birthdate,
        email,
        role,
        password: createHash(password)
    }

    if(newUser.email === 'adminCoder@coder.com' || newUser.password === 'adminCod3r123'){
        newUser.role = 'admin'
    }

    let result = await usersService.createUser(newUser)
    console.log(result)
    
    const token = createToken({
        id: result._id
    })

    response.cookie('token', token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true
    }).send({
        status: 'Success',
        message: 'Registered'
        })
})

router.post('/login', async (request, response) => {
    const { email, password } = request.body
    if(email === '' || password === ''){
        return response.send('All fields are required')
    }

    const user = await usersService.getUserBy({email})
    console.log(user)
    if(!user) return response.status(401).send({status: 'error', message: 'Wrong email or password'})

    if(!isValidPassword(password, {password: user.password})) return response.status(401).send({status: 'error', message: 'Wrong email or password'})

    const token = createToken({
        id: user._id,
        email: user.email,
        role: user.role
    })

    response.cookie('token', token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true
    }).send({
        status: 'Success',
        message: 'Logged in'
        })
})

router.get('/current', passportCall('jwt'), authorizationJwt('admin'), (req, res) => {
    res.send({message: 'Datos sensibles', reqUser: req.user})
})

router.post('/logout', (request, response) => {
    response.clearCookie('token').redirect('/login')
})

module.exports = router