import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

// Bootstrap and CSS
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import "./App.css";

// Components
import TopBanner from "./components/TopBanner";
import CryptoCard from "./components/CryptoCard";
import CryptoColumn from "./components/CryptoColumn";
import CryptoColumnTwo from "./components/CryptoColumn2";
import PiGraph from "./components/PiGraph";

// Coin List
import CoinDict from "./utils/CoinDict";

function App() {
  return (
    <div className="App">
      <Router>
        <TopBanner />

        <Switch>
          <Route path="/:id" children={<Ch />} />
          <Route path="/" children={<UrBasic />} />
        </Switch>
      </Router>
    </div>
  );
}

function Ch() {
  let { id } = useParams();
  return (
    <Container>
      <CryptoCard symbol={id} />
      <Row>
        <PiGraph plat="reddit" coin={CoinDict[id][0]} />
        <PiGraph plat="news" coin={CoinDict[id][0]} />
        <CryptoColumn symbol={id} />
      </Row>
      <Row>
        <CryptoColumnTwo symbol={id} />
        <Card className="graphcard">
          <div>
            <iframe
              src={
                "https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=" +
                CoinDict[id][1] +
                "&pref_coin_id=1505"
              }
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
  );
}

function UrBasic() {
  console.log("Ur Basic");
  return (
    <Container>
      <Card className="LinkList" style={{ "min-width": "100%" }}>
        <Card.Body>
          <Card.Title>Cryptocurrencies:</Card.Title>
          <ListGroup>
            <ListGroupItem>
            <a href="BTC"> Bitcoin</a>
            </ListGroupItem>
            <ListGroupItem>
            <a href="ETH"> Ethereum</a>
            </ListGroupItem>
            <ListGroupItem>
            <a href="LTC"> Litecoin</a>
            </ListGroupItem>
            <ListGroupItem>
            <a href="XRP"> Ripple</a>
            </ListGroupItem>
            <ListGroupItem>
            <a href="ADA"> Cardano</a>
            </ListGroupItem>
            <ListGroupItem>
            <a href="LINK"> ChainLink</a>
            </ListGroupItem>
            <ListGroupItem>
            <a href="XMR"> Monero</a>
            </ListGroupItem>
            <ListGroupItem>
            <a href="USDT"> Tether</a>
            </ListGroupItem>
            <ListGroupItem>
            <a href="VET"> VeChain</a>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
