import praw

reddit = praw.Reddit(client_id='qm1XcqK5n4MNPQ', client_secret='bYTJwaH9ygGnNyOOPGB8QuyF5YBc7g', user_agent='crypto')

def init_subs():
    #general
    algotrading = reddit.subreddit('algotrading')
    wallStreetBets = reddit.subreddit('wallstreetbets')
    stocks = reddit.subreddit('stocks')

    #crypto specific
    cryptoCurrency = reddit.subreddit('CryptoCurrency')
    bitcoin = reddit.subreddit('Bitcoin')
    btc = reddit.subreddit('btc')
    cryptoMarkets = reddit.subreddit('CryptoMarkets')
    ethtrader = reddit.subreddit('ethtrader')
    binance = reddit.subreddit('binance')

test = binance.hot(limit=5)
for p in test:
    print(p.title)
