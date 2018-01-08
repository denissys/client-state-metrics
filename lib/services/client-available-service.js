'use strict'

const path = require('path'),
      settings = require(path.resolve('./lib/utils/settings.js')).load('default').read(),
      ClientStateBuilder = require(path.resolve('./lib/builders/client-state-builder.js')).Builder,
      redisClient = require(path.resolve('./lib/clients/redis/redis-client.js')).Client.get();

// TODO: My list of tasks
// - consolidate hits = ok!
// - verify schedules events = nok
// - consolidate HITs + Schedule Events = nok
// - persist consolidate metric = nok

function processMetrics(clientStateKey) {
	let clientState = ClientStateBuilder.setKey(clientStateKey).build();
	processOnlineMetricsPerHour(clientState, function(value) {
		
		let percentOnlinePerHour = value;

	});
}

function processOnlineMetricsPerHour(clientState, callback) {

  	redisClient.hget(clientState.key+'-consumed', 'hit', function(err, clientHitsPerHour) {

		let maxHitsPerHour = settings.keepAliveMetrics.maxHitsPerHour;
		let percentOnlinePerHour = (clientHitsPerHour / maxHitsPerHour) * 100;
		console.log('% Available Online (date: ' + clientState.date + ' at ' + clientState.hour + ') = ' + percentOnlinePerHour + '%');
		callback(percentOnlinePerHour);
  	});
}

function processScheduleMetricsPerHour(clientState, callback) {

	// TODO: Implementing call to Schedule API to calc programmed intervals
}

function consolidateHits(clientState, callback) {

	// TODO: Calc ONLINE and SCHEDULED
}

function saveMetrics(clientState, callback) {

	// TODO: Save metrics in DB
}

module.exports.processMetrics = processMetrics;
