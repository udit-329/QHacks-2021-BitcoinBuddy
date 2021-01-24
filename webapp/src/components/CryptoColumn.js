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
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{symbol.toUpperCase()} Price Statistics</Card.Title>
        <ListGroup className="list-group-flush">
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
      </Card.Body>
   </Card>

   <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{symbol.toUpperCase()} Price Statistics</Card.Title>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
   </Card>
   </div>
  );
}

export default CryptoColumn;
