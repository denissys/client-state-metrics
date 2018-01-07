'use strict'

const keepAliveMetricsWorker = require('./lib/workers/keep-alive-metrics-worker.js').WorkerBuilder;

keepAliveMetricsWorker.healthOn().scan(function() {
    console.log('StateMetricWorker aborted, restart your process');
});