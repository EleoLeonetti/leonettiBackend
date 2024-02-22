const { ticketService }  = require('../repositories/index.js')
const { cartService }    = require('../repositories/index.js')
const { productService } = require('../repositories/index.js')
const { v4: uuidv4 }     = require('uuid')

class TicketController {
    constructor(){
        this.service = ticketService
        this.cService  = cartService
        this.pService = productService
    }

    getTickets = async (req, res) => {
        try {
            const tickets = await this.service.getTickets()
            if(!tickets){
                return res.send({message: 'No tickets found'})
            }
            res.send({status: 'success', payload: tickets})
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }

    getTicket = async (req, res) => {
        const { tid } = req.params

    try{
        const ticket = await this.service.getTicket({_id: tid})
        if(!ticket){
            return res.status(400).send({status: 'error', message: "Ticket not found"})   
        }
        res.send({status: 'success', payload: ticket})
            
    }catch(error){
            res.status(500).send({status: 'error', message: error.message})
    }}


    createTicket = async (req, res) => {
        try {
            const code = generateUniqueCode()
            const { cid } = req.body

            const cart = await this.cService.getCart(cid)
            if (!cart) {
                return res.status(404).send({status: 'error', message: 'Cart not found'})
            }

            const purchaserEmail = req.user.email

            const newTicketData = {
                code: code,
                carts: {
                    cart: cart._id,
                    products: cart.productsWithStock
                },
                purchaser: purchaserEmail
            }

            const createdTicket = await this.service.createTicket(newTicketData)

            cart.productsWithStock = []
            await cart.save()

            res.status(201).send({status: 'success', payload: createdTicket})
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }
    

    updateTicket = async (req, res) => {
        try {
            const { tid } = req.params
            const ticketToUpdate = req.body
            const result = await this.service.updateTicket(tid, ticketToUpdate)

            if(!result){
                return res.send({status: 'error', message: 'Ticket not found'})
            }
            res.send({status: 'success', payload: result})

        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }

    deleteTicket = async (req, res) => {
        const { tid } = req.params
        try {
            const result = await this.service.deleteTicket(tid)
            if (!result) {
                return res.status(404).json({status: 'error', message: 'Ticket not found'})
            }
            res.send({status: 'Ticket deleted', payload: result})

        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
}

function generateUniqueCode() {
    return uuidv4()
}

module.exports = TicketController