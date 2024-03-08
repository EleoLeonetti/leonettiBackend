const { Router } = require('express')
const { faker }  = require('@faker-js/faker')

const router = Router()

const generateProduct = () => {
    return{
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(6),
        price: faker.commerce.price(),
        stock: faker.number.int(100),
        category: faker.commerce.productAdjective(),
        thumbnails: faker.image.url(),
        id: faker.database.mongodbObjectId()
    }
}

router.get('/mockingproducts', (req, res) => {
    let products = []

    for(let i= 0; i < 100; i++){
        products.push(generateProduct())
    }
    res.send({
        status: 'success',
        payload: products
    })
})

router.get('/loggerTest', (req, res) => {
    req.logger.fatal('alert: fatal')
    req.logger.error('alert: error')
    req.logger.warning('alert: warning')
    req.logger.info('info')
    req.logger.info('debug')
    res.send('logger')
})

module.exports = router