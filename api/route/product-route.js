const express = require('express');
const productRoute = express.Router();
const productController = require('../controller/product-controller.js')

// get
productRoute.get('/:typeProduct', productController.goEveryProduct);

// post


module.exports = productRoute;
