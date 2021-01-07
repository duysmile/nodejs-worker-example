const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');
const intensiveTask = require('./task');
const TEN_BILLION = 10000000000;

// When a message from the parent thread is received, send it back:
parentPort.once('message', (message) => {
  intensiveTask(TEN_BILLION);
  parentPort.postMessage(message + ' from worker');
});
