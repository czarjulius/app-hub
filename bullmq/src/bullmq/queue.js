const { Queue } = require('bullmq');
const configModule = require('./config');
const setUpWorker = require('./worker');

const myQueue = new Queue('JOBS', {
  connection: configModule.CONNECTOR,
});
myQueue.setMaxListeners(myQueue.getMaxListeners() + 100);

setUpWorker();

const addJobToQueue = (data) => {
  return myQueue.add(data.jobName, data, configModule.DEFAULT_REMOVE_CONFIG);
};

module.exports = addJobToQueue;
