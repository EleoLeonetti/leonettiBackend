const { productModel } = require('./models/products.model.js')


class productDaoMongo {
    constructor() {
        this.model = productModel
    }

//Método para mostrar los productos en base de datos
async getProducts(filter, sort, limit = 10, page = 1) {
    let filterObject = { isActive: true };
    if (filter) {
        filterObject.category = filter
    }
    let sortObject = {};
    if (sort === 'asc') {
        sortObject.price = 1;
    } else if (sort === 'desc') {
        sortObject.price = -1;
    }
    try {
        return await this.model.paginate(filterObject, {limit, page, sort: sortObject, lean: true });
    } catch (error) {
        console.log('Error fetching products')
    }
}

//Método que recibe un id y busca y devuelve el producto con el id especificado
    async getProductById(pid){
        return await this.model.findOne({_id: pid})
    }

//Método para agregar productos. 
    async addProduct(newProduct){
        const checkCode = this.model.findOne({code: newProduct.code})
            return await this.model.create(newProduct)     
    }

//Método que recibe un id y campo a actualizar para modificar los datos del producto con ese id
async updateProduct(pid, productToUpdate) {
    try {
        const updatedProduct = await this.model.findByIdAndUpdate(
            { _id: pid },
            productToUpdate,
            { new: true }
        ).exec()
        return updatedProduct
    } catch (error) {
        console.log(error)
    }
}

//Método que recibe un id y elimina el producto que tenga ese id
async deleteProduct(pid) {
    try {
        const activeProduct = await this.model.findOne({ _id: pid })
        if (!activeProduct) {
            console.log('Error: Product not found')
            return null
        }
        activeProduct.isActive = false
        const updatedProduct = await activeProduct.save()
        return updatedProduct
    } catch (error) {
        console.log(error)
    }
}}

module.exports = productDaoMongo