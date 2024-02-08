const { Router }    = require('express')
const CartController = require('../controllers/carts.controller.js')

const router       = Router()
const {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    updateCartProducts,
    updateProductQuantity
 } = new CartController()

router

    .post('/', createCart)

    .get('/:cid', getCartById )
    
    .post('/:cid/product/:pid', addProductToCart)

    .delete('/:cid/products/:pid', deleteProductFromCart)

    .delete('/:cid', deleteAllProductsFromCart)

    .put('/:cid', updateCartProducts)

    .put('/:cid/products/:pid', updateProductQuantity)

module.exports = router