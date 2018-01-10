'use strict'

const factory  = require('./convertdate-factory.js'),
      patterns = require('./enums/convertdate-pattern.js');

var ConvertDate = {
    
    Patterns: patterns.ConvertDatePatterns,

	getDate: function(value, pattern) {
		return factory.convert(value, pattern);
	}
}

module.exports.ConvertDate = ConvertDate;