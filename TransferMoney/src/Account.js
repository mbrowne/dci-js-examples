const addEntry = Symbol('addEntry'),
    getBalance = Symbol('getBalance');

export default class Account {
    constructor(ledgers) {
        const roles = {
            ledgers: {
                [addEntry](message, amount) {
                    ledgers.push(new LedgerEntry(message, amount));
                },

                [getBalance]() {
                    return ledgers.reduce((sum, ledger) => (
                        sum + ledger.amount
                    ), 0);
                }
            }
        };

        if (!ledgers) ledgers = [];
        this.ledgers = ledgers;

        //role binding
        Object.assign(ledgers, roles.ledgers);
    }
    
    increaseBalance(amount) {
        this.ledgers[addEntry]('depositing', amount);
    }
    
    decreaseBalance(amount) {
        this.ledgers[addEntry]('withdrawing', 0 - amount);
    }
    
    get balance() {
        return this.ledgers[getBalance]();
    }
}

class LedgerEntry {
    constructor(message, amount) {
        this.message = message;
        this.amount = amount;
        //ledger entries are immutable
        Object.freeze(this);
    }
}