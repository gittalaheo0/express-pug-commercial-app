const express = require('express');
const productRoute = express.Router();
const productController = require('../controller/product-controller.js')

// get
productRoute.get('/', productController.goAllProductHomePage);
productRoute.get('/cart', productController.goToCart);
productRoute.get('/search', productController.findAllProductHomePage);
productRoute.get('/product/:id', productController.goAnyItem);
productRoute.get('/add/:id', productController.addToCart);
productRoute.get('/:typeProduct', productController.goEveryProduct);
productRoute.get('/:typeProduct/search', productController.findProduct);
productRoute.get('/:typeProduct/:sort', productController.sortProduct);

// post


module.exports = productRoute;
