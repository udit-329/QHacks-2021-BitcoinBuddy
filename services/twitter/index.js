const Twitter = require('twitter-lite');

const user = new Twitter({
    consumer_key: "IcQX43azwezwB6cGvhfaPYUiD",
    consumer_secret: "JgtnFIxJ3pqLx2g6qQz4imQOrANbj4q6CHoiQTn5ds73ruOTLT",
});

//API Key: IcQX43azwezwB6cGvhfaPYUiD
// API Secret Key: JgtnFIxJ3pqLx2g6qQz4imQOrANbj4q6CHoiQTn5ds73ruOTLT
// Bearer Token: AAAAAAAAAAAAAAAAAAAAAEYgMAEAAAAAwepI9G4%2FbKRz2AV6FGMTL7DTYTE%3DtRpVpFYzKnmEuU4aSQ7Fd8sQwhZ3ns3E36lM5xxziwumA9t0Vk

(async function() {
    try {
        let response = await user.getBearerToken();
        const app = new Twitter({
            bearer_token: response.access_token,
        });

        // Search for recent tweets from the twitter API
        response = await app.get(`/search/tweets`, {
            q: "Lionel Messi", // The search term
            lang: "en",        // Let's only get English tweets
            count: 10,        // Limit the results to 100 tweets
        });

        // Loop over all the tweets and print the text
        for (tweet of response.statuses) {
            console.dir(tweet.text);
        }
    } catch(e) {
        console.log("There was an error calling the Twitter API");
        console.dir(e);
    }
})();