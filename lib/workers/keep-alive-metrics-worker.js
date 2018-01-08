'use strict'

const path = require('path'),
      settings = require(path.resolve('./lib/utils/settings.js')).load('default').read(),
      ClientKeyPattern = require(path.resolve('./lib/builders/client-key-pattern-builder.js')),
      ClientAvailableService = require(path.resolve('./lib/services/client-available-service.js')),
      redis = require('redis'),
      redisClient = redis.createClient();

let WorkerBuilder = {

	healthOn: function() {
		let writeMessage = async function() {
			console.log('The [keep-alive-metrics-worker] live, last update: ' + new Date());
		};
		setInterval(writeMessage, settings.keepAliveMetrics.health.checkIntervalInMs);
		return this;
	},

	scan: function(callback) {

		var read = function() {
			let keyPattern = ClientKeyPattern.Builder.build();
			let count = settings.keepAliveMetrics.read.pagination.count;
			let cursor = '0';

			redisClient.scan(cursor, 'MATCH', keyPattern, 'COUNT', count, function(err, data) {
				if(err){
					console.log('Unexpected error on redis scan event');
				    throw err;
				}
				let keys = data[1];
				if (keys.length > 0) {
					keys.forEach(function(key,i) {
						console.log(key);
						redisClient.rename(key, key+'-consumed', function(){});
						new ClientAvailableService.processMetrics(key);
					});
				}
			});
		}
		let throttleInMS = settings.keepAliveMetrics.read.clientData.throttleIntervalInMs;
		setInterval(read, throttleInMS);
	},

	map: function(keys) {
		keys.forEach(function(key,i) {
			console.log(key);
			WorkerBuilder.tranform(key);
		});
	},

	tranform: function(key) {
		redisClient.rename(key, key+'-consumed', function(){});
		new ClientAvailable.Service.processMetrics(key);
	}
};

exports.WorkerBuilder = WorkerBuilder;
