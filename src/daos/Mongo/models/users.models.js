const {Schema, model}  = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const usersCollection = 'users'

const UsersSchema = Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true    
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    }
})

UsersSchema.pre('find', function(){
    this.populate('cart')
})

UsersSchema.plugin(mongoosePaginate)

const usersModel = model(usersCollection, UsersSchema)

module.exports = {
    usersModel
}