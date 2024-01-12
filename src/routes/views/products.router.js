const { Router }      = require('express')
const productDaoMongo = require('../../daos/Mongo/productDaoMongo')

const router          = Router();
const productsService = new productDaoMongo();

router.get('/', async (req, res) => {
    const { limit, numPage, query, sort } = req.query;

    try {
        const {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages,
            page
        } = await productsService.getProducts(query, sort, Number(limit) || 10, Number(numPage) || 1);

        const prevLink = hasPrevPage ? `/products?numPage=${prevPage}` : null;
        const nextLink = hasNextPage ? `/products?numPage=${nextPage}` : null;

        res.render('products', {
            title: 'Programación Backend',
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages,
            page,
            prevLink,
            nextLink
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching products');
    }
});

module.exports = router;