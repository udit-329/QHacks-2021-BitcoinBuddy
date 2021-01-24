import React, { useCallback, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import apikey from "../utils/LunarCrush";
const axios = require("axios");
const baseURL =
  "https://api.lunarcrush.com/v2/assets?data=assets&key=" + apikey;

function CryptoColumn({ symbol }) {
  const [coinData, setCoinData] = useState({});
  const url = baseURL + "&symbol=" + symbol + "&data_points=1&interval=hour";

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
  }, [url]);

  useEffect(() => {
    getCoinData();
  }, [symbol, getCoinData]);

  return (
    <div class="card-column">
      <Card style={{ width: "16rem", height: "22.2rem" }}>
        <Card.Body>
          <Card.Title>{symbol.toUpperCase()} Ranking</Card.Title>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroupItem className="text-primary">
            Social Rank: {coinData.social_score_24h_rank}
          </ListGroupItem>
          <ListGroupItem className="text-primary">
            Market Cap Rank: {coinData.market_cap_rank}
          </ListGroupItem>
        </ListGroup>

        <Card.Body>
          <Card.Title>{symbol.toUpperCase()} Price Statistics</Card.Title>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroupItem
            className={`mb-2 ${
              coinData.percent_change_24h >= 0 ? "text-success" : "text-danger"
            }`}
          >
            24h Change: {coinData.percent_change_24h}%
          </ListGroupItem>
          <ListGroupItem
            className={`mb-2 ${
              coinData.percent_change_7d >= 0 ? "text-success" : "text-danger"
            }`}
          >
            7d Change: {coinData.percent_change_7d}%
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export default CryptoColumn;
