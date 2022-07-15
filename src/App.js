
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';

import './App.css';
import React,{ useState, useEffect } from 'react';

function App() {

  const [isCryptoFilterOpen, setCryptoFilterOpen] = useState(false);
  const [isCoinsFilterOpen, setCoinsFilterOpen] = useState(false);
  const [data, setData] = useState({});
  const [crypto, setCrypto] = useState(["BTC", "ETH", "BNB", "ADA", "XRP", "DOGE", "DOT", "UNI", "SOL"]);
  const [coins, setCoins] = useState(["EUR", "USD", "ILS"]);
  const [cryptoInput, setCryptoInput] = useState("");
  const [coinInput, setCoinInput] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getData = async () => {
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${crypto}&tsyms=${coins}`;
    const response = await fetch(url, {
      headers: {
        "content-type": "application/json",
      },
      method: 'get'

    });
    const da = await response.json();
    setData(da);

  }

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000)

  })
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Karam
    </Tooltip>
  );

  const checkCoin = async () => {
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${crypto}&tsyms=${coinInput}`;
    const response = await fetch(url, {
      headers: {
        "content-type": "application/json",
      },
      method: 'get'

    });
    const da = await response.json();
    if (!da.Response) {
      setCoins(array => [...array, coinInput.toUpperCase()]);
      getData();
      setCoinInput("")
    } else {
      setMessage("Please enter a correct coin name");
      setShowModal(true)
    }
  };
  const checkCrypto = async () => {
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoInput}&tsyms=${coins}`;
    const response = await fetch(url, {
      headers: {
        "content-type": "application/json",
      },
      method: 'get'

    });
    const da = await response.json();
    if (!da.Response) {
      setCrypto(array => [...array, cryptoInput.toUpperCase()]);
      getData();
      setCryptoInput("")
    } else {
      setMessage("Please enter a correct cryptocurrency name");
      setShowModal(true)
    }
  };

  const addCrypto = (event) => {
    if (event.key === 'Enter') {
      if (!crypto.includes(cryptoInput.toUpperCase())) {
        checkCrypto();
      } else {
        setMessage("The coin is already exist");
        setShowModal(true)
      }
    }
  }
  const addCoin = (event) => {
    if (event.key === 'Enter') {
      if (!coins.includes(coinInput.toUpperCase())) {
        checkCoin();
      } else {
        setMessage("The coin is already exist");
        setShowModal(true)
      }
    }
  }
  const RemoveCryptocurrency = (name) => {
    if (crypto.length > 1) {
      setCrypto(crypto.filter(c => c !== name));
    } else {
      setMessage("The list can't be empty");
      setShowModal(true)
    }
  }
  const RemoveCoin = (name) => {
    if (coins.length > 1) {
      setCoins(coins.filter(c => c !== name));
    } else {
      setMessage("The list can't be empty");
      setShowModal(true)
    }
  }
  return (
    <div className="App">
      <div className="title">
        <Card className="mb-2 p-2">
          <Card.Title className="d-flex justify-content-center py-1">Cryptocurrency Now</Card.Title>
          <Card.Text className="d-flex justify-content-center">
            Simple app to see cryptocurrency prices live
          </Card.Text>
          <div className="MadeCon p-1">
            <h6 className=" d-flex align-items-center">Made With 💖 By</h6>
            <a href="https://github.com/karamalmlahe" target="_blank" rel="noreferrer">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Image src="https://xkaram.com/static/media/me.f22845fd59b05245cd87.png" className="Image" rounded />
              </OverlayTrigger>
            </a>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Button className="my-2 w-100 btn-secondary"
                aria-controls="example-collapse-text"
                aria-expanded={isCryptoFilterOpen}
                onClick={() => setCryptoFilterOpen(!isCryptoFilterOpen)}
              >Cryptocurrency Filter ⚙️</Button>
              <Collapse in={isCryptoFilterOpen} dimension="height" className="p-3">
                <Card>
                  <h5 className="card-text">Cryptocurrency Filter ⚙️ :</h5>
                  <input
                    className="form-control"
                    type="text"
                    value={cryptoInput}
                    onChange={e => setCryptoInput(e.target.value)}
                    onKeyDown={addCrypto}
                    placeholder="Enter a cryptocurrency name"
                  />
                  <ListGroup className="my-1">
                    {
                      crypto.map((cryp, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">{cryp}
                          <Button
                            variant="link"
                            onClick={() => RemoveCryptocurrency(cryp)}
                          >Remove</Button
                          ></ListGroup.Item>
                      ))
                    }

                  </ListGroup>
                </Card>
              </Collapse>
            </div>

            <div className="col-md-6">
              <Button className="my-2 w-100 btn-secondary"
                aria-controls="example-collapse-text"
                aria-expanded={isCoinsFilterOpen}
                onClick={() => setCoinsFilterOpen(!isCoinsFilterOpen)}
              >Cryptocurrency Filter ⚙️</Button>
              <Collapse in={isCoinsFilterOpen} dimension="height" className="p-3">
                <Card>
                  <h5 className="card-text">Cryptocurrency Filter ⚙️ :</h5>
                  <input
                    className="form-control"
                    type="text"
                    value={coinInput}
                    onChange={e => setCoinInput(e.target.value)}
                    onKeyDown={addCoin}
                    placeholder="Enter a cryptocurrency name"
                  />
                  <ListGroup className="my-1">
                    {
                      coins.map((coin, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">{coin}
                          <Button
                            variant="link"
                            onClick={() => RemoveCoin(coin)}
                          >Remove</Button
                          ></ListGroup.Item>
                      ))
                    }

                  </ListGroup>
                </Card>
              </Collapse>
            </div>
          </div>
        </Card>
      </div >
      <div className="coins">
        <Card className="my-5 p-3">
          <h5>On Live 🔴 | Refresh every 1 second</h5>
          <div className="row d-flex justify-content-around">
            {
              Object.keys(data).map((key, index) => (
                <Card
                  key={index}
                  className="col-xl-3 col-sm-5 hover my-2 mx-1 p-1"
                >
                  <Card.Title className="d-flex justify-content-center pt-2">{key}</Card.Title>
                  <hr id="line" />
                  {
                    Object.keys(data[key]).map((key2, index2) => (
                      <div
                        key={index2}
                        className="d-flex justify-content-center">
                        <p>{key2 + " : " + data[key][key2]}</p>
                      </div>
                    ))
                  }
                </Card>
              ))
            }
          </div>
        </Card>
      </div >
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div className="p-2 text-center">
          <h5>{message}</h5>

          <Button className="mt-3 bg-warning w-100" onClick={() => setShowModal(false)}>OK</Button>
        </div>
      </Modal>
    </div >


  );
}

export default App;
