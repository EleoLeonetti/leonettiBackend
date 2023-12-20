const { Schema, model } = require('mongoose')
const { productModel } = require('./products.model');

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: productModel,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
})

const cartModel = model('carts', cartSchema)

module.exports = { cartModel }