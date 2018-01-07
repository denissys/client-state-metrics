'use strict'

const redis = require('redis'),
      redisClient = redis.createClient();

let WorkerBuilder = {

	health: function(checkIntervalInMs) {
		let writeMessage = function() {
			console.log('WorkerBuilder live, last update: ' + new Date());
		};
		setInterval(writeMessage, checkIntervalInMs);
		return WorkerBuilder;
	},

	scan: function(pattern, callback) {
		let cursor = '0';
		redisClient.scan(cursor, 'MATCH', pattern, 'COUNT', '5', function(err, keys) {
			if(err){
				console.log('Unexpected error on redis scan event');
			    throw err;
			}
			WorkerBuilder.map(keys[1]);
			return WorkerBuilder.scan(pattern, callback);
		});
	},

	map: function(keys) {
		keys.forEach(function(key,i) {
			console.log(key);
			WorkerBuilder.tranform(key);
		});
	},

	tranform: function(key) {
		redisClient.rename(key, key+'-consumed', function(){});
	}
}

exports.WorkerBuilder = WorkerBuilder;
