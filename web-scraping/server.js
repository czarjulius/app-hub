const express = require('express');
const runScraper = require('./scraper');

const app = express();
const PORT = 8000;

app.listen(PORT, async function onListen() {
  // testSequelize(); // test the sequelize connection.'
  runScraper();
  console.log(`Server is up and running on port ${PORT}`);
});
