class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    async getCarts() {
        return await this.dao.get()
    }

    async getCart(filter){
        return await this.dao.getBy(filter)
    }

    async createCart(newCart){
        return await this.dao.create(newCart)
    }

    async updateCart(cid, cartToUpdate) {
        return await this.dao.update(cid, cartToUpdate)
    }

    async deleteCart(cid) {
        return await this.dao.delete(cid)
    }
}

module.exports = { CartRepository }