import React from "react";
import "./App.css";

import TopBanner from "./components/TopBanner";
import CryptoCard from "./components/CryptoCard";
import CryptoColumn from "./components/CryptoColumn";
import CryptoGraph from "./components/CryptoGraph";

function App() {
  return (
    <div className="App">
      <TopBanner symbol="BTC"/>
      <CryptoCard symbol="BTC" />
      <CryptoColumn symbol="BTC" />
    </div>
  );
}

export default App;
