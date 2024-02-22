const { Router }           = require('express')
const { passportCall }     = require('../utils/passportCall.js')
const { authorizationJwt } = require('../middlewars/jwtPassport.middleware.js')
const CartController       = require('../controllers/carts.controller.js')

const router = Router()

const {
    getCarts,
    getCart,
    createCart,
    deleteCart,
    addProductToCart,
    updateProductQuantity,
    removeProduct,
    clearCart,
    endPurchase
 } = new CartController()

router
    .get('/',                      getCarts)
    .get('/:cid',                  getCart)
    .post('/',                     createCart)
    .delete('/:cid',               deleteCart)
    .post('/:cid/product/:pid',    passportCall('jwt'), authorizationJwt('user'), addProductToCart)
    .put('/:cid/product/:pid',     updateProductQuantity)
    .delete('/:cid/products/:pid', removeProduct)
    .delete('/clear/:cid',         clearCart)
    .put('/:cid/purchase',         endPurchase)

module.exports = router