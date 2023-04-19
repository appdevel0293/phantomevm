import './App.css';
import Web3 from 'web3';

//nuevos import
import ABI from "./abicontract.json";


function App() {

  //create var to save account
  var clientAccount = null;

  //nuevo
  //Direccion del contrato
  const CONTRACT_ADDRESS = "0x858e3b7252Bb8Fc8e635E44BD8e362c627cD71bC";
  var tmpContractNFT = null;

  

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
          clientAccount = accounts[0];

          // Permission granted, switch the network to Polygon Mumbai
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [quicknodeRPCConfig]
          }).then(() => {
            
            //send log to verify account and provider
            console.log(clientAccount);
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
    console.log("send tx",clientAccount);
    console.log("phantomprovider=>",phantomProviderEVM);
    let web3 = new Web3(phantomProviderEVM); 
    const result = await phantomProviderEVM.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: clientAccount,
          to: '0x75e01f1Ebd58302B5b67e67825fa6917749b5896',
          value: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
          gasLimit: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
          gasPrice: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
        },
      ],
    });

    //log to see tx result
    console.log("result_tx=>",result);
  }

  //nuevo
  async function getInstanceContract () {
    
    if(!tmpContractNFT){
      let web3 = new Web3(phantomProviderEVM); 
      // Crea una instancia del contrato ERC1155 utilizando la biblioteca web3.js
      const contract = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      tmpContractNFT = contract;
      
    }
    return tmpContractNFT;

  }
  
  async function getTokenIDtoMint(contractNFT ) {

      const result = await contractNFT.methods.getNextIdtoMint(0).call();
      console.log(result);
      return result;
    
  }

  async function isMinter(contractNFT, clientAccount) {

    const result = await contractNFT.methods.isMinter(0, clientAccount).call();
    console.log("Ha minteado? ", result);
    return result;

  }
  
  

  ///nuevo
  async function mintERC1155 () {
    let contractNFT = await getInstanceContract();
    let web3 = new Web3(phantomProviderEVM);

    try {

      let isMinter = await isMinter(contractNFT, clientAccount);
      if(isMinter){
        alert("Esta cartera ya ha minteado");
        return;
      }

      let nextTokenId = await getTokenIDtoMint(contractNFT);
      console.log("tokenmint",nextTokenId);
      if (nextTokenId===0){

        alert("No hay entradas disponibles");
        
      } else {

        let tokenNameTmp;
          if(nextTokenId===10){
            tokenNameTmp = "NFTPASS_QUICKNODEPARTY_10";
          }else{
            tokenNameTmp = "NFTPASS_QUICKNODEPARTY_0"+nextTokenId;
          }
          console.log("este es el nombre del nft para hacer mint",tokenNameTmp);
          console.log("send tx",clientAccount);
          console.log("phantomprovider=>",phantomProviderEVM);
          
          let data = contractNFT.methods.mintERC1155(0, tokenNameTmp, 1).encodeABI();

          let paramsToTx ={
            from: clientAccount,
            to: CONTRACT_ADDRESS,
            gasLimit: web3.utils.toHex(600000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('3', 'gwei')),
            data: data,
          }
          console.log("parametros",paramsToTx);

          const result = await phantomProviderEVM.request({
            method: 'eth_sendTransaction',
            params: [paramsToTx],
          });
    
        //log to see tx result
        console.log("result_tx=> ",result);
        
      }
    } catch (error) {
      console.error(error);
    }
    
  };


  async function  isVerified () {
    let contractNFT = getInstanceContract();
    const data = await contractNFT.methods.getVerified(0,2).call().then((d)=>{
      console.log(`isVerified: ${d}`);
    });
  };

  return (
    
    <div className="App">
      <header className="App-header">
        <p>
          Mint and Verify NFT
        </p>
        <button onClick={testingtx} >Send TX </button>
        <button onClick={mintERC1155} >Mint </button>
        <button onClick={isVerified} >Test Verify </button>
      </header>
    </div>
  );
}

export default App;
