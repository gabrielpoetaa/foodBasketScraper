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