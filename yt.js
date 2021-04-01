const express = require("express");
const cors = require("cors")
const puppeteer = require("puppeteer")


async function getVidio(URL) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://keepv.id/');
    await page.type('#dlURL', `${URL}`);
    await page.waitForSelector('#dlBTN1');
    await page.click('#dlBTN1', { delay:300});
    await page.waitForSelector('#results > div.row > div.col-12.col-md-6.col-lg-4 > img');
    let img = await page.$eval('#results > div.row > div.col-12.col-md-6.col-lg-4 > img', (element) => {
        return element.getAttribute("src")
    });
     let judul = await page.$eval('#results > div.row > div.col-12.col-md-6.col-lg-4 > img', (element) => {
        return element.getAttribute("title")
    });
    let url = await page.$eval('#results > div.row > div.col-12.col-md-6.col-lg-8 > a', (element) => {
        return element.getAttribute("href");
    });
    return { img, judul, url }
}
const app = express();

app.use(cors())
app.listen(5000, () => {
    console.log("Server Sedang Berjalan Di Port 5000");
});

app.get('/yt', async (req, res) =>{
    var URL = req.query.URL;
    const gets = await getVidio(URL);
    res.json(gets);
});