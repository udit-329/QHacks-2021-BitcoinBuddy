import praw
import fb_class
import pandas as pd
import datetime

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
    #Data for 2-3 days
    hot = sub.hot(limit=1000)
    #Very recent data
    rising = sub.rising(limit=100)
    #Data for a week
    top = sub.top("week", limit=10000)

    return hot, rising, top

def unix_time_convert(time):
    timestamp = datetime.datetime.fromtimestamp(time)
    return timestamp.strftime('%Y-%m-%d %H:%M:%S')

def create_table(sub):
    hot, rising, top = get_data(sub)
    hot_all = []
    
    for post in hot:
        hot_all.append([post.title, post.url, post.score, post.subreddit, post.num_comments, post.selftext, unix_time_convert(post.created)])
    
    hot_all = pd.DataFrame(hot_all, columns = ['title', 'url', 'score', 'subreddit', 'num_comments', 'body', 'created'])
    return hot_all

if __name__ == "__main__":
    create_table(crypto_currency)