'use strict'

const path = require('path'),
      clientStateBuilder = require(path.resolve('./lib/builders/client-state-builder.js')).Builder;

let Service = {

	consolidateMetrics: async function(clientStateKey) {
		let clientState = clientStateBuilder.key(clientStateKey).build();
		
		// verify schedules events
		// consolidate HITs + Schedule Events
		// persist consolidate metric
	}

}

exports.Service = Service;