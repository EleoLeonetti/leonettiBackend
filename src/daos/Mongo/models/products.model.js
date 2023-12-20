const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnails: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const productModel = model('products', productSchema)

module.exports = { productModel }