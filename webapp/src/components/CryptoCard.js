import React, { useCallback, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const axios = require("axios");

const apikey = "r5zor17k158zyyilqvmi4";
const baseURL =
  "https://api.lunarcrush.com/v2/assets?data=assets&key=" + apikey;
const baseURL2 =
  "https://api.lunarcrush.com/v2/assets?data=meta&key=" + apikey + "&type=full";

function CryptoCard({ symbol }) {
  const [coinData, setCoinData] = useState({});
  const [image, setImage] = useState("");
  const url = baseURL + "&symbol=" + symbol + "&data_points=1&interval=hour";
  const url2 = baseURL2 + "&symbol=" + symbol;

  const getCoinData = useCallback(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        var res = response.data;
        delete res.usage;
        res.data = res.data[0];
        delete res.data.timeSeries;

        setCoinData(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(url2)
      .then(function (response) {
        // handle success
        var res = response.data;
        res.data = res.data[0];

        setImage(res.data.image);
        console.log(res.data.image);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [url, url2]);

  useEffect(() => {
    getCoinData();
  }, [symbol, getCoinData]);

  return (
    <div>
      {symbol ? (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{coinData.name}</Card.Title>
            <Card.Subtitle
              className={`mb-2 ${
                coinData.percent_change_24h >= 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              ${parseFloat(coinData.close).toFixed(2)}{" "}
              {coinData.percent_change_24h >= 0 ? (
                <i class="fas fa-chevron-up"></i>
              ) : (
                <i class="fas fa-chevron-down"></i>
              )}
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CryptoCard;
