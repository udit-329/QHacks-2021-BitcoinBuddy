var app = require("express")(),
  bodyParser = require("body-parser"),
  twitter = require("twitter-lite"),
  sentiment = require("sentiment"),
  port = 2001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const twit = new twitter({
  consumer_key: "IcQX43azwezwB6cGvhfaPYUiD",
  consumer_secret: "JgtnFIxJ3pqLx2g6qQz4imQOrANbj4q6CHoiQTn5ds73ruOTLT",
});

//API Key: IcQX43azwezwB6cGvhfaPYUiD
// API Secret Key: JgtnFIxJ3pqLx2g6qQz4imQOrANbj4q6CHoiQTn5ds73ruOTLT
// Bearer Token: AAAAAAAAAAAAAAAAAAAAAEYgMAEAAAAAwepI9G4%2FbKRz2AV6FGMTL7DTYTE%3DtRpVpFYzKnmEuU4aSQ7Fd8sQwhZ3ns3E36lM5xxziwumA9t0Vk

// Get Routes
app.get("/twitter/:id", async (req, res, next) => {
  var q = req.params.id
    try {
    let response = await twit.getBearerToken();
    const app = new twitter({
      bearer_token: response.access_token,
    });

     response = await app.get(`/search/tweets`, {
      q: q, // The search term
      lang: "en", // Only get english tweets
      count: 10, // How many tweets
    });

    const tweetlist = []
    for (tweet of response.statuses) {
      tweetlist.push({
        id: tweet.id,
        created_at: tweet.created_at,
        text: tweet.text,
        sentiment: sntmnt(tweet.text)
      })
    }

    return res.send(tweetlist);
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
