const passport        = require('passport')
const { userService } = require('../repositories/index.js')
const { createHash }  = require('../utils/hashPassword.js')


class UserController {
    constructor(){
        this.service = userService
    }

    getUsers = async (req, res) => {
        try {
            const users = await this.service.getUsers()
            if(!users){
                return res.send({message: 'No users found'})
            }
            res.send({status: 'success', payload: users})

        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }

    getUser = async (req, res) => { 
        const { uid } = req.params

        try{
            const user = await this.service.getUser({_id: uid})
            if(!user){
                return res.status(400).send({status: 'error', message: "User not found"})   
            }
            res.send({status: 'success', payload: user})
                
        }catch(error){
                res.status(500).send({status: 'error', message: error.message})
        }
     }


    createUser = async (req, res) => {
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
            res.send({status:'User created', payload: result})
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }

    updateUser = async (req, res) => {
        try {
            const { uid } = req.params
            const userToUpdate = req.body
            const result = await this.service.updateUser(uid, userToUpdate)

            if(!result){
                return res.send({status: 'error', message: 'User not found'})
            }
            res.send({status: 'success', payload: result})

        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }

    deleteUser = async (req, res) => {
        const { uid } = req.params
        try {
            const result = await this.service.deleteUser(uid)
            if (!result) {
                return res.status(404).json({status: 'error', message: 'User not found'})
            }
            res.send({status: 'User deleted', payload: result})

        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
}

module.exports = UserController
