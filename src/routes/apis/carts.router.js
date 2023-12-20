const { Router}    = require('express');
const CartsManager = require('../../managers/cartManager')

const router       = Router();
const cartsService = new CartsManager();

router

//La ruta GET /:cid lista los productos que pertenezcan al carrito con el parámetro cid proporcionados.
.get('/:cid', async (req, res) => {
    const {cid} = req.params
    try {
        const cart = await cartsService.getProductsInCart(parseInt(cid))
        if (!cart) {
            return res.status(404).json({ error: cart });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error getting cart by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//La ruta raíz POST crea un nuevo carrito asignandole un id y un array de productos vacío
.post('/', async (req, res) => {
    try {
        const cart = await cartsService.createCart()
        res.status(201).json({ message: 'Cart created successfully', cart });
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    })

    //La ruta POST  /:cid/product/:pid  agregar el producto al array de carrito en formato objeto con las propiedades id y quantity. Chequea por id si el producto ya fue agregado y si ya esta en el array unicamente incrementa la cantidad 
    .post('/:cid/product/:pid', async (req, res) => {
        const cid = req.params.cid;
        const pid = parseInt(req.params.pid);  
        try {
            const product = { id: pid };
            const results = await cartsService.addProductToCart(parseInt(cid), product);
            res.status(201).json({ message: 'Product added to cart successfully', results });
        } catch (error) {
            console.error('Error adding product to cart:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

module.exports = router;