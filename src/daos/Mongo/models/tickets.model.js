const { Schema, model } = require('mongoose')

const ticketSchema = new Schema({
    
    code: {
        type: String,
        require: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        require: true,
        default: Date.now
    },
    amount: {
        type: Number,
        require: true
    },
    carts: {
        cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts' 
        },
        products: {
            type: Array
        }
    }, 
    purchaser: {
        type: String
    }
})

ticketSchema.pre('find', function(){
    this.populate('cart')
})

const ticketModel = model('tickets', ticketSchema)

module.exports = { ticketModel }