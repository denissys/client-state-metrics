'use strict'

const path                       = require('path'),
      settings                   = require(path.resolve('./lib/utils/settings.js')).load('default').read(),
      AvailabilityMetricsService = require(path.resolve('./lib/services/availability-metrics-service')),
      redis                      = require('redis') /* TODO: Substituir pela implementacao customizada */ ,
      redisClient                = redis.createClient();

let WorkerBuilder = {

	healthOn: function() {
		let writeMessage = async function() {
			console.log('The [keep-alive-metrics-worker] live, last update: ' + new Date());
		};
		setInterval(writeMessage, settings.keepAliveMetrics.health.checkIntervalInMs);
		return this;
	},

	scan: async function(callback) {
		WorkerBuilder.healthOn();
		var read = function() {
			let keyPattern = '*[^-consumed]';
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
						new AvailabilityMetricsService.processMetrics(key);
					});
				}
			});
		}
		let throttle = settings.keepAliveMetrics.read.clientData.throttleIntervalInMs;
		setInterval(read, throttle);
	}
};

exports.WorkerBuilder = WorkerBuilder;
