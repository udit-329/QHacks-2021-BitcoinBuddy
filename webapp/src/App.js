import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
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
          <CryptoColumn symbol="BTC" />
        </Row>
        <Row>
          <Card className="graphcard">
            <div >
              <iframe
                src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505"
                width="100%"
                height="520px"
                marginwidth="0"
                marginheight="0"
                frameborder="none"
                border="none"
                scrolling="no"

              ></iframe>
            </div>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
