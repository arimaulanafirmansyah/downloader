const express = require("express");
const cors = require("cors")
const puppeteer = require("puppeteer")


async function getVidio(URL) {
	const author = ["amfcode"];
	const status = ["200"];
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://igram.io/id/dl/');
    await page.type('#url', `${URL}`);
    await page.waitForSelector('#submit');
    await page.click('#submit', { delay:300});
    await page.waitForSelector('#download-btn');
    let url = await page.$eval('#download-btn', (element) => {
        return element.getAttribute("href");
    });
    return { status, author, url }
}
const app = express();

app.use(cors())
app.listen(5000, () => {
    console.log("Server Sedang Berjalan Di Port 5000");
});

app.get('/ig', async (req, res) =>{
    var URL = req.query.URL;
    const gets = await getVidio(URL);
    res.json(gets);
});