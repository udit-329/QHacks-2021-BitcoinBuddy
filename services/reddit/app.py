from flask import Flask, render_template, request, redirect, Response,jsonify
import reddit as red
import firebase as fb
import asyncio
import json
import sys

sys.setrecursionlimit(150000)

app = Flask(__name__)


async def scrape_reddit(query):
    return red.create_json(query)


async def upload_to_firebase(query):
    return fb.upload(query)


app.config['SECRET_KEY'] = 'bonjour'


@app.route('/', methods=['GET'])
def home():
    return "<h1>Bruh, this aint it</h1>"


@app.route('/reddit/<query>', methods=['GET'])
def page(query):
    q = query
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    reddit_scraped = loop.run_until_complete(scrape_reddit(q))
    data_uploaded = loop.run_until_complete(upload_to_firebase(q))
    data = {}
    with open('./scraped_data/'+str(q)+'.json') as f:
        data = json.load(f)
    return jsonify({'subreddit': data['subreddit'], 'sentiment':data['sentiment']})


app.run()
'''
if __name__ == "__main__":
    data_table = reddit.create_table(reddit.bitcoin)
    data_table.to_csv('out.csv', index=False)
    #firebase_app.add_data("test", data_table)

'''
