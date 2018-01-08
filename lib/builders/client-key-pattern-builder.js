'use strict'

const dateformat = require('dateformat');

let Builder = {

	datePattern: 'yyyymmdd-HH',

	build: function() {
		let now = new Date();
		now.setHours(now.getHours() - 1);
		let variant = dateformat(now, this.datePattern);
		return '*-'+variant;
	}
}

exports.Builder = Builder;