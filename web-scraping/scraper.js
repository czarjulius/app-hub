const puppeteer = require('puppeteer');

async function runScraper() {
  const browser = await puppeteer.launch({ headless: 'old' });
  const page = await browser.newPage();

  await page.goto('https://orla.africa/');

  // await page.screenshot({ path: 'orla.png', fullPage: true });
  // await page.pdf({ path: 'orla.pdf', format: 'A4' });
  // const html = await page.content();

  // const title = await page.evaluate(() => document.title);
  const gadgets = await page.$$eval(
    '._overflowCard_1cymp_30 ._productCard_1cymp_12',
    (gadgets) =>
      gadgets.map((item) => ({
        title: item.querySelector('h4').innerText,
        imageUrl: item.querySelector('img').src,
        price: item.querySelector('strong').innerText,
      }))
  );

  console.log(gadgets);

  await browser.close();
}

module.exports = runScraper;
