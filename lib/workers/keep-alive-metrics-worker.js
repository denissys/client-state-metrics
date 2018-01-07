'use strict'

const path = require('path'),
      settings = require(path.resolve('./lib/utils/settings.js')).load('default').read(),
      ClientKeyPatternBuilder = require(path.resolve('./lib/builders/client-key-pattern-builder.js')).Builder,
      ClientAvailableService = require(path.resolve('./lib/services/client-available-service.js')).Service,
      redis = require('redis'),
      redisClient = redis.createClient();

let WorkerBuilder = {

	healthOn: function() {
		let writeMessage = async function() {
			console.log('The [keep-alive-metrics-worker] live, last update: ' + new Date());
		};
		setInterval(writeMessage, settings.workers.keepAliveMetrics.health.checkIntervalInMs);
		return this;
	},

	scan: async function(callback) {
		let keyPattern = ClientKeyPatternBuilder.build();
		let count = settings.workers.keepAliveMetrics.read.pagination.count;
		let cursor = '0';
		redisClient.scan(cursor, 'MATCH', keyPattern, 'COUNT', count, function(err, keys) {
			if(err){
				console.log('Unexpected error on redis scan event');
			    throw err;
			}
			WorkerBuilder.map(keys[1]);
			return WorkerBuilder.scan(callback);
		});
	},

	map: async function(keys) {
		keys.forEach(function(key,i) {
			console.log(key);
			WorkerBuilder.tranform(key);
		});
	},

	tranform: async function(key) {
		redisClient.rename(key, key+'-consumed', function(){});
		ClientAvailableService.consolidateMetrics(key);
	}
}

exports.WorkerBuilder = WorkerBuilder;
