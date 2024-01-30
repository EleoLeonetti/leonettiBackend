const { Router }   = require('express');
const cartDaoMongo = require('../../daos/Mongo/cartDaoMongo.js');

const router      = Router();
const cartService = new cartDaoMongo();

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const products = await cartService.getCart(cid);

        res.render('cart', {
            title: 'Programación Backend',
            products: products
        });
    } catch (error) {
        res.status(404).render('error', {
            title: 'Error',
            message: error.message
        });
    }
});

module.exports = router;