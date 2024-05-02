/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import ABI from "./ABI.json"

interface WalletProps {
  saveState: (state: { web3: Web3, contract: any, account: string }) => void;
}

declare global {
  interface Window {
    ethereum?: any; // Adjust the type according to your usage
  }
}


const Wallet: FC<WalletProps> = ({ saveState }) => {
  const navigateTo = useNavigate();

  const connectWallet = async (): Promise<void> => {
    try {

      if (window.ethereum ) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        })
        const contractAddress = "0x588e6efef8d4a741d72669411a3c0111c0be2fca";
        const contract = new web3.eth.Contract(ABI as any [], contractAddress);
        saveState({ web3: web3, contract: contract, account: accounts[0] })
        navigateTo("/view-all-tasks")
      } else {
        throw new Error
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="wallet_header ">
        <span>WELCOME TO</span> <p>TODO 3.0</p>
      </div>
      <div className="connect_wallet_section todo_btn">
        <p> Please connect metamask wallet to access the app </p>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </>
  );
}



export default Wallet;