const express = require("express");
const cors = require("cors")
const puppeteer = require("puppeteer")


async function getVidio(URL) {
	const author = ["amfcode"];
	const status = ["200"];
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.getfvid.com/');
    await page.type('#form_download > div > input', `${URL}`);
    await page.waitForSelector('#btn_submit');
    await page.click('#btn_submit', { delay:300});
    await page.waitForSelector('#title_video');
    let judul = await page.$eval('#title_video', (element) => {
        return element.getAttribute("value")
    });
    let url = await page.$eval('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a', (element) => {
        return element.getAttribute("href");
    });
    return { status, author, judul, url }
}
const app = express();

app.use(cors())
app.listen(5000, () => {
    console.log("Server Sedang Berjalan Di Port 5000");
});

app.get('/fb', async (req, res) =>{
    var URL = req.query.URL;
    const gets = await getVidio(URL);
    res.json(gets);
});