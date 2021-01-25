# Bitcoin Buddy
### Made during QHacks 2021

Bitcoin Buddy performs sentiment analysis on scraped data from thousands of news articles, reddit posts, and tweets. Using this data in conjunction with historical price data, Bitcoin Buddy then forecasts price movements for cryptocurrencies.

##### Tech Stack

Flask backend which makes call to apis to collect data. Data is then sent over to GCP for sentiment analysis and finally stored on Firebase. A React Frontend then uses this data to make a prediction.
