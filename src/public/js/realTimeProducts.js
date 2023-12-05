const socket = io();

let productsList = document.querySelector('#productsList');

const addProduct = (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnails = [document.getElementById("thumbnail").value];
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const status = document.getElementById("status").value;
    const category = document.getElementById("category").value;
    const product = {
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category,
    };
    if (!title || !description || !code || !price || !stock || !category) {
        console.log("Error: Invalid data");
    } else {
        socket.emit('newProduct', product);

        document.getElementById("title").value = '';
        document.getElementById("description").value = '';
        document.getElementById("price").value = '';
        document.getElementById("thumbnail").value = '';
        document.getElementById("code").value = '';
        document.getElementById("stock").value = '';
        document.getElementById("status").value = '';
        document.getElementById("category").value = '';
    }
};

socket.on('productList', data => {
    const productsListElement = document.querySelector('#productsList');
    let products = '';

        data.forEach(product => {
            products += `
            <div data-code="${product.code}">
                <p>${product.title}</p>
                <p>${product.description}</p>
                <p>Code: ${product.code}</p>
                <p>Price: $${product.price}.-</p>
                <p>Status: ${product.status}</p>
                <p>Stock: ${product.stock}</p>
                <p>Category: ${product.category}</p>
                <p>Thumbnail: ${product.thumbnails}</p>
                <button onclick="deleteProduct('${product.code}')">Eliminar</button>
            </div>
            `;
        });
        productsListElement.innerHTML = products;
});

function deleteProduct(code) {
    socket.emit('deleteProduct', code);
};