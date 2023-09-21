const { Worker } = require('bullmq');
const path = require('path');

const configModule = require('./config');
let worker;

const processorPath = path.join(__dirname, 'processor.js');

const setUpWorker = () => {
  worker = new Worker('JOBS', processorPath, {
    connection: configModule.CONNECTOR,
    autorun: true,
  });

  worker.on('active', (job) => {
    console.debug(`Processing job with id ${job.id}`);
  });

  worker.on('completed', (job, returnValue) => {
    console.debug(`Completed job with id ${job.id}`, returnValue);
  });

  worker.on('error', (failedReason) => {
    console.error(`Job encountered an error`, failedReason);
  });
};

module.exports = setUpWorker;
