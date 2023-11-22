const express = require('express');

const runScraper = require('./scraper');

const app = express();
// const PORT = 8002;

app.listen(PORT, async function onListen() {
  runScraper();
  console.log(`Server is up and running on port ${PORT}`);
});
