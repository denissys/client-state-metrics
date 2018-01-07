'use strict'

const path = require('path'),
      ClientStateBuilder = require(path.resolve('./lib/builders/client-state-builder.js')).Builder;

let Service = {

	consolidateMetrics: async function(clientStateKey) {
		let ClientState = ClientStateBuilder.key(clientStateKey).build();
		
		// verify schedules events
		// consolidate HITs + Schedule Events
		// persist consolidate metric
	}

}

exports.Service = Service;