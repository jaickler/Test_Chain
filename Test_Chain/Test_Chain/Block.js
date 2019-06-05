class Block {
    constructor(timeStamp, lastHash, hash, data) {
        this.timeStamp = timeStamp;
        this.data = data;
        this.hash = hash;
        this.lastHash = lastHash;
    }

    toString() {
        return `Block - 
            Timestamp: ${this.timeStamp}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Current Hash: ${this.hash.substring(0, 10)}
            Data: ${this.data.substring(0, 10)}`;
    }

    static genesis() {
        return new this('Rock o Clock', '----------', 'Hash be like. nnnnnnn', [])
    }
}

module.exports = Block;