const { Router } = require('express');
const ProductManager = require('../../managers/productManager');

const router = Router();
const productsService = new ProductManager();

router.get('/', async (req, res) => {
    const products = await productsService.getProducts();
    res.render('home', {
      title: 'Programación Backend',
      products
    })
  });

module.exports = router;