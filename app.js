'use strict'

const clientStateMetricsWorker = require('./lib/workers/client-state-metrics-worker.js');

clientStateMetricsWorker.WorkerBuilder.health(30000).scan('*-20180107-14', function(){
    console.log('StateMetricWorker aborted, restart your process');
});