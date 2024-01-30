const { cartModel }    = require('./models/carts.models.js')
const { productModel } = require('./models/products.model.js');

class cartDaoMongo {
    constructor() {
        this.model = cartModel
    }

//Método para crear carrito
async createCart(newCartData){
    const productsWithQuantity = newCartData.map(product => ({
        product,
        quantity: 1  
    }))

    const newCart = new cartModel({ products: productsWithQuantity })

    try {
        const savedCart = await newCart.save()
        return savedCart
    } catch (error) {
        throw new Error('Failed to create cart')
    }
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
        cart.products.push({ product: pid, quantity: 1 })
    }
    await cart.save()
    return cart
}


//Método para buscar y devolver un carrito por id 
async getCart(cid) {
    try {
        const cart = await this.model.find({ _id: cid }).lean().populate('products.product')
        if (!cart || cart.length === 0) {
            console.log('Cart not found')
        }
        return cart[0].products
    } catch (error) {
        console.log(`Failed to get cart`)
    }
}

// Método para borrar un producto del carrito
async removeProductFromCart(cid, pid) {
    try {
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

    } catch (error) {
        console.log('Failed to remove product from cart')
    }
}

// Método para borrrar todos los productos del carrito
async clearCart(cid) {
    try {
        const cart = await cartModel.findById(cid)

        if (!cart) {
            throw new Error('Cart not found')
        }

        // !!!!Probé igualandolo a un array vacío. Pero me tira errores que no pude solucionar. No me sucede si lo igualo a null pero nose si es válido
        cart.products = null
        await cart.save()

        return { message: 'Cart cleared successfully' }

    } catch (error) {
        throw new Error('Failed to clear cart')
    }
}

//Metodo para actualizar carrito
async updateCartProducts(cid, productsArray) {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(cid, {
            products: productsArray
        }, { new: true })
        return updatedCart
    } catch (error) {
        console.log('Failed to update cart products')
    }
}

//Método para actualizar cantidad de ejemplares del producto
async  updateQuantity(cartId, productId, newQuantity) {
    try {
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
    } catch (error) {
        console.log('Failed to update quantity')
    }
}
}

module.exports = cartDaoMongo