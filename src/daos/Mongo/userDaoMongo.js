const { usersModel } = require('../Mongo/models/users.models.js')

class userDaoMongo {
    constructor() {
        this.model = usersModel
    }

    get    = async() => this.model.find({})

    getBy  = async (filter) => this.model.findOne(filter)

    create = async (newUser) => this.model.create(newUser)

    update = async (uid, userToUpdate) => this.model.findByIdAndUpdate({_id: uid}, userToUpdate, {new: true})

    delete = async (uid) => this.model.findByIdAndDelete({_id: uid}, {new: true})
    
}

module.exports = userDaoMongo