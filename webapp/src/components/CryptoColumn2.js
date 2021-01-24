import React, { useCallback, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import apikey from "../utils/LunarCrush";
const axios = require("axios");
const baseURL =
  "https://api.lunarcrush.com/v2/assets?data=assets&key=" + apikey;

function CryptoColumnTwo({ symbol }) {
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
    <div class="card-column tipp">
      <Card style={{ width: "16rem", height: "33rem" }}>
        <svg class="tipico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
            fill="currentColor"
            d="M564 377L412.78 498a64 64 0 0 1-40 14H16a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16h55.4l46.5-37.71A117.65 117.65 0 0 1 192 320h160a32 32 0 0 1 32 31.94 31.2 31.2 0 0 1-.46 5.46C381 373.1 366.19 384 350.29 384H272a16 16 0 0 0 0 32h118.28a63.64 63.64 0 0 0 40-14l92.4-73.9c12.4-10 30.8-10.7 42.6 0A32 32 0 0 1 564 377z"
            class="fa-secondary"
          />
          <path
            fill="currentColor"
            d="M329.28 222.4V240c0 8.8-7.77 16-17.26 16h-17.25c-9.48 0-17.25-7.2-17.25-16v-17.7a82.78 82.78 0 0 1-34.28-11.5 11.46 11.46 0 0 1-3.85-15.74 11.64 11.64 0 0 1 2.23-2.66l18.87-17.5c4-3.7 10-4.2 15.2-2a29.62 29.62 0 0 0 11.11 2.2h35.36c5 0 9.06-3.8 9.06-8.4a8.58 8.58 0 0 0-6.58-8.1l-53.91-14.3c-23.93-6.4-43.13-24.7-46.25-47.7-4.31-32 20.48-59.4 53.15-63V16c0-8.8 7.76-16 17.25-16h17.25c9.49 0 17.25 7.2 17.25 16v17.7a82.92 82.92 0 0 1 34.29 11.5 11.48 11.48 0 0 1 1.62 18.4l-18.87 17.5c-4 3.7-10 4.2-15.2 2a29.62 29.62 0 0 0-11.11-2.2h-35.36c-5 0-9.06 3.8-9.06 8.4a8.58 8.58 0 0 0 6.58 8.1l53.91 14.3c23.93 6.4 43.11 24.7 46.24 47.7 4.31 32-20.43 59.4-53.14 63z"
            class="fa-primary"
          />
        </svg>
        <Card.Body>
          <Card.Title>Our Financial Tip(s)!</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CryptoColumnTwo;
