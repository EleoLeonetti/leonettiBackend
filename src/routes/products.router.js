const { Router }      = require('express')
const ProductController = require('../controllers/products.controller.js')

const router         = Router()
const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = new ProductController()

router

    .get('/', getProducts)

    .get('/:pid', getProductById )

    .post('/', addProduct)

    .put('/:pid', updateProduct)

    .delete('/:pid', deleteProduct)

module.exports = router