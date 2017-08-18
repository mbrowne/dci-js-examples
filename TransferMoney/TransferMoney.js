import Account from './Account';

const transfer = Symbol('transfer'),
    withdraw = Symbol('withdraw'),
    deposit = Symbol('deposit');

export default function TransferMoney(sourceAccount, destinationAccount, amount) {
    const roles = {
        banker: {
            [transfer]() {
                sourceAccount[withdraw]();
                destinationAccount[deposit]();
            }
        },

        sourceAccount: {
            [withdraw]() {
                if (this.balance < amount) {
                    throw Error('Insufficient funds');
                }
                this.decreaseBalance(amount);
            }
        },

        destinationAccount: {
            [deposit]() {
                this.increaseBalance(amount);
            }
        }
    };

    // Role binding
    const banker = {};
    Object.assign(banker, roles.banker);
    Object.assign(sourceAccount, roles.sourceAccount);
    Object.assign(destinationAccount, roles.destinationAccount);

    // Run the use case
    banker[transfer]();
}
