const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

const AUTH = `${process.env.USERNAME}:${process.env.PASSWORD}`;

async function getArticlesByTag() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'old',
    });
    const page = await browser.newPage();

    await page.setViewport({
      width: 1080,
      height: 768,
    });

    await page.goto('https://plainenglish.io/tags/web-scraping');
    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    const articles = await page.$$eval('.PostPreview_desktopSmallMobileFullWidth__LlANY', (gadgets) =>
      gadgets.map((item) => ({
        title: item.querySelector('h3').innerText,
      }))
    );

    console.log(articles);
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}

module.exports = getArticlesByTag;
