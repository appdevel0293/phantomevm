import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

function App() {
  
  // URL of your custom RPC endpoint
  const customRpcEndpoint = 'https://red-multi-valley.matic-testnet.discover.quiknode.pro/61b21728fa928158390362bfe247eab7ee8c68e7/';
  
  // Create a Web3Provider instance using the custom RPC endpoint
  const provider = new Web3Provider(new ethers.providers.JsonRpcProvider(customRpcEndpoint));
  
  // Use the provider to send transactions
  const accounts = await provider.listAccounts();
  const result = await provider.send('eth_sendTransaction', [
    {
      from: accounts[0],
      to: '0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb',
      value: '0x0',
      gasLimit: '0x5028',
      gasPrice: '0x2540be400',
      type: '0x0',
    },
  ]);
  
  console.log(result);
  
  
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
