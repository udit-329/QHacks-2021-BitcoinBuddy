import praw
import datetime
import json
import sentiment

red = praw.Reddit(client_id='qm1XcqK5n4MNPQ', client_secret='bYTJwaH9ygGnNyOOPGB8QuyF5YBc7g', user_agent='crypto')

vader = sentiment.get_config()


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

        sent = 0
        if pol['neg'] > pol['pos']:
            top_all['sentiment']['neg'] += 1
        elif pol['pos'] > pol['neg']:
            sent = 1
            top_all['sentiment']['pos'] += 1
        else:
            sent = 1
            top_all['sentiment']['neu'] += 1

        top_all['sentiment']['compound'] += sent

    top_all['sentiment']['compound'] /= top_all['num_posts']
    with open('./scraped_data/' + str(name) + '.json', 'w+') as outfile:
        json.dump(top_all, outfile)

    return 'Reddit Scraping: Success!'

if __name__ == '__main__':
    name='bitcoin'
    top = get_data(name)
    for post in top:
        print(post.title)
        print(vader.polarity_scores(post.title))
