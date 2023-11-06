class ProductManager {
  products = [];

  constructor() {}

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      (title,
      description,
      price,
      thumbnail,
      code,
      stock == " " || title,
      description,
      price,
      thumbnail,
      code,
      stock == undefined)
    ) {
      console.log("Error");
    } else {
      const checkCode = this.products.find((item) => item.code == code);
      if (checkCode) {
        console.log("Error");
      } else {
        let id = 1;
        for (let i = 0; i < this.products.length; i++) {
          if (!id) id = 1;
          else id++;
        }
        this.products.push({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id,
        });
      }
    }
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const productId = this.products.find((item) => item.id == id);
    if (!productId) {
      console.log("Not found");
    } else {
      console.log(product);
    }
  }
}


const product = new ProductManager();
product.getProducts();
product.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
product.getProducts();
product.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
product.getProductById();
product.getProductById(1);
