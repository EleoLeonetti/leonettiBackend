const { Router }           = require('express')
const { passportCall }     = require('../utils/passportCall.js')
const { authorizationJwt } = require('../middlewars/jwtPassport.middleware.js')
const ProductController    = require('../controllers/products.controller.js')

const router = Router()

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = new ProductController()

router
    .get('/',        getProducts)
    .get('/:pid',    getProduct)
    .post('/',       passportCall('jwt'), authorizationJwt('admin'), createProduct)
    .put('/:pid',    passportCall('jwt'), authorizationJwt('admin'), updateProduct)
    .delete('/:pid', passportCall('jwt'), authorizationJwt('admin'), deleteProduct)

module.exports = router