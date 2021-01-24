import React, { useCallback, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { PieChart } from "react-minimal-pie-chart";
import firebase from "../utils/Firebase";
import ParseData from "../utils/ParseData";
import "firebase/firestore";
const firestore = firebase.firestore();

function PiGraph({ plat, coin }) {
  const [sentData, setSentData] = useState({
    sentiment: {
      neg: 10,
      pos: 25,
      neu: 12,
    },
  });
  const getData = useCallback(() => {
    console.log("PiGraph");
    firestore
      .collection(plat)
      .doc(coin)
      .get()
      .then((doc) => {
        var res = doc.data();
        res.sentiment.pos = ParseData(res.sentiment.pos, "pos");
        res.sentiment.neg = ParseData(res.sentiment.neg, "neg");
        console.log(res);

        setSentData(res);
      });
  });

  useEffect(() => {
    getData();
  }, []);
  const shiftSize = 7;
  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>
            {plat.charAt(0).toUpperCase() + plat.slice(1) + ":"}
          </Card.Title>
          <PieChart
            lineWidth={30}
            data={[
              {
                title: "Negative",
                value: sentData.sentiment.neg,
                color: "#DC3545",
              },
              {
                title: "Positive",
                value: sentData.sentiment.pos,
                color: "#28A745",
              },
              {
                title: "Neutral",
                value: sentData.sentiment.neu,
                color: "#007BFF",
              },
            ]}
            animate={true}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default PiGraph;
