var app = require("express")(),
  bodyParser = require("body-parser"),
  twitter = require("twitter-lite"),
  sentiment = require("sentiment"),
  port = 2001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const twit = new twitter({

});



function analyze(text) {
  return new sentiment().analyze(
    text,
    (options = {
      extras: {
        moon: 5,
        rocket: 5,
        skyrocket: 5,
        bullish: 5,
        bearish: -5,
        purchased: 2,
        bought: 2,
        buy: 2,
        sell: -2,
        sold: -2,
        buying: 2,
        selling: -2,
        purchasing: 2,
        HODL: 1,
        HODLing: 1,
        HODLING: 1,
        bull: 5,
        bear: 5,
      },
    })
  );
}

// Get Routes
app.get("/twitter/:id", async (req, res, next) => {
  var q = req.params.id;
  try {
    let response = await twit.getBearerToken();
    const app = new twitter({
      bearer_token: response.access_token,
    });

    response = await app.get(`/search/tweets`, {
      q: q, // The search term
      lang: "en", // Only get english tweets
      count: 1000, // How many tweets
    });

    var tweetList = [];
    var sentimentObj = {
      total: 0,
      total_pos: 0,
      total_neg: 0,
      total_neutral: 0,
      pos_sentiment: 0,
      neg_sentiment: 0,
      sentiment: 0,
    };
    for (tweet of response.statuses) {
      var temp_sent = analyze(tweet.text);
      tweetList.push({
        id: tweet.id,
        created_at: tweet.created_at,
        text: tweet.text,
        sentiment: temp_sent,
      });

      if (temp_sent.score > 0) {
        sentimentObj["total"] += 1;
        sentimentObj["total_pos"] += 1;
        sentimentObj["pos_sentiment"] += temp_sent.score;
        sentimentObj["sentiment"] += temp_sent.score;
      } else if (temp_sent.score < 0) {
        sentimentObj["total"] += 1;
        sentimentObj["total_neg"] += 1;
        sentimentObj["neg_sentiment"] += temp_sent.score;
        sentimentObj["sentiment"] += temp_sent.score;
      } else {
        sentimentObj["total"] += 1;
        sentimentObj["total_neutral"] += 1;
      }
    }

    return res.send({ tweets: tweetList, sentiment: sentimentObj });
  } catch (e) {
    console.log("Error!");
    console.dir(e);
  }
  next();
});

app.get("/", (req, res) => {
  return res.send("Nothing here...");
});

app.listen(port, () => {
  console.log("Server started on port: " + port);
});
