import Web3 from 'web3';
import ABI from '../ABI.json';

const web3: Web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/AhUgLdbCH0wLZ4d9dQFZ3mpgiyhqt2Kg");
const contractAddress: string = "0x588e6efef8d4a741d72669411a3c0111c0be2fca";
const contract= new web3.eth.Contract(ABI as any[], contractAddress);

export { contract };