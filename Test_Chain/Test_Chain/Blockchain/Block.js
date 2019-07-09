const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');

// Defines the block class
class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
        this.lastHash = lastHash;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    
    toString() {
        return `Block - 
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Current Hash: ${this.hash.substring(0, 10)}
            Nonce: ${this.nonce}
            Difficulty: ${this.difficulty}
            Data: ${this.data.substring(0, 10)}`;
    }

    // Creates the genesis block for this chain type.
    static genesis() {
        return new this('Rock o Clock', '----------', 'Hash be like. nnnnnnn', [], 0, DIFFICULTY)
    }


    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;


        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    // Retrieves the hash of a given block.
    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;