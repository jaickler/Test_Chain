const Block = require('./Block');

// Defines the blockchain class.
class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    // Mines a block with the given data and adds it to the current chain.
    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);

        return block;
    }

    // Checks to see if the current chain is valid.
    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];
            if (block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block)) {
                return false;
            }
        }
        return true
    }

    // Replaces the current chain with a valid one of longer length.
    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log('Recieved chain is not longer than current chain.');
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log('The recieved chain is not valid.');
            return;
        }

        console.log('Replacing blockchain with recieved chain.');
        this.chain = newChain;
    }

    
}

module.exports = Blockchain;