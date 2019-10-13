class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine() {
        const validTransactions = this.transactionPool.validTransactions();
        // include a reward for the miner
        // create a block with the valid transactions
        // synchronize chains in p2p server
        // clear transaction pool
        // broadcast for miners to clear transaction pool
    }
}

modu.exports = Miner;