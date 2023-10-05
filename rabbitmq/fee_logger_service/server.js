const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Producer = require('./producer');
const producer = new Producer();

app.use(bodyParser.json('application/json'));

app.post('/fee-log', async (req, res, next) => {
  const { feeType, message } = req.body;
  await producer.publishMessage(feeType, message);
  res.send('Ok');
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
