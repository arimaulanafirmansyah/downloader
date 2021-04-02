const express = require("express");
const cors = require("cors")
const puppeteer = require("puppeteer")


async function getVidio(URL) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://downloader4twitter.com/');
    await page.type('#twitter_url', `${URL}`);
    await page.click('body > div.header > div > div.twitter-header-content > div.twitter-body > div > form > center > div > button > svg', {delay: 300});
    await page.waitForSelector('#tweeter_search_form > div.center-content > div.button-container > div:nth-child(2) > a.btn-play');
    await page.click('#tweeter_search_form > div.center-content > div.button-container > div:nth-child(2) > a.btn-play');
     let img = await page.$eval('#tweeter_search_form > div.center-content > div.img-preview-container > img', (element) => {
        return element.getAttribute('src');
    });
    let url = await page.$eval('#twitter_video', (element) => {
        return element.getAttribute('src');
    });
    browser.close();
    return { img, url }
}
const app = express();

app.use(cors())
app.listen(5000, () => {
    console.log("Server Sedang Berjalan Di Port 5000");
});

app.get('/tw', async (req, res) =>{
    var URL = req.query.URL;
    const gets = await getVidio(URL);
    res.json(gets);
});