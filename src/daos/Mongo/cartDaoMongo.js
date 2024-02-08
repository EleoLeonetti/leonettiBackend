const { cartModel }    = require('./models/carts.models.js')
const { productModel } = require('./models/products.model.js');

class cartDaoMongo {
    constructor() {
        this.model = cartModel
    }

async createCart(newCartData) {
    const newCart = new cartModel({products: newCartData})
    const savedCart = await newCart.save()
    return savedCart
}

async getCart(cid) {
    const cart = await this.model.find({ _id: cid }).lean().populate('products.product')
    return cart[0].products
}

async addProductToCart(cid, pid) {
        const cart = await this.model.findById(cid);
        if (!cart) {
            console.log('Cart not found');
            return null;
        }
        const product = await productModel.findById(pid);
        if (!product) {
            console.log('Product not found');
            return null;
        }
        cart.products.push({ product: pid, quantity: 1 });
        await cart.save()
        return cart
}

async removeProductFromCart(cid, pid) {
        const cart = await this.model.findById(cid);
        if (!cart) {
            return null
        }
        const productIndex = cart.products.findIndex(item => item.product.toString() === pid)
        if (productIndex === -1) {
            return null
        }
        cart.products.splice(productIndex, 1)
        await cart.save()
        return cart
}

async clearCart(cid) {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            console.log('Cart not found')
        }
        cart.products = null
        await cart.save()
}


async updateCartProducts(cid, productsArray) {
        const updatedCart = await cartModel.findByIdAndUpdate(cid, {
            products: productsArray
        }, { new: true })
        return updatedCart
}

async  updateQuantity(cartId, productId, newQuantity) {
        const cart = await cartModel.findById(cartId)
        const productIndex = cart.products.findIndex(
            productItem => productItem.product.toString() === productId
        )
        if (productIndex === -1) {
            console.log('Product not found in cart')
        }
        cart.products[productIndex].quantity = newQuantity
        await cart.save()
        return cart.products[productIndex]   
}
}

module.exports = cartDaoMongo