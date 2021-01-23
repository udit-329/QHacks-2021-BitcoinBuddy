import firebase_admin
from firebase_admin import credentials, firestore
import json
from datetime import datetime

firebase_admin.initialize_app(
    credentials.Certificate("./creds.json"),
    {'databaseURL': 'https://qhacks-2020.firebaseio.com/'}
)

def upload(name):
    db = firestore.client()
    doc_ref = db.collection('reddit')

    data = {}
    with open('./scraped_data/'+str(name)+'.json') as f:
        data = json.load(f)

    doc_ref.document(data['subreddit']).set({
        'sentiment': data['sentiment'],
        'numPosts': data['num_posts'],
        'dataAdded': str(datetime.now()),
    })

    return 'Firebase Upload: Success!'


def upload_news(name):
    db = firestore.client()
    doc_ref = db.collection('news')

    data = {}
    with open('./scraped_data/'+str(name)+'_news.json') as f:
        data = json.load(f)

    doc_ref.document(name).set({
        'sentiment': data['sentiment'],
        'totalResults': data['total_results'],
        'dataAdded': str(datetime.now()),
    })

    return 'Firebase Upload: Success!'

