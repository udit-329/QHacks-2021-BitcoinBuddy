import praw
import pandas as pd
import datetime
import json

red = praw.Reddit(client_id='qm1XcqK5n4MNPQ', client_secret='bYTJwaH9ygGnNyOOPGB8QuyF5YBc7g', user_agent='crypto')


def get_data(name):
    sub = red.subreddit(name)
    top = sub.top("week", limit=1000)
    return top


def unix_time(time):
    timestamp = datetime.datetime.fromtimestamp(time)
    return timestamp.strftime('%Y-%m-%d %H:%M:%S')


def create_json(name):

    top = get_data(name)
    top_all = {'posts': [],
               'sentiment': []}

    for post in top:
        print(post)
        top_all['posts'].append({'title': post.title,
                                 'url': post.url,
                                 'score': post.score,
                                 'body': post.selftext,
                                 'created_at': unix_time(post.created)})

    with open(str(name) + '.json', 'w') as outfile:
        json.dump(top_all, outfile)


if __name__ == "__main__":
    create_json('bitcoin')
