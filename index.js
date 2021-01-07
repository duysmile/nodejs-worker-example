const express = require('express');

const {
  Worker,
} = require('worker_threads');
const intensiveTask = require('./task');

const TEN_BILLION = 10000000000;

const app = express();

app.get('/intensive-tasks-worker', (req, res, next) => {
  const worker = new Worker('./worker.js');
  worker.once('message', (message) => {
    return res.send('Done intensive tasks in worker');
  });
  worker.postMessage('Hello, world!');
});

app.get('/intensive-tasks', (req, res, next) => {
  intensiveTask(TEN_BILLION);
  return res.send('Done intensive tasks');
});

app.get('/health-check', (req, res, next) => {
  return res.send('OK');
});

app.listen(3000, () => {
  console.log('Server started at port 3000');
});

