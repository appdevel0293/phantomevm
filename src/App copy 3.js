import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

function App() {
  const provider = window.ethereum;// see "Detecting the Provider"
  const quicknodeRPCConfig = {
    chainId: '0x13881',
    chainName: 'Polygon',
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    nativeCurrency: {symbol: 'MATIC', decimals: 18},
    rpcUrls: ['https://red-multi-valley.matic-testnet.discover.quiknode.pro/61b21728fa928158390362bfe247eab7ee8c68e7/'],
  };

  if(provider){
    provider.request({
      method: 'wallet_addEthereumChain',
      params: [quicknodeRPCConfig]
    }).then(() => {
      // custom RPC added successfully
      testingphantom();
    }).catch((error) => {
      // handle error
    });
  }
   
    
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
          to: '0x75e01f1Ebd58302B5b67e67825fa6917749b5896',
          value: '0x0',
          gasLimit: '0x5028',
          gasPrice: '0x2540be400',
          type: '0x0',
          quicknodeRPCConfig,
        },
      ],
    });

    console.log(result);
  }
  

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
