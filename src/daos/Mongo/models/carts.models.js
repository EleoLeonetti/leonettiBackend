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
    },
    purchase: {
        type: Boolean,
        default: false
    },
    productsWithStock: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    productsWithoutStock: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }]
})

cartSchema.pre('find', function(){
    this.populate('products.product')
})

const cartModel = model('carts', cartSchema)

module.exports = { cartModel }