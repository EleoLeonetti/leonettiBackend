const { cartModel }    = require('./models/carts.models.js')
const { productModel } = require('./models/products.model.js');

class cartDaoMongo {
    constructor() {
        this.model = cartModel
    }

//Método para crear carrito
async createCart(){
    const newCart = new this.model()
    const savedCart = await newCart.save()
    return savedCart
}

//Método para agregar producto a un carrito. Busca el carrito por ID, Verifica si el producto ya está en el carrito. Si el producto ya está en carrito aumenta quantity
async addProductToCart(cid, pid){
    const cart = await this.model.findById(cid)
    if(!cart){
        console.log('Cart not found')
    }
    const product = await productModel.findById(pid)
    if(!product){
        console.log('Product not found')
    }
    const existingProduct = cart.products.find(item => item.product.toString() === pid)
    if (existingProduct) {
        existingProduct.quantity += 1
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }
    await cart.save();
    return cart;
}


//Método para buscar y devolver un carrito por id getProductsInCart (cid)
async getCart(cid){
    const cart = await this.model.findOne({_id: cid})
    if(cart){
        return cart
    }
    console.log('Cart not found')
}
}

module.exports = cartDaoMongo