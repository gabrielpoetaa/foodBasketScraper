
# Toronto Food Basket Webscraper

In the dynamic landscape of Toronto's food market, understanding and tracking price trends is crucial. To address this need, I spearheaded a comprehensive project focused on the extraction and storage of essential information related to food prices in the city. This initiative combines advanced web scraping techniques, IP blocking prevention mechanisms, and optimized data storage strategies for a seamless and user-friendly experience.

The cornerstone of this project is a sophisticated web scraping solution developed using Puppeteer.api and Express. The primary objective was to extract precise price information for 65 different food items. The source of truth for these prices is a meticulously curated list maintained by the National Nutritious Food Basket of Canada (NNFB). This ensures that the collected data accurately reflects the real-time pricing dynamics of a diverse range of essential food products.

### IP Blocking Prevention

To safeguard the project from disruptions caused by IP blocking, I implemented a robust system. Leveraging Javascript Async functions and a proxy rotator, this mechanism ensures the sustained and uninterrupted operation of the web scraper. This proactive approach not only enhances the reliability of the data collection process but also contributes to the overall project stability.

### Optimized Data Storage for Efficiency

Recognizing the importance of efficient data organization, I established a well-structured storage system within a MongoDB cluster. This decision not only optimizes data retrieval for the associated Food Basket App but also facilitates seamless integration. Various collections within the MongoDB cluster were strategically utilized to streamline the data retrieval process, enhancing overall efficiency.

This project showcases a comprehensive approach to data extraction, ensuring accuracy, reliability, and a user-friendly experience within the Food Basket App. By combining cutting-edge web scraping techniques, IP blocking prevention mechanisms, and optimized data storage strategies, the project sets a new standard for data-driven applications in the realm of food price tracking.


## Clone the repository
```bash
git clone https://github.com/gabrielpoetaa/foodBasketScraper.git
```

## Navigate to the project directory
```bash
cd your-repo
```

## Install dependencies
```bash
npm install
```

## Run the application
```bash
npm start
```



