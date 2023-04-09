import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

function App() {
  const provider = window.ethereum;// see "Detecting the Provider"
   
    const quicknodeRPCConfig = {
      chainId: '0x13881',
            chainName: 'Polygon',
            blockExplorerUrls: ['https://polygonscan.com'],
            nativeCurrency: {symbol: 'MATIC', decimals: 18},
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    };
  async function testingphantom () {
    

    try {
      const accounts = await provider.request({ method: "eth_requestAccounts", params:[quicknodeRPCConfig] });
      console.log(accounts[0]);
      testingtx(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }
  async function testingtx (account) {
    const result = await provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: '0x0000000000000000000000000000000000000000',
          value: '0x0',
          gasLimit: '0x5028',
          gasPrice: '0x2540be400',
          type: '0x0',
        },
      ],
    });

    console.log(result);
  }
  testingphantom();

  return (
    
    <div className="App">
      <header className="App-header">
        <p>
          Mint and Verify NFT
        </p>
      </header>
    </div>
  );
}

export default App;
