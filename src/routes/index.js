const { Router }          = require('express')
const productsRouter      = require('./products.router.js')
const viewsProductsRouter = require('./views/products.router.js')
const viewsCartRouter     = require('./views/cart.router.js')
const cartsRouter         = require('./carts.router.js')
const messagesRouter      = require('./chat.router.js')
const chatRouter          = require('./chat.router.js')

const router = Router()

router.use('/chat', chatRouter)
router.use('/products', viewsProductsRouter)
router.use('/carts', viewsCartRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts',    cartsRouter)
router.use('/api/messages', messagesRouter)

module.exports = router