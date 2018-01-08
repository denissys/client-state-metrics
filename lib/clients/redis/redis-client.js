'use strict'

const redis = require('redis'),
	  redisClient = redis.createClient();

redisClient.on("error", function (err) {
    console.log("Error on redis client --> " + err);
});

redisClient.on("connect", function() {
	console.log('Redis client is connected')
});

let Client = {

	get: function() {
		return redisClient;
	}
}

exports.Client = Client;