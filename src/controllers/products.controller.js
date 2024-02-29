const { productService } = require('../repositories/index.js')
const CustomError        = require('../services/errors/CustomError.js')
const { EErrors } = require('../services/errors/enums.js')
const { generateProductErrorInfo } = require('../services/errors/generateProductErrorInfo.js')

class ProductController {
    constructor() {
        this.service = productService   
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts()
            if(!products){
                return res.send({message: 'No products found'})
            }
            res.send({status: 'success', payload: products})

        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }

    getProduct = async (req, res) => { 
        const { pid } = req.params

        try{
            const product = await this.service.getProduct({_id: pid})
            if(product){
                return res.send({status: 'success', payload: product})
            }
                res.status(400).send({status: 'error', message: "Product not found"})

        }catch(error){
                res.status(500).send({status: 'error', message: error.message})
        }
     }


     createProduct = async (req, res, next) => {
        const newProduct = req.body;
        try {
            const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category', 'thumbnails'];
            const missingFields = requiredFields.filter(field => !newProduct.hasOwnProperty(field));
    
            if (missingFields.length > 0) {
                CustomError.createError({
                    name: 'Product creation error',
                    cause: generateProductErrorInfo(newProduct),
                    message: `Missing data. Complete mandatory fields: ${missingFields.join(', ')}`,
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
    
            const productCode = await this.service.getProduct({ code: newProduct.code });
            if (productCode) {
                return res.status(400).send({ status: 'error', error: 'Repeated code' });
            }
    
            const result = await this.service.createProduct(newProduct);
            res.send({ status: 'Product created', payload: result });
        } catch (error) {
            next(error);
        }
    }


    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const productToUpdate = req.body
            const result = await this.service.updateProduct(pid, productToUpdate)

            if(!result){
                return res.send({status: 'error', message: 'Product not found'})
            }
            res.send({status: 'Product updated', payload: result})

        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }


    deleteProduct = async (req, res) => {
        const { pid } = req.params
        try {
            const result = await this.service.deleteProduct(pid)
            if (!result) {
                return res.status(404).json({status: 'error', message: 'Product not found'})
            }
            res.send({status: 'Product deleted', payload: result})

        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    
}

module.exports = ProductController