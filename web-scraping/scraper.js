const puppeteer = require('puppeteer');
const fs = require('fs');

const fileName = 'orla_data.json';

if (fs.existsSync(fileName)) {
  fs.unlinkSync(fileName);
}

async function runScraper() {
  const browser = await puppeteer.launch({ headless: 'old' });
  try {
    const page = await browser.newPage();

    await page.goto('https://orla.africa/');
    console.log('Web scraping started...🎬');

    await new Promise((r) => setTimeout(r, 20000));

    // await page.screenshot({ path: 'orla.png', fullPage: true });
    // await page.pdf({ path: 'orla.pdf', format: 'A4' });
    // const html = await page.content();

    const title = await page.evaluate(() => document.title);
    const gadgets = await page.$$eval(
      '._overflowCard_1cymp_30 ._productCard_1cymp_12',
      (gadgets) =>
        gadgets.map((item) => ({
          title: item.querySelector('h4').innerText,
          imageUrl: item.querySelector('img').src,
          price: item.querySelector('strong').innerText,
        }))
    );

    const orla_data_json = { title: title, products: gadgets };

    fs.writeFileSync(fileName, JSON.stringify(orla_data_json));

    console.log('Web scraping completed successfully ✅✅✅');
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
}
module.exports = runScraper;
