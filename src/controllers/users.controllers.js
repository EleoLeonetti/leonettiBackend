const userDaoMongo = require("../daos/Mongo/userDaoMongo")

class UserController {
    constructor(){
        this.usersService = new userDaoMongo()
    }
    
    getUsers = async (req, res) => {
        try {
            const users = await this.usersService.getUsers()
            res.send(users)
        } catch (error) {
            console.log(error)
        }
    }
    
    updateUser = async (req, res) => {
        const { uid } = req.params
        const userToReplace = req.body
    
        const result = await this.usersService.updateUser({_id: uid}, userToReplace)
        res.status(201).send({
            status: 'succes',
            payload: result
        })
    }
    
    deleteUser = async (req, res) => {
        const { uid } = req.params
        const result = await this.usersService.deleteUser({_id: uid})
        res.status(200).send({
            status: 'success',
            payload: result
        })
    }
}

module.exports = UserController

