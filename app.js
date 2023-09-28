import dotenv from "dotenv"
dotenv.config()
import connect from 'mongoose';
import connection from "mongoose";
import config from "dotenv"
import cheerio from "cheerio";
import fetch from "node-fetch";
import express from "express"
// import request from "request";
// import bodyParser from "body-parser";
// import axios from 'axios';
// import { scheduleJob } from "node-schedule";
import puppeteer from "puppeteer";
import mongoose from "mongoose";
import useProxy from "puppeteer-page-proxy";
// import { resolveInclude } from "ejs";

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


// Database
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_USER = process.env.DB_USER

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mkxwkvb.mongodb.net/foodBasket`);

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
const produceDepartment = mongoose.model(
  "produceDepartment",
  webScrapingDBSchema
);
const bakeryDepartment = mongoose.model(
  "bakeryDepartment",
  webScrapingDBSchema
);
const frozenFoodDepartment = mongoose.model(
  "frozenFoodDepartment",
  webScrapingDBSchema
);
const cannedAndDryDepartment = mongoose.model(
  "cannedAndDryDepartment",
  webScrapingDBSchema
);

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

scrapeCheese()
.then(scrapeCheeseBlock)
.then(mediumCheeseSlices)
.then(scrapeYogurt)
.then(scrapeEggs)
.then(scrapeMargarine)
.then(function firstBreak() {
  console.log("Finishing Refrigerated Food scraping");
  console.log("Starting Meat Department scraping")
})
.then(chickenDrumstrick)
.then(beefStirFry)
.then(outsideRoundSteak)
.then(leanGroundBeef)
.then(porkCenterChop)
.then(blackForestHam)
.then(function firstBreak() {
  console.log("Finishing Meat Department scraping");
  console.log("Starting Produce Department scraping")
})
.then(cantaloupe)
.then(sweetPotato)
.then(carrots)
.then(romaineLettuce)
.then(broccoliCrown)
.then(sweetGreenPeppers)
.then(apples)
.then(bananas)
.then(grapes)
.then(orange)
.then(pears)
.then(potatoes)
.then(turnips)
.then(cabbage)
.then(cucumbers)
.then(celery)
.then(lettuceIceberg)
.then(whiteMushrooms)
.then(onion)
.then(tomatoes)
.then(function firstBreak() {
  console.log("Finishing Produce Department scraping");
  console.log("Starting Bakery Department scraping")
})
.then(pitaBread)
.then(wheatBread)
.then(originalBread)
.then(hamburgerBread)
.then(function firstBreak() {
  console.log("Finishing Bakery Department scraping");
  console.log("Starting Frozen Food Department scraping")
})
.then(frozenFishFillet)
.then(greenBeans)
.then(mixedVegetables)
.then(greenPeas)
.then(concentratedOrangeJuice)
.then(frozenStrawberries)
.then(blackBeans)
.then(flakedTuna)
.then(wildSalmon)
.then(peachSlices)
.then(crispCorn)
.then(dicedTomatoes)
.then(appleJuice)
.then(tomatoCocktail)
.then(cereal)
.then(granola)
.then(oat)
.then(wholeWheatFlour)
.then(allPurposeFlour)
.then(raisins)
.then(lentils)
.then(socialTeaBiscuits)
.then(crackers)
.then(peanutButter)
.then(vegetableOil)
.then(caesarDressing)
.then(italianDressing)
.then(spaghetti)
.then(rice)
.then(peanuts)
.then(function firstBreak() {
  console.log("SCRAPING COMPLETED SUCCESSFULLY");
})



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
    }, randomSecond());
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
    }, randomSecond());
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
    }, randomSecond());
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
    }, randomSecond());
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
    }, randomSecond());
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
    }, randomSecond());
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
    }, randomSecond());
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
        const pricePer100gFinal = (
          (pricePer100g.slice(1) * 100) /
          1360
        ).toFixed(4);

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
    }, randomSecond());
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
      resolve(
        scrapeUrl("https://www.nofrills.ca/sweet-potatoes/p/20697331001_EA")
      );
    }, randomSecond());
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
        const pricePer100gFinal = pricePer100g.slice(1) * 0.1;

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
    }, randomSecond());
  });
}
function romaineLettuce() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/romaine-lettuce/p/20065036001_EA")
      );
    }, randomSecond());
  });
}
function broccoliCrown() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/broccoli-crown/p/21121560001_EA")
      );
    }, randomSecond());
  });
}
function sweetGreenPeppers() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/sweet-green-peppers/p/20425893001_KG"
        )
      );
    }, randomSecond());
  });
}
function apples() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/fuji-apples/p/20310940001_KG")
      );
    }, randomSecond());
  });
}
function bananas() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/bananas-bunch/p/20175355001_KG")
      );
    }, randomSecond());
  });
}
function grapes() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl(
          "https://www.nofrills.ca/pc-extra-large-red-seedless-grapes/p/20159199001_KG"
        )
      );
    }, randomSecond());
  });
}
function orange() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/navel-orange/p/20426078001_KG")
      );
    }, randomSecond());
  });
}
function pears() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/yellow-asian-pears/p/20035618001_KG")
      );
    }, randomSecond());
  });
}
function potatoes() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/yellow-potatoes/p/20106716001_KG")
      );
    }, randomSecond());
  });
}
function turnips() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(scrapeUrl("https://www.nofrills.ca/turnips/p/20136107001_KG"));
    }, randomSecond());
  });
}
function cabbage() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/cabbage-green/p/20793034001_KG")
      );
    }, randomSecond());
  });
}
function cucumbers() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/field-cucumbers/p/20027651001_EA")
      );
    }, randomSecond());
  });
}
function celery() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/celery-stalks/p/20163119001_EA")
      );
    }, randomSecond());
  });
}
function lettuceIceberg() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/lettuce-iceberg/p/20135326001_EA")
      );
    }, randomSecond());
  });
}
function whiteMushrooms() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/white-mushrooms/p/20321225001_KG")
      );
    }, randomSecond());
  });
}
function onion() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/yellow-onion/p/20168304001_KG")
      );
    }, randomSecond());
  });
}
function tomatoes() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 0.1).toFixed(4);

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
      resolve(
        scrapeUrl("https://www.nofrills.ca/roma-tomatoes/p/20143381001_KG")
      );
    }, randomSecond());
  });
}

/* Bakery Department */

function pitaBread() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new bakeryDepartment({
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
          "https://www.nofrills.ca/wrap-me-white-flour-tortillas-large/p/20976626_EA"
        )
      );
    }, randomSecond());
  });
}
function wheatBread() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new bakeryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/100-whole-wheat-bread/p/21509877_EA")
      );
    }, randomSecond());
  });
}
function originalBread() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new bakeryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/original-bread/p/21509822_EA")
      );
    }, randomSecond());
  });
}
function hamburgerBread() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new bakeryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/hamburger-buns/p/21509434_EA")
      );
    }, randomSecond());
  });
}

/* Frozen Food Department */

function frozenFishFillet() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new frozenFoodDepartment({
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
        scrapeUrl("https://www.nofrills.ca/wild-pollock-fillets/p/21167006_EA")
      );
    }, randomSecond());
  });
}
function greenBeans() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new frozenFoodDepartment({
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
        scrapeUrl("https://www.nofrills.ca/cut-green-beans/p/20304191_EA")
      );
    }, randomSecond());
  });
}
function mixedVegetables() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new frozenFoodDepartment({
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
        scrapeUrl("https://www.nofrills.ca/mixed-vegetables/p/20316388_EA")
      );
    }, randomSecond());
  });
}
function greenPeas() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new frozenFoodDepartment({
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
        scrapeUrl("https://www.nofrills.ca/green-peas-club-size/p/20319825_EA")
      );
    }, randomSecond());
  });
}
function concentratedOrangeJuice() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new frozenFoodDepartment({
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
        scrapeUrl("https://www.nofrills.ca/unsweetened-frozen-concentrated-pulp-free-orange-j/p/20552223001_EA")
      );
    }, randomSecond());
  });
}
function frozenStrawberries() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new frozenFoodDepartment({
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
        scrapeUrl("https://www.nofrills.ca/whole-strawberries/p/21033168_EA")
      );
    }, randomSecond());
  });
}

/* Canned and Dry Food Department */

function blackBeans() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/black-beans/p/20325921005_EA")
      );
    }, randomSecond());
  });
}
function flakedTuna() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/flaked-light-tuna/p/20521648_EA")
      );
    }, randomSecond());
  });
}
function wildSalmon() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/sustainably-sourced-wild-pacific-pink-salmon/p/20164488_EA")
      );
    }, randomSecond());
  });
}
function peachSlices() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/clingstone-peach-slices-in-juice-from-concentrate/p/20618824_EA")
      );
    }, randomSecond());
  });
}
function crispCorn() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/whole-kernel-crisp-corn/p/20303822_EA")
      );
    }, randomSecond());
  });
}
function dicedTomatoes() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/diced-tomatoes/p/20600787_EA")
      );
    }, randomSecond());
  });
}
function appleJuice() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/apple-juice-from-concentrate/p/20087458_EA")
      );
    }, randomSecond());
  });
}
function tomatoCocktail() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/original-tomato-clam-cocktail/p/20506849003_EA")
      );
    }, randomSecond());
  });
}
function cereal() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/frosted-flakes-cereal/p/21209747_EA")
      );
    }, randomSecond());
  });
}
function granola() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/harvest-crunch-original-granola-cereal/p/21219824_EA")
      );
    }, randomSecond());
  });
}
function oat() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/quick-100-whole-grain-oats/p/20923828_EA")
      );
    }, randomSecond());
  });
}
function wholeWheatFlour() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/whole-wheat-flour/p/20303325_EA")
      );
    }, randomSecond());
  });
}
function allPurposeFlour() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/all-purpose-flour/p/20013256_EA")
      );
    }, randomSecond());
  });
}
function raisins() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/sultana-raisins/p/20647009_EA")
      );
    }, randomSecond());
  });
}
function lentils() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/lentils/p/20325921004_EA")
      );
    }, randomSecond());
  });
}
function socialTeaBiscuits() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/social-tea-biscuits/p/20618577_EA")
      );
    }, randomSecond());
  });
}
function crackers() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/toppables-crackers/p/21449871_EA")
      );
    }, randomSecond());
  });
}
function peanutButter() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/smooth-peanut-butter-club-size/p/20323398002_EA")
      );
    }, randomSecond());
  });
}
function vegetableOil() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/100-pure-vegetable-oil/p/20768660_EA")
      );
    }, randomSecond());
  });
}
function caesarDressing() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/caesar-dressing/p/20628489001_EA")
      );
    }, randomSecond());
  });
}
function italianDressing() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/italian-dressing/p/20628489002_EA")
      );
    }, randomSecond());
  });
}
function spaghetti() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/spaghetti-pasta/p/20315613002_EA")
      );
    }, randomSecond());
  });
}
function rice() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/long-grain-white-rice/p/20069589_EA")
      );
    }, randomSecond());
  });
}
function peanuts() {
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
        const pricePer100gFinal = (pricePer100g.slice(1) * 1).toFixed(4);

        // pricePerG
        const pricePerG = (pricePer100gFinal / 100).toFixed(4);

        const listing = await new cannedAndDryDepartment({
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
        scrapeUrl("https://www.nofrills.ca/salted-blanched-peanuts/p/20058865_EA")
      );
    }, randomSecond());
  });
}



console.log(`Successfully started server on port ${port}.`);
app.listen(port, () => {
});
