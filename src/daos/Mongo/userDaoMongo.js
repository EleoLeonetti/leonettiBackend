const { usersModel } = require('../Mongo/models/users.models.js')

class userDaoMongo {
    constructor() {
        this.usersModel = usersModel
    }

    async getUsersPaginate(limit= 10, page= 1){
        return await this.usersModel.paginate({}, {limit, page, lean: true})
    } 

    async getUsers(){
        return await this.usersModel.find({})
    }

    async getUserBy(filter){
        return await this.usersModel.findOne(filter)
    }

    async createUser(newUser){
        return await this.usersModel.create(newUser)
    }

    async updateUser(uid, userUpdate){
        return await this.usersModel.findOneAndUpdate({_id: uid}, userUpdate)
}

    async deleteUser(uid){
        return await this.usersModel.findOneAndDelete({_id: uid})
    } 
}

module.exports = userDaoMongo