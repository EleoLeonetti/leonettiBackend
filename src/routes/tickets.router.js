const { Router }       = require('express')
const { passportCall } = require('../utils/passportCall.js')
const TicketController = require('../controllers/tickets.controller.js')

const router = Router()

const {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
} = new TicketController()

router
    .get('/',        getTickets)
    .get('/:tid',    getTicket)
    .post('/:cid',   passportCall('jwt'), createTicket)
    .put('/:tid',    updateTicket)
    .delete('/:tid', deleteTicket)

    module.exports = router