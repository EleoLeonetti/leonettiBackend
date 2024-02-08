const cartDaoMongo  = require('../daos/Mongo/cartDaoMongo')

class CartController {
    constructor(){
        this.cartService = new cartDaoMongo()
    }

    createCart = async (req, res) => {
        const newCartData = req.body
        try {
            const result = await this.cartService.createCart(newCartData.map(product => ({ product, quantity: 1 })))
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'Failed to create cart'
            })
        }
    }
    

    getCartById = async (req, res) => {
        const {cid} = req.params
        try{
            const cart = await this.cartService.getCart(cid)
            if(!cart){
                return res.status(404).send({
                    status: 'error',
                    messagge: 'Cart not found'
                })
            }
            res.send({
                status:'succes',
                payload: cart
            })
        }catch(error){
            console.log(error)
        }
    }

    addProductToCart = async (req, res) => {
        const { cid, pid } = req.params;
        try {
            if (!cid || !pid) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Cart ID and Product ID are required'
                })
            }

            const updatedCart = await this.cartService.addProductToCart(cid, pid)
    
            if (!updatedCart) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Cart not found or Product not found'
                })
            }

            res.status(200).json({
                status: 'success',
                payload: updatedCart
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            })
        }
    }
    

    deleteProductFromCart = async (req, res) => {

        const { cid, pid } = req.params

    try {
        const result = this.cartService.removeProductFromCart(cid, pid)

        res.send({
            status: 'success',
            ...result
        })

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message || 'Failed to clear cart'
        })
    }
    }

    deleteAllProductsFromCart = async (req, res) => {
        const { cid } = req.params
    
    try {
        const updatedCart = await this.cartService.clearCart(cid)
        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' })
        }
        res.status(200).json({ message: 'Success', cart: updatedCart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    }

    updateCartProducts = async (req, res) => {
        const { cid } = req.params
        const productsArray = req.body.products

        try {
            const updatedCart = await this.cartService.updateCartProducts(cid, productsArray)
            res.status(200).json({
                status: 'success',
                message: 'Cart updated successfully',
                payload: updatedCart
            })
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message:'Failed to update cart'
            })
        }
    }

    updateProductQuantity = async (req, res) => {
        const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const updatedProduct = await this.cartService.updateQuantity(cid, pid, quantity)

        res.send({
            status: 'success',
            message: 'Quantity updated successfully',
            updatedProduct
        })

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message || 'Failed to update quantity'
        })
    }
    }
}

module.exports = CartController