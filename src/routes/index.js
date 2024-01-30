const { Router }          = require('express')
const productsRouter      = require('./products.router.js')
const viewsProductsRouter = require('./views/products.router.js')
const cartsRouter         = require('./carts.router.js')
const viewsCartRouter     = require('./views/cart.router.js')
const messagesRouter      = require('./chat.router.js')
const chatRouter          = require('./chat.router.js')
const sessionsRouter      = require('./sessions.router.js')
const registerRouter      = require('./views/register.router.js')
const viewsLoginRouter    = require('./views/login.router.js')

const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/carts',    cartsRouter)
router.use('/api/messages', messagesRouter)
router.use('/products',     viewsProductsRouter)
router.use('/carts',        viewsCartRouter)
router.use('/chat',         chatRouter)

router.use('/api/sessions', sessionsRouter)
router.use('/register',     registerRouter)
router.use('/login',        viewsLoginRouter)

module.exports = router