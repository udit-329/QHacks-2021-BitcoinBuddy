import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')
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
    'launched': 4,
    'scarcity': -3,
    'scarce': -3,
    'fall': -4,
    'rise': 4,
    'rising': 4,
    'falling': -5,
    'bubble': -5,
    'plunge': -5,
    'plunging': -5,
    'surge': 4,
})


def get_config():
    return vader
