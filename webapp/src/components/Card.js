import React, { useCallback, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
const axios = require("axios");

const apikey ='dgi6s9vbnhjlgm7ucw98m';
const baseURL =
"https://api.lunarcrush.com/v2/assets?data=assets&key="+apikey;
const baseURL2 =
"https://api.lunarcrush.com/v2/assets?data=meta&key="+apikey+"&type=full";

function Card({ symbol }) {
  const [coinData, setCoinData] = useState({});
  const [image, setImage] = useState("");
  const url = baseURL+"&symbol=" + symbol + "&data_points=1&interval=hour";
  const url2 = baseURL2+"&symbol=" + symbol;

  const getCoinData = useCallback(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        var res = response.data
        delete res.usage
        res.data = res.data[0]
        delete res.data.timeSeries
        setCoinData(res);
        console.log(res)
      })
      .catch(function (error) {
        console.log(error);
      });

      axios
      .get(url2)
      .then(function (response) {
        // handle success
        var res = response.data
        res.data = res.data[0]
        setImage(res.data.image)
        console.log(res.data.image)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [url, url2]);

  useEffect(() => {
    symbol && getCoinData()
  }, [symbol, getCoinData]);

  return (
    <div>
        <Button/>
      {symbol ? (<img src={image} width="50" height="50"></img>) : (<div></div>)}
    </div>
  );
}

export default Card;
