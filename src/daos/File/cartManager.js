const fs   = require('node:fs');
const path = './src/mockDB/carts.json'

class CartsManager {
    constructor() {
        this.path = path;
    }

//Este método lee el JSON de carrito y devuelve el contenido en objeto Javascript
   readFile = async () => {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            console.log(data)
            return JSON.parse(data)
        } catch(error){
            return []
        }
    };

//Método para crear carrito asignandole un id y un array vacío de products. Agrega el carrito creado a los carritos existentes
    async createCart(){
        const carts = await this.readFile()
        const newCart = {id: carts.length + 1, products: [] }
        carts.push(newCart)
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return results
    };

//Método para buscar y devolver un carrito por id
    async getProductsInCart (cid){
        const carts = await this.readFile()
        const cart = carts.find(cart => cart.id ===cid)
        if(!cart){
            return "Cannot found cart"
        }
        return cart.products
    };

//Método para agregar producto a un carrito especificado por id
    async addProductToCart(cid, product){
        const carts = await this.readFile();
        const cartIndex = carts.findIndex(cart => cart.id === cid);
        if (cartIndex === -1) {
        return 'Cart not found';
        }
        const existingProductIndex = carts[cartIndex].products.findIndex(p => p.id === product.id);
        if (existingProductIndex !== -1) {        // Si el producto que se intenta agregar ya está en el carrito, aumenta quantity
        carts[cartIndex].products[existingProductIndex].quantity += 1;
    } else {
        // Si el producto no se encuentra agregado, se agrega con quantity 1
        carts[cartIndex].products.push({ id: product.id, quantity: 1 });
    }
    const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
    return results;
    }; 
};

//module.exports = CartsManager;