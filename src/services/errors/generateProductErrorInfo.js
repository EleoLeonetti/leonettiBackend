const generateProductErrorInfo = (newProduct) => {
    return `One or more properties were incomplete or not valid
    list of require properties:
    * title: needs to be a String, received ${newProduct.title}
    * description: needs to be a String, received ${newProduct.description}
    * code: needs to be a String, received ${newProduct.code}
    * price: needs to be a Number, received ${newProduct.price}
    * stock: needs to be a Number, received ${newProduct.stock}
    * category: needs to be a String, received ${newProduct.category}
    * thumbnails: needs to be a String, received ${newProduct.thumbnail}
    `
}

module.exports = {
    generateProductErrorInfo
}