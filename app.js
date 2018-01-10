'use strict'

const mongoClient = require('./lib/clients/mongo/mongo-client.js').connect(),
      KeepAliveMetricsWorker = require('./lib/workers/keep-alive-metrics-worker.js').WorkerBuilder;

// Registered models
var ClientAvailability = require('./models/metrics/client-availability.js');

// Workers (start process)
KeepAliveMetricsWorker.scan(function() {
    console.log('StateMetricWorker aborted, restart your process');
});