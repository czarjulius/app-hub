const { parse } = require('csv-parse');
const fs = require('fs');
const { Queue, Worker, QueueScheduler } = require('bullmq');

const myQueue = new Queue('foo', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

const extractCSVData = async () => {
  try {
    const result = [];

    const parseData = fs
      .createReadStream('./Employment-indicators-weekly-paid-jobs-20-days-as-at-26-September-2022-CSV.csv')
      .pipe(
        parse({
          columns: true,
        })
      );
    parseData.on('data', async (data) => {
      result.push(data);
    });

    parseData.on('end', () => {
      result.reduce((acc, item) => {
        const key = item.Week_end;

        acc[key] = acc[key] || [];
        acc[key].push(item);
        return acc;
      }, {});
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
const addJobs = async () => {
  await myQueue.add('myJobName', extractCSVData);
  // await myQueue.add('myJobName', { qux: 'baz' });
};

addJobs();

const worker = new Worker('foo', async (job) => {
  // Will print { foo: 'bar'} for the first job
  // and { qux: 'baz' } for the second.
  // console.log(job.data);
});

worker.on('completed', (job) => {
  console.log(job);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

// const myWorker = new Worker('CSV', extractCSVData, {
//   connection: {
//     host: 'localhost',
//     port: 6379,
//   },
// });

// const scraperQueueScheduler = new QueueScheduler('CSV', {
//   connection: {
//     host: 'localhost',
//     port: 6379,
//   },
// });
