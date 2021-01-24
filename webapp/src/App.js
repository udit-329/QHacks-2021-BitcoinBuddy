import React from "react";
import './App.css';

import CryptoCard from "./components/CryptoCard"

function App() {
  return (
    <div className="App">
      <CryptoCard symbol='BTC'/>
    </div>
  );
}

export default App;
