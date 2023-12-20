const { Router }      = require('express')
const productDaoMongo = require('../daos/Mongo/productDaoMongo.js')

const router         = Router()
const productService = new productDaoMongo()

router

//Ruta para traer todos los productos
    .get('/', async (req, res) => {
        try{
            const products = await productService.getProducts()
            res.send({
                status: 'succes',
                payload: products
            })
        }catch(error) {
            console.log(error)
        }
    })

//Ruta para traer producto por id
    .get('/:pid', async (req, res) => { 
        const { pid } = req.params
        try{
            const product = await productService.getProductById(pid)
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
     })

//Ruta para agregar un nuevo producto
    .post('/', async (req, res) => {
        const newProduct = req.body
        try{
            if(!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category || !newProduct.thumbnails){
                return res.status(400).send({
                    status: 'error', 
                    error: 'Missing data. Complete mandatory fields'})
            }
            if(productService.code === newProduct.code){
                console.log('Repeated code')
            }
            const productAdded = await productService.addProduct(newProduct)
            res.status({
                status:'Product added',
                payload: productAdded
            })
        }catch(error){
            console.log(error)
        }
    })

//Ruta para actualizar producto por id
    .put('/:pid', async (req, res) => {
        try {
            const { pid } = req.params;
            const productToUpdate = req.body;
            const updatedProduct = await productService.updateProduct(pid, productToUpdate);
            res.send(updatedProduct);
        } catch (err) {
            res.status(400).send({
                status: 'error',
                message: 'Error'
            });
        }
    })

//Ruta para borrar producto por id
    .delete('/:pid', async (req, res) => {
        const { pid } = req.params;
        try {
            const productToDelete = await productService.deleteProduct(pid);
            res.status(200).json({
                status: 'success',
                payload: productToDelete
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                status: 'error',
                message: 'Error'
            });
        }
    });


module.exports = router