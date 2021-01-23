import praw
import fb_class

reddit = praw.Reddit(client_id='qm1XcqK5n4MNPQ', client_secret='bYTJwaH9ygGnNyOOPGB8QuyF5YBc7g', user_agent='crypto')

#general
algotrading = reddit.subreddit('algotrading')
wall_street_bets = reddit.subreddit('wallstreetbets')
stocks = reddit.subreddit('stocks')

#crypto specific
crypto_currency = reddit.subreddit('CryptoCurrency')
bitcoin = reddit.subreddit('Bitcoin')
btc = reddit.subreddit('btc')
crypto_markets = reddit.subreddit('CryptoMarkets')
ethtrader = reddit.subreddit('ethtrader')
binance = reddit.subreddit('binance')

def get_data(sub):
    hot = sub.hot(limit=1000)
    rising = sub.rising(limit=1000)
    top = sub.top("week", limit=1000)

    return hot, rising, top
