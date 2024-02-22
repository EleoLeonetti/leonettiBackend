class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    async getProducts() {
            return await this.dao.get()
    }
 
        
    async getProduct(filter){
        return await this.dao.getBy(filter)
    }


    async createProduct(newProduct){
        return await this.dao.create(newProduct)     
    }


    async updateProduct(pid, productToUpdate) {
        return await this.dao.update(pid, productToUpdate)
    }


    async deleteProduct(pid) {
        return await this.dao.delete(pid)
    }

}

module.exports = {ProductRepository}