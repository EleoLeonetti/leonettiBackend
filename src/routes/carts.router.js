const { Router }    = require('express')
const cartDaoMongo  = require('../daos/Mongo/cartDaoMongo')
const { cartModel } = require('../daos/Mongo/models/carts.models.js')

const router       = Router()
const cartService  = new cartDaoMongo()

router
//La ruta POST crea un nuevo carrito
    .post('/', async (req, res) => {
        const newCart = req.body
        try{
            const result = await cartModel.create(newCart)
        res.send({
            status:'succes',
            payload: result
        })
        }catch(error){
        res.status(500).send({
            status: 'error',
            message: 'Failed to create cart'
        })
        }
    })

//La ruta GET /:cid trae el carrito con el parámetro cid proporcionado.
    .get('/:cid', async (req, res) => {
        const {cid} = req.params
        try{
            const cart = await cartService.getCart(cid);
            res.send({
                status:'succes',
                payload: cart
            })
        }catch(error){
            console.log(error)
        }
    })
    
//La ruta POST /:cid/product/:pid  agregar el producto a un carrito
    .post('/:cid/product/:pid', async (req, res) => {
        const { cid, pid } = req.params
        try{
            const updatedCart = await cartService.addProductToCart(cid, pid)
            res.status(200).json({
                status: 'succes',
                payload: updatedCart
            })
        }catch(error){
            console.log(error)
        }
    })

// La ruta DELETE /:cid/products/:pid eliminará un producto específico del carrito.
    .delete('/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params;

    try {
        const result = cartService.removeProductFromCart(cid, pid)

        res.send({
            status: 'success',
            ...result
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message || 'Failed to clear cart'
        });
    }
    })

// Ruta para eliminar todos los productos del carrito
    .delete('/:cid', async (req, res) => {
        const { cid } = req.params
    
    try {
        const updatedCart = await cartService.clearCart(cid)
        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' })
        }
        res.status(200).json({ message: 'Success', cart: updatedCart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    })

//Para actualizar la cantidad de ejemplares del producto
    .put('/:cid', async (req, res) => {
        const { cid } = req.params
        const productsArray = req.body.products

        try {
            const updatedCart = await cartService.updateCartProducts(cid, productsArray)
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
    })

// La ruta PUT /api/carts/:cid/products/:pid actualizará la cantidad del producto en el carrito.
    .put('/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const updatedProduct = await cartService.updateQuantity(cid, pid, quantity)

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
    })

module.exports = router