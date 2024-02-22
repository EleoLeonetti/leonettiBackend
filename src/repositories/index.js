const productDaoMongo       = require("../daos/Mongo/productDaoMongo.js")
const cartDaoMongo          = require("../daos/Mongo/cartDaoMongo.js")
const userDaoMongo          = require("../daos/Mongo/userDaoMongo.js")
const ticketDaoMongo        = require("../daos/Mongo/ticketDaoMongo.js")
const { ProductRepository } = require("./products.repository.js")
const { CartRepository }    = require("./carts.repository.js")
const { UserRepository }    = require("./users.repository.js")
const { TicketRepository }  = require("./ticket.repository.js")

const productService = new ProductRepository(new productDaoMongo)
const cartService    = new CartRepository(new cartDaoMongo)
const userService    = new UserRepository(new userDaoMongo)
const ticketService  = new TicketRepository(new ticketDaoMongo)

module.exports = {
    productService,
    cartService,
    userService,
    ticketService
}