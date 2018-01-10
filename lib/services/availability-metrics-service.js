'use strict'

const path               = require('path'),
      settings           = require(path.resolve('./lib/utils/settings.js')).load('default').read(),
      redisClient        = require(path.resolve('./lib/clients/redis/redis-client.js')).Client.get(),
      mongoose           = require('mongoose'),
      ClientStateBuilder = require(path.resolve('./lib/builders/client-state-builder.js')).Builder,
      MetricTypeEnum     = require(path.resolve('./models/metrics/enums/metric-type-enum.js')).MetricTypeEnum,
      repository         = require(path.resolve('./lib/repositories/availability-metrics-repository.js')),
      convertDate        = require(path.resolve('./lib/utils/convertdate/convertdate.js')).ConvertDate;

// TODO: My list of tasks
// - consolidate hits = ok
// - verify schedules events = nok
// - consolidate HITs + Schedule Events = nok
// - persist metrics = ok

function processMetrics(clientStateKey) {
	let ClientState = ClientStateBuilder.setKey(clientStateKey).build();
	getAvailabilityMetricsPerHour(ClientState, function(model) {
		let ClientAvailability = model;
	});
}

function getAvailabilityMetricsPerHour(ClientState, callback) {

  if (ClientState.hour < new Date().getHours()) {

  	redisClient.hget(ClientState.key, 'hit', function(err, hits) {
  	  redisClient.rename(ClientState.key, ClientState.key+'-consumed', function(){});
  	  
      var model = mongoose.model('ClientAvailability');
      var ClientAvailability = model.newInstance();
  	  ClientAvailability.type                 = MetricTypeEnum.HOURLY;
  	  ClientAvailability.clientId             = ClientState.id;
  	  ClientAvailability.date                 = convertDate.getDate(ClientState.date, convertDate.Patterns.YYYYMMDD);
  	  ClientAvailability.hour                 = ClientState.hour;
	  ClientAvailability.maxHitsPerHour       = settings.keepAliveMetrics.maxHitsPerHour;
	  ClientAvailability.clientHitsPerHour    = hits;
	  ClientAvailability.percentOnlinePerHour = ((ClientAvailability.clientHitsPerHour / ClientAvailability.maxHitsPerHour) * 100).toFixed(2);
	  ClientAvailability.onlineTimeInMin      = Math.round(60 * (ClientAvailability.percentOnlinePerHour / 100));
	  ClientAvailability.offlineTimeInMin     = Math.round(60 - ClientAvailability.onlineTimeInMin);

	  console.log('% Available Online (clientId: '+ ClientState.id
	    + ', date: ' + ClientState.date + ' at ' + ClientState.hour + ':00) = ' 
	    + ClientAvailability.percentOnlinePerHour + '%');

	  repository.save(ClientAvailability);
	  callback(ClientAvailability);
  	});
  }
}

module.exports.processMetrics = processMetrics;
