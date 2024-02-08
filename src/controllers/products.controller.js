const productDaoMongo = require('../daos/Mongo/productDaoMongo.js')

class ProductController {
    constructor() {
        this.productService = new productDaoMongo()
    }

    getProducts = async (req, res) => {
        const { limit, page, filter, sort } = req.query;
    
        try {
            const productsResponse = await this.productService.getProducts(filter, sort, Number(limit) || 10, Number(page) || 1)
    
            res.send(productsResponse)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: 'error',
                message: 'Internal server error'
            })
        }
    }

    getProductById = async (req, res) => { 
        const { pid } = req.params
        try{
            const product = await this.productService.getProductById(pid)
            if(product){
                res.send({
                    status: 'success',
                    payload: product
                })
            }
                    res.status(400).send({
                    status: 'error',
                    message: "Product not found"
            })
        }catch(error){
            console.log(error)
        }
     }

     addProduct = async (req, res) => {
        const newProduct = req.body
        try{
            if(!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category || !newProduct.thumbnails){
                return res.status(400).send({
                    status: 'error', 
                    error: 'Missing data. Complete mandatory fields'})
            }
            if(this.productService.code === newProduct.code){
                console.log('Repeated code')
            }
            const productAdded = await this.productService.addProduct(newProduct)
            res.status({
                status:'Product added',
                payload: productAdded
            })
        }catch(error){
            console.log(error)
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const productToUpdate = req.body;
            const updatedProduct = await this.productService.updateProduct(pid, productToUpdate)

            if(!updatedProduct){
                return res.send({
                    status: 'error',
                    message: 'Product not found'
                })
            }
            res.send(updatedProduct)
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: 'Cannot update product'
            });
        }
    }

    deleteProduct = async (req, res) => {
        const { pid } = req.params
        try {
            const productToDelete = await this.productService.deleteProduct(pid);
            if (!productToDelete) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                })
            }
            res.status(200).json({
                status: 'success',
                payload: productToDelete
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            })
        }
    }
    
}

module.exports = ProductController