import React, { useCallback, useState, useEffect } from "react";
import firebase from "../utils/Firebase";
import "firebase/firestore";
const firestore = firebase.firestore();

function PiGraph({ plat, coin }) {
  const [data, setData] = useState({});
  const getData = useCallback(() => {
    console.log(coin);
    firestore
      .collection(plat)
      .doc(coin)
      .get()
      .then((doc) => {
        return doc.data();
      });
  });

  useEffect(() => {
    setData(getData());
  }, [getData, setData]);
  return (
    <div>
      <div></div>
    </div>
  );
}

export default PiGraph;
