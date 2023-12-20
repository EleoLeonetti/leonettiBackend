
const fs              = require('node:fs').promises;
const { Router}       = require('express');
const ProductManager  = require('../../managers/productManager');

const router          = Router();
const productsService = new ProductManager();

router

//Ruta para traer todos los productos
.get('/', async (req, res)=> {
    const limit = req.query.limit;
    const products = await productsService.getProducts(parseInt(limit));
    res.send({
        status: 'success',
        payload: products
    })
})

//Ruta para traer producto por id
.get('/:pid', async (req, res)=> {
    const { pid } = req.params
    const product = await productsService.getProductById(parseInt(pid))
    if (!product) {
        return res.status(400).send({
            status: 'error',
            message: "Product not found"
        })
    }
        res.send({
        status: 'success',
        payload: product
    })
})

//Ruta para agregar un nuevo producto
.post('/', async (req, res)=> { 
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body;
        const newProduct = await productsService.addProduct(title, description, code, price, status, stock, category, thumbnail);
        res.json({
          status: 'success',
          payload: newProduct
        });
      } catch (error) {
        console.error(error);
        res.status(400).json({
        status: 'error',
        message: 'Error adding product'
        });
      }
})

//Ruta para actualizar producto por id
.put('/:pid', async (req, res)=> {
    const { pid } = req.params
    const update = req.body
    const productToUpdate = await productsService.getProductById(parseInt(pid))
    if (!productToUpdate) {
        return res.status(400).json({
            status: 'error',
            message: "Product not found"
        })
    }
    const product = await productsService.updateProduct(parseInt(pid), update)
    res.json({
        status: 'success',
        payload: product
    })
})

//Ruta para borrar producto por id
.delete('/:pid', async (req, res)=> {
    const { pid } = req.params
    const productToDelete = await productsService.getProductById(parseInt(pid))
    if (!productToDelete) {
        return res.status(400).send({
            status: 'error',
            message: "Product not found"
        })
    }
    const product = await productsService.deleteProduct(parseInt(pid))
    res.send({
        status: 'success',
        message: 'Product deleted'
    })
});

module.exports = router;