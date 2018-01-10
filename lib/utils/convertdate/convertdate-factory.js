'use strict'

function convert(value, pattern) {
	var date = null;
	try {
		var converter = require('./formatters/formatter_'+ pattern +'.js');	
		date = converter.getDate(value);
	} catch(err) {
		console.log('Pattern ['+ pattern +'] not found, err: ' + err);
	}
	return date;
}

module.exports.convert = convert;