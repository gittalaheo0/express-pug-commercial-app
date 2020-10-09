const express = require('express');
const cartRoute = express.Router();
const cartController = require('../controller/cart-controller.js')

// get
cartRoute.get('/', cartController.goToCart);
cartRoute.get('/add/:id', cartController.addToCart);
cartRoute.get('/remove/:id', cartController.removeToCart);


module.exports = cartRoute;
