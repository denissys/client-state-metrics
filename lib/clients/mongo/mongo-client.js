'use strict'

const path = require('path'),
      settings = require(path.resolve('./lib/utils/settings.js')).load('default').read(),
      mongoose = require('mongoose');

function connect() {

	mongoose.connect('mongodb://'+ settings.db.mongo.address +'/'+ settings.db.mongo.databaseName);
	mongoose.Promise = global.Promise;
	
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Mongo connection error:'));

	console.log('Mongo client is connected');
	return db;
}

module.exports.connect = connect;