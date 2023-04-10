import './App.css';
import Web3 from 'web3';

function App() {

  //create var to save account
  var account_client = null;

  //var web3 = null; 

  //Get provider with Polygon and Mumbai - QuickNode RPC
  var phantomProviderEVM = null;

  //create const to set provider, chain and RPC
  const quicknodeRPCConfig = {
    chainId: '0x13881',
    chainName: 'Polygon',
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    nativeCurrency: {symbol: 'MATIC', decimals: 18},
    rpcUrls: ['https://red-multi-valley.matic-testnet.discover.quiknode.pro/61b21728fa928158390362bfe247eab7ee8c68e7/'],
  };

  //Verify if phantom exist
  const isPhantomInstalled = window?.phantom?.ethereum?.isPhantom;
  console.log(isPhantomInstalled);


  //async function to get provider and change chain and RPC
  const getProvider = async () => {
    
    //if phantom wallet exist
    if (isPhantomInstalled) {
      
      const anyWindow = window;
      const provider = anyWindow.phantom?.ethereum;
      
     
      if (provider) {
         provider.request({
          method: 'eth_requestAccounts'
        }).then((accounts) => {
          
          //get account to Mint and Send NFT
          account_client = accounts[0];

          // Permission granted, switch the network to Polygon Mumbai
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [quicknodeRPCConfig]
          }).then(() => {
            
            //send log to verify account and provider
            console.log(account_client);
            console.log(provider);

            if(phantomProviderEVM===null){
              phantomProviderEVM = provider;
             // web3 = new Web3(phantomProviderEVM);
              console.log("asignProvider",phantomProviderEVM);
            }
            
            // return the provider
            //return provider;

          }).catch((error) => {
            console.error(error);
          });

        }).catch((error) => {
          console.error(error);
        });
      }
    }else{

      //if phantom wallet not installed, redirect to official website
      window.open('https://phantom.app/', '_blank');
    
    }  
  };
  
  //Get provider with Polygon and Mumbai - QuickNode RPC
  getProvider();
  
  
  //Create a Tx example in Polygon Mumbai network - QuickNode RPC
  async function testingtx () {
    console.log("send tx",account_client);
    console.log("phantomprovider=>",phantomProviderEVM);
    let web3 = new Web3(phantomProviderEVM); 
    const result = await phantomProviderEVM.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account_client,
          to: '0x75e01f1Ebd58302B5b67e67825fa6917749b5896',
          value: web3.utils.toHex(web3.utils.toWei('3', 'gwei')),
          gasLimit: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
          gasPrice: web3.utils.toHex(web3.utils.toWei('3', 'gwei')),
        },
      ],
    });

    //log to see tx result
    console.log("result_tx=>",result);
  }

  return (
    
    <div className="App">
      <header className="App-header">
        <p>
          Mint and Verify NFT
        </p>
        <button onClick={testingtx} >Send TX </button>
      </header>
    </div>
  );
}

export default App;
