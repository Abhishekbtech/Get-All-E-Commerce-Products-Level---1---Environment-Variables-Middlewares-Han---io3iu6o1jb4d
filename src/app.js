const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));

// Middlewares
app.use(express.json());

// GET endpoint for sending all the products to client
// Endpoint - /products
app.get('/api/v1/products', (req, res) => {
    if (products && products.length) {
        res.statusCode = 200;
        const payload = {
            status: "success",
            message: "Product fetched successfully",
            data: {
                products,
            },
        };
        res.json(payload);
    } else {
        res.statusCode = 404;
        const payload = { message: "Product not found" };
        res.json(payload);
    }
});

module.exports = app;
