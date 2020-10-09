const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ products: [], productInfor: []})
  .write()
const bodyParser = require('body-parser')


// get
module.exports.goAllProductHomePage = (req, res) => {
	let data = db.get('products').value();
	// let quantityForHtml = 20;
	// let page = req.query.page ? req.query.page : 1;
	let productFeature = data.sort((a,b)=>{return -a.quantitySelled+b.quantitySelled}).splice(0,4);
	let productSale = data.sort((a,b)=>{return -a.salePricePercent+b.salePricePercent}).splice(0,20);

	res.render('index', {
		productData : productSale,
		productFeature,
	});
}

module.exports.findAllProductHomePage = (req, res) => {
	let name = req.query.q.toLowerCase();
	let productData = db.get('products').value().filter((e)=>e.name.toLowerCase().match(name));
	res.render('catelogry/find', {
		productData 
	});
}

module.exports.goEveryProduct = (req, res) => {
	// show all data
	let typeProduct = req.params.typeProduct; //type of product
	let typeProductToShow; //show as vietnamesse
	let numOfProductInPage = 30;
	let productData = db.get('products').value().filter((e)=>{return e[typeProduct] == true}).splice(0, numOfProductInPage);
	switch(typeProduct) {
		case 'nikeProduct':
			typeProductToShow = "Giày Nike"
			break;
		case 'manProduct':
			typeProductToShow = "Giày Nam"
			break;
		case 'womanProduct':
			typeProductToShow = "Giày Nữ"
			break;
		case 'fashionProduct':
			typeProductToShow = "Giày Thời Trang"
			break;
		case 'coupleProduct':
			typeProductToShow = "Giày Đôi"
			break;
	}
	res.render('catelogry/index', {
		productData,
		typeProductToShow,
		typeProduct,
	});
}

module.exports.findProduct = (req, res) => {
	// show all data
	let typeProduct = req.params.typeProduct; //type of product
	let name = req.query.name.toLowerCase();
	let productData = db.get('products').value().filter((e)=>{return e.name.toLowerCase().match(name) && e[typeProduct] == true});
	switch(typeProduct) {
		case 'nikeProduct':
			typeProductToShow = "Giày Nike"
			break;
		case 'manProduct':
			typeProductToShow = "Giày Nam"
			break;
		case 'womanProduct':
			typeProductToShow = "Giày Nữ"
			break;
		case 'fashionProduct':
			typeProductToShow = "Giày Thời Trang"
			break;
		case 'coupleProduct':
			typeProductToShow = "Giày Đôi"
			break;
	}
	// let a = db.get('products').value().map((e)=>{
	// 	return {...e, quantityStock: Math.round(Math.random*100) , quantitySelled: Math.round(Math.random*100)}
	// })
	// db.set('products', []).write()
	// db.get('products').push(a).write()
  
	res.render('catelogry/index', {
		productData,
		typeProductToShow,
		typeProduct,
	});
}

// soft
module.exports.sortProduct = (req, res) => {
	// show all data
	let typeProduct = req.params.typeProduct; //type of product
	let productData = db.get('products').value().filter((e)=>{return e[typeProduct] == true});
	switch(req.params.sort) {
		case 'priceLtoH':
			productData = productData.sort((a,b)=>a.price-b.price).splice(0, 20);
			break;
		case 'priceHtoL':
			productData = productData.sort((b,a)=>a.price-b.price).splice(0, 20);
			break;
		case 'mostViewed':
			productData = productData.sort((b,a)=>a.quantitySelled-b.quantitySelled).splice(0, 20);
			break;
	}
	switch(typeProduct) {
		case 'nikeProduct':
			typeProductToShow = "Giày Nike"
			break;
		case 'manProduct':
			typeProductToShow = "Giày Nam"
			break;
		case 'womanProduct':
			typeProductToShow = "Giày Nữ"
			break;
		case 'fashionProduct':
			typeProductToShow = "Giày Thời Trang"
			break;
		case 'coupleProduct':
			typeProductToShow = "Giày Đôi"
			break;
	}
	res.render('catelogry/index', {
		productData,
		typeProductToShow,
		typeProduct,
	});
}

// view item
module.exports.goAnyItem = (req, res) => {
	let id = req.params.id;
	let item = db.get('products').find({id : id}).value();
	res.render('catelogry/product/index', {
		item,
	});
}

// view item
module.exports.addToCart = (req, res) => {
	let cookie = req.cookies.idProducts ? req.cookies.idProducts : "";
	cookie+=`..${req.params.id}`
	res.cookie('idProducts', cookie)
	res.redirect(`/catelogry/product/${req.params.id}`)
	
}

// view cart
module.exports.goToCart = (req, res) => {
	res.render('cart/index', {});	
}