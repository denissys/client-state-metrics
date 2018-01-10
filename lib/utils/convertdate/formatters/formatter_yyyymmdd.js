'use strict'

function getDate(value) {
	var formattedDate = value.slice(0, 4) +'-'+ value.slice(4, 6) +'-'+ value.slice(6, 8);
	return new Date(formattedDate + ' 00:00:00')
}

module.exports.getDate = getDate;