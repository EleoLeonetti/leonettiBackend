const { productModel } = require('./models/products.model.js')


class productDaoMongo {
    constructor() {
        this.model = productModel
    }

async getProducts(filter, sort, limit = 10, page = 1) {
    let filterObject = { isActive: true }
    if (filter) {
        filterObject.category = filter
    }
    let sortObject = {};
    if (sort === 'asc') {
        sortObject.price = 1
    } else if (sort === 'desc') {
        sortObject.price = -1
    }
        return await this.model.paginate(filterObject, {limit, page, sort: sortObject, lean: true })
}


    async getProductById(pid){
        return await this.model.findOne({_id: pid})
    }

    async addProduct(newProduct){
        const checkCode = this.model.findOne({code: newProduct.code})
            return await this.model.create(newProduct)     
    }

async updateProduct(pid, productToUpdate) {

        const updatedProduct = await this.model.findByIdAndUpdate(
            { _id: pid },
            productToUpdate,
            { new: true }
        ).exec()
        return updatedProduct
}


async deleteProduct(pid) {
        const activeProduct = await this.model.findOne({ _id: pid });
        if (!activeProduct) {
            console.log('Error: Product not found');
            return null;
        }
        activeProduct.isActive = false;
        const updatedProduct = await activeProduct.save()
        return updatedProduct;
}
}

module.exports = productDaoMongo