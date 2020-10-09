const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ products: [], productInfor: []})
  .write()
const bodyParser = require('body-parser')

module.exports.goEveryProduct = (req, res) => {
	// show all data
	let typeProduct = req.params.typeProduct; //type of product
	let typeProductToShow; //show as vietnamesse
	let numOfProductInPage = 30;
	let page = req.query.page ? req.query.page : 1;
	let productData = db.get('products').value().filter((e)=>{return e[typeProduct] == true}).splice((page-1)*numOfProductInPage, page*numOfProductInPage);
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
	res.json({
		productData,
	});
}
