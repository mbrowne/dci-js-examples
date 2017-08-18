import Account from './Account';
import TransferMoney from './TransferMoney';

const source = new Account();
source.increaseBalance(30);
const dest = new Account();
dest.increaseBalance(30);
TransferMoney(source, dest, 10);

console.log('source balance', source.balance);
console.log('destination balance', dest.balance);