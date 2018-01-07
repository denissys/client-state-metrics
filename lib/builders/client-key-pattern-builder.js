'use strict'

const dateformat = require('dateformat');

let Builder = {

	datePattern: 'yyyymmdd-HH',
	date: new Date(),

	customDate: function(date) {
		this.date = date;
		return this;
	},

	build: function() {
		let variant = dateformat(this.date, this.datePattern);
		return '*-'+variant;
	}
}

exports.Builder = Builder;