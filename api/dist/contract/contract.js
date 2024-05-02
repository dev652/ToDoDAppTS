"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = void 0;
const web3_1 = __importDefault(require("web3"));
const ABI_json_1 = __importDefault(require("../ABI.json"));
const web3 = new web3_1.default("https://eth-sepolia.g.alchemy.com/v2/AhUgLdbCH0wLZ4d9dQFZ3mpgiyhqt2Kg");
const contractAddress = "0x588e6efef8d4a741d72669411a3c0111c0be2fca";
const contract = new web3.eth.Contract(ABI_json_1.default, contractAddress);
exports.contract = contract;
//# sourceMappingURL=contract.js.map