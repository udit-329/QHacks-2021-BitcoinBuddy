import React, { useCallback, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import apikey from "../utils/LunarCrush";
const axios = require("axios");

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
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [url, url2]);

  useEffect(() => {
    getCoinData();
  }, [symbol, getCoinData]);

  return (
      <Row>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <img class="cardname-circle" src={image}></img>
            <div class="cardname-topper">
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
            </div>
          </Card.Body>
        </Card>

        <Card style={{ width: "12rem" }}>
          <Card.Body>
            <div class="cardname-topper">
              <Card.Title>Volume</Card.Title>
              <Card.Subtitle className="text-primary">
                {Math.floor(parseFloat(coinData.volume_24h))+" "+symbol}
              </Card.Subtitle>
            </div>
          </Card.Body>
        </Card>

        <Card style={{ width: "12rem" }}>
          <Card.Body>
            <div class="cardname-topper">
              <Card.Title>Market Cap</Card.Title>
              <Card.Subtitle className="text-primary">
                ${Math.floor(parseFloat(coinData.market_cap))}
              </Card.Subtitle>
            </div>
          </Card.Body>
        </Card>

        <Card style={{ width: "12rem" }}>
          <Card.Body>
            <div class="cardname-topper">
              <Card.Title>Sentiment</Card.Title>
              <Card.Subtitle className="text-danger">
                {coinData.average_sentiment+"/5 "}<i class="fas fa-chevron-down"></i>
              </Card.Subtitle>
            </div>
          </Card.Body>
        </Card>
      </Row>
  );
}

export default CryptoCard;
