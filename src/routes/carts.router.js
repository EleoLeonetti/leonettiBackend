const { Router }   = require('express')
const cartDaoMongo = require('../daos/Mongo/cartDaoMongo')

const router       = Router()
const cartService  = new cartDaoMongo()

router
//La ruta POST crea un nuevo carrito
    .post('/', async (req, res) => {
        try{
        const newCart = await cartService.createCart()
        res.send({
            status:'succes',
            payload: newCart
        })
        }catch(error){
        console.log(error)
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

module.exports = router