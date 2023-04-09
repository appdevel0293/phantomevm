import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

function App() {
 /*  console.log("detectamos el provider");
  const provider = window.ethereum;// see "Detecting the Provider"
  console.log("provider:",provider);
  
  const quicknodeRPCConfig = {
    chainId: '0x13881',
    chainName: 'Polygon',
    blockExplorerUrls: ['https://polygonscan.com'],
    nativeCurrency: {symbol: 'MATIC', decimals: 18},
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  };
  
  async function testingphantom () {
    console.log("testeamos conectar con el provider");
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts", params:[quicknodeRPCConfig] });
      console.log("cuenta obtenida del provider",accounts[0]);
      testingtx(accounts[0],0);
    } catch (err) {
      console.log(err)
    }
  }

  async function changechain (account) {
    console.log("cambiamos a testnet");
    try {
      const changechainid = await provider.request({ method: "wallet_addEthereumChain", params:[quicknodeRPCConfig] });
      testingtx(account,changechainid);
    } catch (err) {
      console.log(err)
    }
  }

  async function testingtx (account,changechainid) {
    console.log("cuenta=>",account);
    console.log("chaindata=>",changechainid);
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
          chainId: '0x13881',
          chainName: 'Polygon',
          blockExplorerUrls: ['https://polygonscan.com'],
          nativeCurrency: {symbol: 'MATIC', decimals: 18},
          rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
        },
      ],
    });

    console.log(result);
  }
  
  testingphantom(); */

  const quicknodeRPCConfig = {
    chainId: '0x13881',
    chainName: 'Polygon',
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    nativeCurrency: {symbol: 'MATIC', decimals: 18},
    rpcUrls: ['https://red-multi-valley.matic-testnet.discover.quiknode.pro/61b21728fa928158390362bfe247eab7ee8c68e7/'],
  };
  const isPhantomInstalled = window?.phantom?.ethereum?.isPhantom;
  console.log(isPhantomInstalled);
  const getProvider = async () => {
    if (isPhantomInstalled) {
      console.log("inside if");
      const anyWindow = window;
      console.log("window",window);
      const provider = anyWindow.phantom?.ethereum;
      console.log("provider",provider);
     
      if (provider) {
        
        /* provider.request({
          method: 'wallet_switchEthereumChain',
          params: [quicknodeRPCConfig]
        }).then(() => {
          console.log("changeprovider=>",provider)
          return provider;
        }).catch((error) => {
          console.log(error)
        }); */
         // Request permission to access the wallet_switchEthereumChain method
         provider.request({
          method: 'eth_requestAccounts'
        }).then((accounts) => {
          // Permission granted, switch the network
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [quicknodeRPCConfig]
          }).then(() => {
            // The user has switched to the Polygon network
            // Now you can send transactions on the Polygon network
          }).catch((error) => {
            console.error(error);
          });
        }).catch((error) => {
          console.error(error);
        });
        
        
        //return provider;
      }
    }else{
      window.open('https://phantom.app/', '_blank');
    }  
   
  };
  // getProvider();
  const provider = getProvider(); // see "Detecting the Provider"
  
  
  async function sendtx(){
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      console.log(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }
  
  //sendtx();
  
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
