import './App.css';

function App() {

  //create var to save account
  var account_client = null;

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
        try {
          const accounts = await provider.request({ method: 'eth_requestAccounts' });
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [quicknodeRPCConfig]
          });
          
          //get account to Mint and Send NFT
          account_client = accounts[0];

          //send log to verify account and provider
          console.log(account_client);
          console.log(provider);

          // return the provider
          return provider;
          
        } catch (error) {
          console.error(error);
        }




        /*  provider.request({
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
             
            // return the provider
            return provider;

          }).catch((error) => {
            console.error(error);
          });

        }).catch((error) => {
          console.error(error);
        }); */
      }
    }else{

      //if phantom wallet not installed, redirect to official website
      window.open('https://phantom.app/', '_blank');
    
    }  
  };
  
  //Get provider with Polygon and Mumbai - QuickNode RPC
  const provider = getProvider();
  
  
  //Create a Tx example in Polygon Mumbai network - QuickNode RPC
  async function testingtx () {
    console.log("send tx",account_client);
    const result = await provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account_client,
          to: '0x75e01f1Ebd58302B5b67e67825fa6917749b5896',
          value: '0x0',
          gasLimit: '0x5028',
          gasPrice: '0x2540be400',
          type: '0x0',
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
