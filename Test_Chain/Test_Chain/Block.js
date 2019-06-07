const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
        this.lastHash = lastHash;
    }

    toString() {
        return `Block - 
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Current Hash: ${this.hash.substring(0, 10)}
            Data: ${this.data.substring(0, 10)}`;
    }

    static genesis() {
        return new this('Rock o Clock', '----------', 'Hash be like. nnnnnnn', [])
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = Block;