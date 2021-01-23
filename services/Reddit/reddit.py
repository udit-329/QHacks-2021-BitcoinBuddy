import praw
import pandas as pd
import datetime

red = praw.Reddit(client_id='qm1XcqK5n4MNPQ', client_secret='bYTJwaH9ygGnNyOOPGB8QuyF5YBc7g', user_agent='crypto')
#crypto specific
crypto_currency = red.subreddit('CryptoCurrency')
altcoins = red.subreddit('altcoins')
crypto_markets = red.subreddit('CryptoMarkets')
binance = red.subreddit('binance')
altcointrader = red.subreddit('AltcoinTrader')

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
        print(post.title)
        hot_all.append([post.title, post.url, post.score, post.selftext, unix_time_convert(post.created)])
    
    hot_all = pd.DataFrame(hot_all, columns = ['title', 'url', 'score', 'subreddit', 'num_comments', 'body', 'created'])
    return hot_all

if __name__ == "__main__":
    create_table(crypto_currency)