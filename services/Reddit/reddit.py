import praw
import datetime
import json
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

red = praw.Reddit(client_id='qm1XcqK5n4MNPQ', client_secret='bYTJwaH9ygGnNyOOPGB8QuyF5YBc7g', user_agent='crypto')
vader = SentimentIntensityAnalyzer()
vader.lexicon.update({
    'moon': 5,
    'rocket': 5,
    'skyrocket': 5,
    'bullish': 5,
    'bearish': -5,
    'purchased': 2,
    'bought': 2,
    'buy': 2,
    'sell': -2,
    'sold': -2,
    'buying': 2,
    'selling': -2,
    'purchasing': 2,
    'HODL': 1,
    'HODLing': 1,
    'HODLING': 1,
    'bull': 5,
    'bear': 5,
    'crushes': 5,
    'beats': 3,
    'misses': -3,
    'trouble': -5,
    'falls': -4,
    'crashes': -5,
    'inflationary': -5,
    'inflation': -5,
    'launch': 4,
    'launched':4,
    'scarcity': -3,
    'scarce': -3,
    'fall': -4,
    'rise': 4,
    'rising': 4,
    'falling': -4,
})


def get_data(name):
    sub = red.subreddit(name)
    top = sub.top("week", limit=1000)
    return top


def unix_time(time):
    timestamp = datetime.datetime.fromtimestamp(time)
    return timestamp.strftime('%Y-%m-%d %H:%M:%S')


def create_json(name):
    top = get_data(name)
    top_all = {'subreddit': str(name),
        'num_posts': 0,
               'posts': [],
               'sentiment': {'neg': 0, 'neu': 0, 'pos': 0, 'compound': 0}}

    for post in top:
        pol = vader.polarity_scores(post.title)
        top_all['num_posts'] += 1
        top_all['posts'].append({'title': post.title,
                                 'url': post.url,
                                 'score': post.score,
                                 'created_at': unix_time(post.created),
                                 'polarity_scores': pol})
        top_all['sentiment']['neg'] += pol['neg']
        top_all['sentiment']['neu'] += pol['neu']
        top_all['sentiment']['pos'] += pol['pos']
        top_all['sentiment']['compound'] += pol['compound']

    with open('./scraped_data/'+str(name) + '.json', 'w') as outfile:
        json.dump(top_all, outfile)

    return 'Reddit Scraping: Success!'

if __name__ == '__main__':
    name='bitcoin'
    top = get_data(name)
    for post in top:
        print(post.title)
        print(vader.polarity_scores(post.title))
