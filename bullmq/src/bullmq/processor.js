const fs = require('fs');
const { parse } = require('csv-parse');
const { promisify } = require('util');

const sleep = promisify(setTimeout);

const fileName = 'employment_indicators.json';

if (fs.existsSync(fileName)) {
  fs.unlinkSync(fileName);
}

const jobProcessor = async (job) => {
  await job.log(`Started processing job with id ${job.id}`);
  // TODO: do your CPU intense logic here
  await extractCSVData(job?.data);

  await job.updateProgress(100);
  return 'DONE';
};

module.exports = jobProcessor;

const extractCSVData = async (jobData) => {
  try {
    let result = [];

    await sleep(10000);

    fs.createReadStream(jobData.csvFilePath)
      .pipe(
        parse({
          columns: true,
        })
      )
      .on('data', async (data) => {
        result.push(data);
      })
      .on('error', async (error) => {
        console.log(error, '????');
      })
      .on('end', () => {
        result = result.reduce((acc, item) => {
          const key = item.Week_end;

          acc[key] = acc[key] || [];
          acc[key].push(item);
          return acc;
        }, {});
        const writeData = { [jobData.userName]: result };
        fs.writeFileSync(fileName, JSON.stringify(writeData));
      });
  } catch (error) {
    console.log(error);
  }
};
