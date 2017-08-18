/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const addEntry = Symbol('addEntry'),
    getBalance = Symbol('getBalance');

class Account {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Account;


class LedgerEntry {
    constructor(message, amount) {
        this.message = message;
        this.amount = amount;
        //ledger entries are immutable
        Object.freeze(this);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Account__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TransferMoney__ = __webpack_require__(2);



const source = new __WEBPACK_IMPORTED_MODULE_0__Account__["a" /* default */]();
source.increaseBalance(30);
const dest = new __WEBPACK_IMPORTED_MODULE_0__Account__["a" /* default */]();
dest.increaseBalance(30);
Object(__WEBPACK_IMPORTED_MODULE_1__TransferMoney__["a" /* default */])(source, dest, 10);

console.log('source balance', source.balance);
console.log('destination balance', dest.balance);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = TransferMoney;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Account__ = __webpack_require__(0);


const transfer = Symbol('transfer'),
    withdraw = Symbol('withdraw'),
    deposit = Symbol('deposit');

function TransferMoney(sourceAccount, destinationAccount, amount) {
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


/***/ })
/******/ ]);