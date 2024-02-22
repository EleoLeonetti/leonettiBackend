const passport            = require('passport')
const UserController      = require('./users.controller.js')
const { userService }     = require('../repositories/index.js')
const { createToken }     = require('../utils/jwt.js')
const { isValidPassword } = require('../utils/hashPassword.js')
const { createHash }      = require('../utils/hashPassword.js')

class SessionController {
    constructor(){
        this.service  = userService
        this.uService = new UserController()
    }

    register = async (req, res) => {
        try {
            const { first_name, last_name, birthdate, email, role, password } = req.body
            if(first_name === '' || last_name === '' || birthdate === '' || email === '' || password === ''){
                return res.send({status: 'error', message: "All fields are required"})
            }
            const user = await this.service.getUser({email})
            if(user) {
                return res.send({status: 'error', message: 'Email already exist'})
            }

            const newUser = {
                first_name,
                last_name,
                birthdate,
                email,
                role,
                password: createHash(password)
            }
        
            if(newUser.email === 'adminCoder@coder.com'){
                newUser.role = 'admin'
            }
        
            let result = await this.service.createUser(newUser)

            const token = createToken({
                id: result._id
            })

            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({status: 'Success', message: 'Registered'})
            
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }    
    }


    login = async (req, res) => {
        try {
            const { email, password } = req.body
            if(email === '' || password === ''){
                return res.send({status: 'error', message: "All fields are required"})
            }
    
            const user = await this.service.getUser({email})
            if(!user) return res.status(401).send({status: 'error', message: 'Wrong email or password'})
    
            if(!isValidPassword(password, {password: user.password})) return res.status(401).send({status: 'error', message: 'Wrong email or password'})
    
            const token = createToken({
                id: user._id,
                email: user.email,
                role: user.role
            })
    
            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({status: 'Success', message: 'Logged in'})
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
        
    }

    logout = (req, res) => {
        try {
            res.clearCookie('token').send({status: 'Success', message: 'Logged out'})
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }   
    }

    authorization = (req, res) => {
        try {
            res.send({message: 'User info', reqUser: req.user})
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }
}

module.exports = SessionController
