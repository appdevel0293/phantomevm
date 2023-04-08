import logo from './logo.svg';
import './App.css';
import { Web3Provider } from "@ethersproject/providers";
import * as ethers from "ethers";

function App() {
  //window.phantom.ethereum
/*   const isPhantomInstalled = window.phantom?.solana?.isPhantom;
  console.log("phantominstalled",isPhantomInstalled);
  console.log("phantometh",window.ethereum);
  const getProvider = async () => {
    if ("solana" in window) {
        await window.ethereum.connect();
        const provider = window.ethereum;

        if (provider.isPhantom) {
            return provider;
        }

    } else {
        //window.open("https://phantom.app/", "_blank");
    }
} */

  async function testingphantom () {
    const provider = window.ethereum;// see "Detecting the Provider"
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      console.log(accounts[0]);
      // 0x534583cd8cE0ac1af4Ce01Ae4f294d52b4Cd305F
    } catch (err) {
      console.log(err)
    // { code: 4001, message: 'User rejected the request.' }
    }
  }
  testingphantom();
  /* window.onload = () => {

            getProvider().then(provider => {
                ////!('key', provider.publicKey.toString())
                ////!('esta conectado')
                //walletConnect
                this.setState({
                    walletConnect: true
                })
                global.config.datawallet = window.solana;

            })
                .catch(function (error) {
                    ////!(error)
                    ////!('esta desconectado')
                    //walletConnect
                    //this.state.walletConnect = false;
                    this.setState({
                        walletConnect: false
                    })
                }
                )

            ////!(localStorage.userEmail);
            if (localStorage.userEmail) {
                this.setState({
                    viewLoginOrNot: true
                })
            }

        } */
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
