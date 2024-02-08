const passport        = require('passport')
const userDaoMongo    = require('../daos/Mongo/userDaoMongo.js')
const { createToken } = require('../utils/jwt.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')

class SessionController {
    constructor(){
        this.usersService = new userDaoMongo()
    }

    register = async (request, response) => {
        const { first_name, last_name, birthdate, email, role, password } = request.body
        if(first_name === '' || last_name === '' || birthdate === '' || email === '' || password === ''){
            return response.send('All fields are required')
        }
    
        const user = await this.usersService.getUserBy({email})
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
    
        let result = await this.usersService.createUser(newUser)
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
    }

    login = async (request, response) => {

        const { email, password } = request.body
        if(email === '' || password === ''){
            return response.send('All fields are required')
        }
    
        const user = await this.usersService.getUserBy({email})
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
    }

    logout = (request, response) => {
        response.clearCookie('token').redirect('/login')
    }

    authorization = (req, res) => {
        res.send({message: 'Datos sensibles', reqUser: req.user})
    }
}

module.exports = SessionController
