const { Router }      = require('express')
const productDaoMongo = require('../../daos/Mongo/productDaoMongo.js')
const { usersModel }  = require('../../daos/Mongo/models/users.models.js')

const router          = Router()
const productsService = new productDaoMongo()

router.get('/', async (req, res) => {
    const { limit, numPage, query, sort } = req.query
    const userId = req.session && req.session.user ? req.session.user.user : null
    const user = await usersModel.findOne({_id: userId}).lean() 
    if (user) {
        req.session.user = { user_id: user._id, first_name: user.first_name }
    }
    console.log(user)
    console.log(req.session.user)

    try {
        const {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages,
            page
        } = await productsService.getProducts(query, sort, Number(limit) || 10, Number(numPage) || 1)

        const prevLink = hasPrevPage ? `/products?numPage=${prevPage}` : null
        const nextLink = hasNextPage ? `/products?numPage=${nextPage}` : null

        res.render('products', {
            title: 'Programación Backend',
            user: req.session.user,
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
        console.log(error)
        res.status(500).send('Error fetching products')
    }
});

module.exports = router