const fs = require('fs').promises;
const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));



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

  async getProducts(limit) {
      const productsFile = await fs.readFile(this.path, 'utf-8');
      const allProducts = JSON.parse(productsFile);

      if(!limit) {
        return allProducts;
      }else {
        return allProducts.slice(0, limit);
      };
  };

  async getProductById(id) {
      const productsFile = await fs.readFile(this.path, 'utf-8');
      const productsById = JSON.parse(productsFile).find((item) => item.id == id);     
      return productsById;
  };
};


const product = new ProductManager();

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const products = await product.getProducts(limit);
  res.json({ products });
});

app.get("/products/:pid", async (req, res) => {
  const productId = req.params.pid;
  const productById = await product.getProductById(productId);

  if(!productById) {
    res.status(404).json({ error: "Product not found" });
  }else {
    res.json({ productById });
  };
})

app.listen(port, () => {
});


product.addProduct("Producto 01", "Este es el producto de prueba N° 01", 200, "Sin imagen", "abc1", 25);
product.addProduct("Producto 02", "Este es el producto de prueba N° 02", 200, "Sin imagen", "abc2", 25);
product.addProduct("Producto 03", "Este es el producto de prueba N° 03", 200, "Sin imagen", "abc3", 25);
product.addProduct("Producto 04", "Este es el producto de prueba N° 04", 200, "Sin imagen", "abc4", 25);
product.addProduct("Producto 05", "Este es el producto de prueba N° 05", 200, "Sin imagen", "abc5", 25);
product.addProduct("Producto 06", "Este es el producto de prueba N° 06", 200, "Sin imagen", "abc6", 25);
product.addProduct("Producto 07", "Este es el producto de prueba N° 07", 200, "Sin imagen", "abc7", 25);
product.addProduct("Producto 08", "Este es el producto de prueba N° 08", 200, "Sin imagen", "abc8", 25);
product.addProduct("Producto 09", "Este es el producto de prueba N° 09", 200, "Sin imagen", "abc9", 25);
product.addProduct("Producto 10", "Este es el producto de prueba N° 10", 200, "Sin imagen", "abc10", 25);

