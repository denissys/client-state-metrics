'use strict'

const KeepAliveMetricsWorker = require('./lib/workers/keep-alive-metrics-worker.js').WorkerBuilder;

KeepAliveMetricsWorker.scan(function() {
    console.log('StateMetricWorker aborted, restart your process');
});