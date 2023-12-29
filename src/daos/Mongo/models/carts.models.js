const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1 
            }
        }]
    }
})

cartSchema.pre('find', function(){
    this.populate('products.product')
})

const cartModel = model('carts', cartSchema)

module.exports = { cartModel }