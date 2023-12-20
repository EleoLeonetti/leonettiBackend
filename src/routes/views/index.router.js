const { Router }      = require('express');
const productDaoMongo = require('../../daos/Mongo/productDaoMongo');

const router          = Router();
const productsService = new productDaoMongo();

router.get('/', async (req, res) => {
    const products = await productsService.getProducts();
    res.render('home', {
      title: 'Programación Backend',
      products
    })
  });

module.exports = router;