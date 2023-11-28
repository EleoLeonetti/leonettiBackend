const fs = require('node:fs').promises;
const path = './src/mockDB/products.json'

class ProductManager {
  products = [];

  constructor() {
    this.path = path
  };

  //Método para agregar productos. Chequea que ciertos campos no estén vacíos, que el código no se repita y asigna un id autoincrementable
  async addProduct(title, description, code, price, status = true, stock, category, thumbnail = []) {
    if (!title || !description || !code || !price || !stock || !category) {
      console.log("Error: Invalid data");
    } else {
      const checkCode = this.products.find((item) => item.code === code);
      if (checkCode) {
        console.log("Error: Repeated code");
      } else {
        let existingProducts;
        try {
          existingProducts = await fs.readFile(this.path, 'utf-8');
        } catch (readError) {
          console.error("Error reading products file:", readError);
          existingProducts = '[]';
        }
  
        const allProducts = JSON.parse(existingProducts);
        const newId = allProducts.length + 1;
  
        const newProduct = { title, description, code, price, status, stock, category, thumbnail, id: newId };
        allProducts.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2));
        this.products = allProducts;
        return newProduct;
      }
    }
  }
  
  

  //Método que lee el archivo de productos y devuelve los productos si hay algo o array vacío si no hay productos
  async getProducts(limit) {
    const productsFile = await fs.readFile(this.path, 'utf-8');
    const allProducts = JSON.parse(productsFile);
    if(!limit) {
      return allProducts;
    }else {
      return allProducts.slice(0, limit);
    };
};

  //Método que recibe un id y busca y devuelve el producto con el id especificado
  async getProductById(id) {
      const productsFile = await fs.readFile(this.path, 'utf-8');
      const productById = JSON.parse(productsFile).find(item => item.id === id);     
      if (!productById) {
        console.log("Not found");
      } else {
        return productById
      };
  };

  //Método que recibe un id y campo a actualizar para modificar los datos del producto con ese id y actualizarlo en el archivo
  async updateProduct(id, updatedFields) {
    const productsFile = await fs.readFile(this.path, 'utf-8');
    const products = JSON.parse(productsFile);
    const productIndex = JSON.parse(productsFile).findIndex((item) => item.id === id);
    if (productIndex === -1) {
      console.log("Not found");
    } else {
      updatedFields.id = id;
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      console.log('Product data updated');
    };
}
  //Método que recibe un id y elimina el producto que tenga ese id
  async deleteProduct(id) {
    const productsFile = await fs.readFile(this.path, 'utf-8');
    const products = JSON.parse(productsFile);
    const productIndex = JSON.parse(productsFile).findIndex((item) => item.id === id);
    if (productIndex === -1) {
      console.log("Not found");
    } else {
      products.splice(productIndex, 1);
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      console.log("Product deleted");
    };
};
};

module.exports = ProductManager;

