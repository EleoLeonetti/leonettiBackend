class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }

    async getTickets() {
        return await this.dao.get()
    }

    async getTicket(filter){
        return await this.dao.getBy(filter)
    }

    async createTicket(newTicket){
        return await this.dao.create(newTicket)
    }

    async updateTicket(tid, ticketToUpdate){
        return await this.dao.update(cid, ticketToUpdate)
    }

    async deleteTicket(tid){
        return await this.dao.delete(tid)
    }
}

module.exports = { TicketRepository }