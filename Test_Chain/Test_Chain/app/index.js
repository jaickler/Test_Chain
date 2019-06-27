const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
// Initializes an instance of the application and a blockchain.
const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

// Makes sure the app sends info in json format.
app.use(bodyParser.json());

// Create interface to recieve a list of blocks in the chain.
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

// Crate an interface to mine a new block with the sent data.
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    p2pServer.syncChains();

    res.redirect('/blocks');
});

// Creates a listener for the application.
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();