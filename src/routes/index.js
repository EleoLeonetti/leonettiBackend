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
router.use('/products',     viewsProductsRouter)
router.use('/api/carts',    cartsRouter)
router.use('/carts',        viewsCartRouter)
router.use('/api/messages', messagesRouter)
router.use('/chat',         chatRouter)
router.use('/register',     registerRouter)
//Desafío clase 21: Refactor a nuestro login
//router.use('/api/users', userRouter) //Crear para crud users
router.use('/api/sessions', sessionsRouter)
router.use('/',             viewsLoginRouter)

module.exports = router