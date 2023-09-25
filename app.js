import express from "express";
import cheerio from "cheerio";
import fetch from "node-fetch";
// import request from "request";
// import bodyParser from "body-parser";
// import axios from 'axios';
// import { scheduleJob } from "node-schedule";
import puppeteer from "puppeteer";
import mongoose from "mongoose";
import useProxy from "puppeteer-page-proxy";

const app = express();
const port = 3000;
let randomNumber = Math.floor(Math.random() * 100);
const ipAdresses = [];
const portNumbers = [];

// app.use(bodyParser.urlencoded({ extended: true }));

// randomInterval function
function randomSecond() {
  // min and max included
  return Math.floor(Math.random() * (60000 - 5000 + 1) + 5000);
}
randomSecond();

// getProxies() function
const getProxies = async () => {
  // get html text from reddit
  const response = await fetch("https://sslproxies.org/");
  // using await to ensure that the promise resolves
  const body = await response.text();

  // parse the html text and extract titles
  const $ = cheerio.load(body);

  // using CSS selector
  $("td:nth-child(1)").each((i, title) => {
    const titleNode = $(title);
    const titleText = titleNode.text();

    ipAdresses.push(titleText);
  });

  $("td:nth-child(2)").each((i, title) => {
    const titleNode = $(title);
    const titleText = titleNode.text();

    portNumbers.push(titleText);
  });

  return `http://${ipAdresses[randomNumber]}:${portNumbers[randomNumber]}`;
};
const proxyServer = await getProxies();

//Database
mongoose.connect("mongodb://localhost:27017/webScraping");

// Database schema
const webScrapingDBSchema = new mongoose.Schema({
  title: String,
  price: Number,
  pricePer100g: Number,
  pricePerGram: Number,
  date: Date,
  url: String,
});

//Database collections
const refrigeratedFoodSection = mongoose.model(
  "refrigeratedFoodSection",
  webScrapingDBSchema
);
const meatDepartment = mongoose.model("meatDepartment", webScrapingDBSchema);
const produceDepartment = mongoose.model("produceDepartment", webScrapingDBSchema);

// Date
const date = new Date().toLocaleString().split(",")[0];

// scrapeTimer function
function scrapeTimer() {
  const scrapeClock = new Date();
  const hour = scrapeClock.getHours();
  const min = scrapeClock.getMinutes();
  const second = scrapeClock.getSeconds();
  const scrapeTimer = hour + ":" + min + ":" + second;

  return scrapeTimer;
}

// Console.log proxy being used
let proxy = `http://${ipAdresses[randomNumber]}:${portNumbers[randomNumber]}`;
console.log(proxy);

// scrapeCheese()
carrots()
  // .then(scrapeCheeseBlock)
  // .then(mediumCheeseSlices)
  // .then(scrapeYogurt)
  // .then(scrapeEggs)
  // .then(scrapeMargarine)
  // // .then(function firstBreak() {
  // //   console.log("Finishing Refrigerated Food scraping");
  // //   console.log("Starting Meat Department scraping")
  // // })
  // .then(chickenDrumstrick)
  // .then(beefStirFry)
  // .then(outsideRoundSteak)
  // .then(leanGroundBeef)
  // .then(porkCenterChop)
  // .then(blackForestHam)
  // .then(function firstBreak() {
  //   console.log("Finishing Meat Department scraping");
  //   console.log("Starting Produce Department scraping")
  // })
  // .then(cantaloupe)
  // .then(sweetPotato);
  // .then(carrots)

/* Regrigerated Food */

function scrapeCheese() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1);

        // pricePerG
        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        const listing = await new refrigeratedFoodSection({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/cheddar-flavour-processed-cheese-product-slices/p/21220995_EA"
        )
      );
    }, randomSecond);
  });
}

