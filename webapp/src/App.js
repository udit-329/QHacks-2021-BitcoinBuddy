import React from "react";
import Container from "react-bootstrap/Container";
import "./App.css";

// Components
import TopBanner from "./components/TopBanner";
import CryptoCard from "./components/CryptoCard";
import CryptoColumn from "./components/CryptoColumn";
import PiGraph from "./components/PiGraph";
import CryptoGraph from "./components/CryptoGraph";

function App() {
  return (
    <div className="App">
      <TopBanner symbol="BTC" />
      <Container>
        <CryptoCard symbol="BTC" />
        <CryptoColumn symbol="BTC" />
      </Container>

      <PiGraph plat="reddit" coin="bitcoin"/>
    </div>
  );
}

export default App;
