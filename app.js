const express = require('express');
const port = 3000;
const host = 'localhost';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express();
// const db = mongoose.connection;
// mongoose.connect("mongodb+srv://vietanh1:vietanh1@cluster0.mbtdk.mongodb.net/product?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('DB Connected!'));
// db.on('error', (err) => {
//     console.log('DB connection error:', err.message);
// })
// file
// const product = require('./models/product-model')

const middleware = require('./middleware/check-before.js')
const productRoute = require('./route/product-route.js')
const cartRoute = require('./route/cart-route.js')
const apiProductRoute = require('./api/route/product-route.js')
const productController = require('./controller/product-controller.js')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('assets'))

// main
// app.use('/test', (req, res) => {
// 	product.find().then(function(product){
// 		res.json({product})
//     })
// });


app.use('/', middleware.checkRouteLv0);

// catelogry route
app.use('/catelogry', productRoute);
// cart route
app.use('/cart', cartRoute);

//api
app.use('/api', apiProductRoute);


app.listen(port, host, () => {
	console.log(`Server started at ${host} port ${port}`);
});