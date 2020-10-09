const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ products: [], productInfor: []})
  .write()
const bodyParser = require('body-parser')


// view item
module.exports.addToCart = (req, res) => {
	let cookie = req.cookies.idProducts;
	cookie+=`..${req.params.id}`
	res.cookie('idProducts', cookie)
	res.redirect(`/cart`)
}

// view cart
module.exports.goToCart = (req, res) => {
	let listIdAdded = req.cookies.idProducts.split('..').splice(1);
	let listProductAdded = [];
	listIdAdded.forEach(function(idItem, idIndex) {
		if(!listProductAdded.find(e=>idItem==e.id)){
			listProductAdded.push({id: idItem, quantity: 1})
		}else{
			listProductAdded.find(e=>idItem==e.id).quantity++;
		};
	});
	listProductAdded = listProductAdded.map(e=>{
		let product = db.get("products").find({id: e.id}).value();
		return {
			id: product.id,
			name: product.name,
			price: product.price,
			salePricePercent: product.salePricePercent,
			quantity: e.quantity,
		}
	});
	let totalPrice = {price: 0, quantity: 0};
	listProductAdded.forEach(function(e, i) {
		totalPrice.price += Math.round(e.price*(1-e.salePricePercent*0.01))*e.quantity;
		totalPrice.quantity += e.quantity;
	})
	res.render('cart/index', {
		listProductAdded,
		totalPrice,
	});	
}

// remove cart
module.exports.removeToCart = (req, res) => {
	let listIdAdded = req.cookies.idProducts.split('..').splice(1);
	let idProduct = req.params.id;
	let newList = [];
	let cookie;
	listIdAdded.forEach(function(e, i){
		if(e!=idProduct){newList.push(e)}
	})
	if(newList.length!=0){
		cookie = newList.join("..");
		cookie = ".." + cookie;
	}else{
		cookie = '';
	}
	res.cookie('idProducts', cookie);
	res.redirect(`/cart`);

}