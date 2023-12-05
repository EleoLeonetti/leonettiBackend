const express = require("express");
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const productsRouter = require('./routes/apis/products.router.js');
const cartsRouter = require('./routes/apis/carts.router.js');
const viewsRouter = require('./routes/views/home.router.js');
const realTimeProductsRouter = require('./routes/views/realTimeProducts.router.js');

const app = express();
const port = 8080;
const serverHttp = app.listen(port, err =>{
  if (err)  console.log(err)
  console.log(`Escuchando en el puerto ${port}`)
})

app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/home', viewsRouter);
app.use('/realtimeproducts', realTimeProductsRouter);

const io = new Server(serverHttp);

let arrayProducts = []

io.on('connection', socket => {
  console.log('Cliente conectado');

  socket.on('newProduct', data => { 
    arrayProducts.push(data) 
    io.emit('productList', arrayProducts); 
  });

  
  socket.on('deleteProduct', code => {
    const indexToDelete = arrayProducts.findIndex(product => product.code === code);

    if (indexToDelete !== -1) {
        const deletedProduct = arrayProducts.splice(indexToDelete, 1)[0];
        console.log('Producto eliminado:', deletedProduct);

        io.emit('productList', arrayProducts);
    } else {
        console.error('Producto no encontrado para eliminar');
        socket.emit('error', { message: 'Producto no encontrado para eliminar' });
    }
});
});