const { title } = require('process');

const fs = require('fs').promises;

class ProductManager {
  products = [];

  constructor(path) {
    this.path = path ||'products.json'
  };

  async addProduct(title, description, price, thumbnail, code, stock, id) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: Invalid data");
    } else {
      const checkCode = this.products.find((item) => item.code === code);
      if (checkCode) {
        console.log("Error: Repeated code");
      } else {
        id = this.products.length + 1;
        this.products.push({ title, description, price, thumbnail, code, stock, id });
        const productsJson = JSON.stringify(this.products, null, 2);
        await fs.writeFile(this.path, productsJson);
      };
    };
  };

  async getProducts() {
      const productsFile = await fs.readFile(this.path, 'utf-8');
      if(!productsFile){
        console.log([]);
      }else{
      console.log(JSON.parse(productsFile));
    };
  };

  async getProductById(id) {
      const productsFile = await fs.readFile(this.path, 'utf-8');
      const productById = JSON.parse(productsFile).find((item) => item.id == id);     
      if (!productById) {
        console.log("Not found");
      } else {
        console.log(productById);
      };
  };

  async updateProduct(id, updatedFields) {
      const productsFile = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(productsFile);
      const productIndex = JSON.parse(productsFile).findIndex((item) => item.id == id);
      if (productIndex === -1) {
        console.log("Not found");
      } else {
        updatedFields.id = id;
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        console.log('Product data updated');
      };
  }

  
  async deleteProduct(id) {
      const productsFile = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(productsFile);
      const productIndex = JSON.parse(productsFile).findIndex((item) => item.id == id);
      if (productIndex === -1) {
        console.log("Not found");
      } else {
        products.splice(productIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        console.log("Product deleted");
      };
};
};



// Testing
const product = new ProductManager();
product.getProducts();
product.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25);
product.getProducts();
product.getProductById();
product.getProductById(1);
product.updateProduct(0, { title: "Nuevo título", price: 150 });
product.updateProduct(1, { title: "Nuevo título", price: 150 });
product.deleteProduct(0);
product.deleteProduct(1);
