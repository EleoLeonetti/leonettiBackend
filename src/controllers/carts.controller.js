const { cartService }    = require('../repositories/index.js')
const { productService } = require('../repositories/index.js')

class CartController {
    constructor(){
        this.service  = cartService
        this.pService = productService
    }

    getCarts = async (req, res) => {
        try {
            const carts = await this.service.getCarts()
            if(!carts){
                return res.send({status: 'error', message: 'No carts found'}) 
            }
            res.send({status: 'success', payload: carts})

        } catch (error) {
            logger.error(err)
            res.status(500).send({status: 'error', message: error.message})
        }
    }


    getCart = async (req, res) =>{
        const {cid} = req.params
        try {
            const cart = await this.service.getCart({_id: cid})
            if(!cart){
                return res.send({status: 'error', message: 'Cart not found'})
            }
            res.send({status: 'succes', payload: cart})

        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }

    createCart = async (req, res) => {
        const newCart = req.body
        try {
            const result = await this.service.createCart(newCart)
            res.send({status: 'Cart created', payload: result})
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})   
        }
    }

    updateCart = async (req, res) =>{
        const { cid } = req.params
        const cartToUpdate = req.body.products

        try {
            const result = await this.service.updateCart(cid, cartToUpdate)
            if (!result) {
                return res.status(404).json({status: 'error', message: 'Cart not found'})
            }
            res.send({status: 'Cart updated', payload: result})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    deleteCart = async (req, res) => {
        const { cid } = req.params
        try {
            const result = await this.service.deleteCart(cid)
            if (!result) {
                return res.status(404).json({status: 'error', message: 'Cart not found'})
            }
            res.send({status: 'Cart deleted', payload: result})

        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }


    addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await this.service.getCart({_id: cid});
        if (!cart) {
            return res.send({status: 'error', message: 'Cart not found'}); 
        }

        const product = await this.pService.getProduct({_id: pid});
        if (!product) {
            return res.send({status: 'error', message: 'Product not found'}); 
        }

        cart.products.push({ 
            product: pid, 
            quantity: 1,
            price: product.price
        })
        await cart.save()
        return res.send({status: 'success', payload: cart})

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}


    updateProductQuantity = async (req, res) => {
        const { cid, pid } = req.params
        const { quantity } = req.body

        try {
            const cart = await this.service.getCart(cid)
            if(!cart){
                return res.send({status: 'error', message: 'Cart not found'})
            }
            const productIndex = cart.products.findIndex(item => item.product.toString() === pid)
            if(!productIndex){
                return res.send({status: 'error', message: 'Product not found'})
            }
            cart.products[productIndex].quantity = quantity
            await cart.save()
            res.send({status: 'success', payload: cart})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    removeProduct = async (req, res) => {
        const { cid, pid } = req.params

        try {
            const cart = await this.service.getCart(cid)
            if(!cart){
                return res.send({status: 'error', message: 'Cart not found'})
            }
            const productIndex = cart.products.findIndex(item => item.product.toString() === pid)
            if(!productIndex){
                return res.send({status: 'error', message: 'Product not found'})
            }
            cart.products.splice(productIndex, 1)
            await cart.save()
            res.send({status: 'success', payload: cart})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    clearCart = async (req, res) => {
        const { cid } = req.params

        try {
            const cart = await this.service.getCart(cid)
            if(!cart){
                return res.send({status: 'error', message: 'Cart not found'})
            } 
            cart.products = []
            await cart.save()
            res.send({status: 'success', payload: cart})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    endPurchase = async (req, res) => {
        const { cid } = req.params
    
        try {
            const cart = await this.service.getCart({ _id: cid })
            if (!cart) {
                return res.send({ status: 'error', message: 'Cart not found' })
            }
    
            const productsWithStock = []
            const productsWithoutStock = []
    
            for (const item of cart.products) {
                const product = await this.pService.getProduct({ _id: item.product })
                if (!product) {
                    return res.send({ status: 'error', message: 'Product not found' })
                }
    
                if (product.stock >= item.quantity) {
                    product.stock -= item.quantity
                    await product.save()
                    productsWithStock.push(item)
                } else {
                    productsWithoutStock.push(item)
                }
            }
    
            cart.productsWithStock = productsWithStock
            cart.productsWithoutStock = productsWithoutStock
            cart.purchase = true
            await cart.save()
    
            res.send({
                status: 'success',
                message: 'Purchase completed successfully',
                productsWithStock: productsWithStock,
                productsWithoutStock: productsWithoutStock
            })

        } catch (error) {
            res.status(500).send({ status: 'error', message: error.message })
        }
    }
}

module.exports = CartController