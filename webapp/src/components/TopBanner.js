import React, { useCallback, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import apikey from "../utils/LunarCrush";
const axios = require("axios");

const baseURL =
  "https://api.lunarcrush.com/v2/assets?data=assets&key=" + apikey;
const baseURL2 =
  "https://api.lunarcrush.com/v2/assets?data=meta&key=" + apikey + "&type=full";

function TopBanner({ symbol }) {
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
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={image}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {" " + coinData.name}
      </Navbar.Brand>
    </Navbar>
  );
}

export default TopBanner;
