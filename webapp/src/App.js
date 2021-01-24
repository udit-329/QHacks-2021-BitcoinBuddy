import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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
        <Row>
          <PiGraph plat="reddit" coin="bitcoin" />
          <PiGraph plat="news" coin="bitcoin" />
        </Row>
        <CryptoColumn symbol="BTC" />
      </Container>
    </div>
  );
}

export default App;
