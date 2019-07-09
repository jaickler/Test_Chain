const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
    let transactions, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transactions = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('validates a valid transaction', () => {
        expect(Transaction.verifyTransaction(transactions)).toEqual(true);
    });

    it('invalidates an invalid transaction', () => {
        transactions.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transactions)).toEqual(false);
    });

    it('outputs the `amount` subtacted from wallet balance', () => {
        expect(transactions.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient', () => {
        expect(transactions.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });

    it('inputs the balance of the wallet', () => {
        expect(transactions.input.amount).toEqual(wallet.balance);
    });

    describe('transacting with an amount that exceeds balance', () => {
        beforeEach(() => {
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it('does not create the transaction', () => {
            expect(transaction).toEqual(undefined);
        });
    });

    describe('and updating a transaction', () => {
        let nextAmount, nextRecipient;

        beforeEach(() => {
            nextAmount = 20;
            nextRecipient = 'next-guy'
            transactions = transactions.update(wallet, nextRecipient, nextAmount);
        });

        it(`subtracts the next amount from the sender's output`, () => {
            expect(transactions.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount - nextAmount);
        });

        it(`outputs an amount for the next recipient`, () => {
            expect(transactions.outputs.find(output => output.address === nextRecipient).amount).toEqual(nextAmount);
        });
    });
});