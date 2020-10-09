module.exports.checkRouteLv0 = (req, res, next) => {
	if(!req.cookies.idProducts){
		res.cookie('idProducts', '')
	};
	next()
}

