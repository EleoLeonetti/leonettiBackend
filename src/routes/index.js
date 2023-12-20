const { Router }     = require('express')
const productsRouter = require('./products.router.js')
const cartsRouter    = require('./carts.router.js')
const messagesRouter = require('./chat.router.js')
const viewsRouter    = require('./views/index.router.js')
const chatRouter    = require('./chat.router.js')

const router = Router()

router.use('/home', viewsRouter)
router.use('/chat', chatRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts',    cartsRouter)
router.use('/api/messages', messagesRouter)

module.exports = router