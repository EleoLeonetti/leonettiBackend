const { Router } = require('express')
const { faker }  = require('@faker-js/faker')
const { sendEmail } = require('../utils/sendEmail')



const router = Router()

router.get('/email', (req, res) => {
    sendEmail('archivoeleo@gmail.com', 'email de prueba', '<h1>Bienvenido</h1>')
    res.send('Email enviado')
})





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

module.exports = router