function scrapeCheeseBlock() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1);

        // pricePerG

        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        // Date

        // URL

        const listing = await new refrigeratedFoodSection({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);

        browser.close();
      }
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/pizza-mozzarella-cheese-with-28-m-f/p/21289761_EA"
        )
      );
    }, randomSecond());
  });
}
function mediumCheeseSlices() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1);

        // pricePerG

        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        // Date

        // URL

        const listing = await new refrigeratedFoodSection({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);

        browser.close();
      }
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/medium-cheddar-cheese-slices/p/20742451_EA"
        )
      );
    }, randomSecond());
  });
}
function scrapeYogurt() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1);

        // pricePerG

        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        // Date

        // URL

        const listing = await new refrigeratedFoodSection({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);

        browser.close();
      }
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/vanilla-blueberry-strawberry-raspberry-0-m-f-stirr/p/20685574002_EA"
        )
      );
    }, randomSecond());
  });
}
function scrapeEggs() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1);

        // pricePerG

        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        // Date

        // URL

        const listing = await new refrigeratedFoodSection({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);

        browser.close();
      }
      resolve(
        scrapeUrl("https://www.nofrills.ca/large-grade-a-eggs/p/20812144001_EA")
      );
    }, randomSecond());
  });
}
function scrapeMargarine() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1);

        // pricePerG

        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        // Date

        // URL

        const listing = await new refrigeratedFoodSection({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/non-hydrogenated-margarine/p/20665613_EA"
        )
      );
    }, randomSecond());
  });
}

/* Meat Department */

function chickenDrumstrick() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1) * 0.1;

        // pricePerG
        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        const listing = await new meatDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(
        scrapeUrl("https://www.nofrills.ca/chicken-drumstick/p/20654051_KG")
      );
    }, randomSecond);
  });
}
function beefStirFry() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1) * 0.1;

        // pricePerG
        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        const listing = await new meatDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/beef-stir-fry-strips-inside-round/p/21189996_KG"
        )
      );
    }, randomSecond);
  });
}
function outsideRoundSteak() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1) * 0.1;

        // pricePerG
        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        const listing = await new meatDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/outside-round-steak-club-pack/p/20358059_KG"
        )
      );
    }, randomSecond);
  });
}
function leanGroundBeef() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1);

        // pricePerG
        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        const listing = await new meatDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(
        scrapeUrl("https://www.nofrills.ca/lean-ground-beef/p/21125124_EA")
      );
    }, randomSecond);
  });
}
function porkCenterChop() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1) * 0.1;

        // pricePerG
        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        const listing = await new meatDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/free-from-boneless-pork-center-chop-tray-pack/p/21095303_KG"
        )
      );
    }, randomSecond);
  });
}
function blackForestHam() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1) * 0.1;

        // pricePerG
        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);

        const listing = await new meatDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(
        scrapeUrl("https://www.nofrills.ca/black-forest-ham/p/20817362_EA")
      );
    }, randomSecond);
  });
}

/* Produce Department */

function cantaloupe() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = ((pricePer100g.slice(1) * 100)/1360).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new produceDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(scrapeUrl("https://www.nofrills.ca/cantaloupe/p/20167017001_EA"));
    }, randomSecond);
  });
}
function sweetPotato() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1);

        // pricePerG
        const pricePerG = (pricePer100g.slice(1) / 100).toFixed(4);


        const listing = await new produceDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(scrapeUrl("https://www.nofrills.ca/sweet-potatoes/p/20697331001_EA"));
    }, randomSecond);
  });
}
function carrots() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      async function scrapeUrl(url) {
        const browser = await puppeteer.launch({ headless: "new" }); // new headless https://developer.chrome.com/articles/new-headless/
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
        await useProxy(page, proxyServer);
        // const data = await useProxy.lookup(page);

        // title
        const [titleElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[1]/h1'
        );
        const titleTxt = await titleElement.getProperty("textContent");
        const title = await titleTxt.jsonValue();

        // price
        const [priceElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/div/span/span[1]'
        );
        const priceTxt = await priceElement.getProperty("textContent");
        const price = await priceTxt.jsonValue();
        const priceFinal = price.slice(1);

        // pricePer100g
        const [pricePer100gElement] = await page.$x(
          '//*[@id="site-content"]/div/div/div[2]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/ul/li/span/span[1]'
        );
        const pricePer100gTxt = await pricePer100gElement.getProperty(
          "textContent"
        );
        const pricePer100g = await pricePer100gTxt.jsonValue();
        const pricePer100gFinal = pricePer100g.slice(1)*0.1;

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);


        const listing = await new produceDepartment({
          title: title,
          price: priceFinal,
          pricePer100g: pricePer100gFinal,
          pricePerGram: pricePerG,
          date: date,
          url: url,
        });

        listing.save();

        const timer = scrapeTimer();

        console.log({
          title,
          priceFinal,
          pricePer100gFinal,
          pricePerG,
          date,
          url,
        });
        console.log(`Current scraping time: ${timer}`);
        browser.close();
      }
      resolve(scrapeUrl("https://www.nofrills.ca/carrots/p/20116186001_KG"));
    }, randomSecond);
  });
}

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
