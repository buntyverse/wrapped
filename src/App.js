import React, { useState } from "react";
import WalletForm from "./components/WalletForm";
import HyperliquidData from "./components/HyperliquidData";
import VertexData from "./components/VertexData";
import DYDXData from "./components/DYDXData";
import Navbar from "./components/Home/Navbar";
import WrappedCircle from "./components/Home/WrappedCircle";
import Dashboard from "./components/Dashboard/Dashboard";
import { Wallet } from "./components/Providers/Wallet";
import { useAccount } from "wagmi";

// 0x316fc62528c317e569fe5aa4df6c1af0c4f2e678

function App() {
    const [walletAddress, setWalletAddress] = useState("");
    const [isDashboardVisible, setIsDashboardVisible] = useState(false);
    
    const fetchData = () => {
        if (!walletAddress) {
            alert("Please enter a wallet address!");
        }

        setIsDashboardVisible(true);
    };

    const { address: connectedWalletAddress } = useAccount();

     const addressToPass = connectedWalletAddress || walletAddress;

    return (
    
            <div className="text-white flex flex-col h-lvh">
                  <img className="fixed w-lvw h-lvh z-[-10]" src='/wrapped_bg.png' />
                  <Navbar />
                  {connectedWalletAddress || (isDashboardVisible && walletAddress) ? (
                      <Dashboard walletAddress={addressToPass} />
                  ) : (
                      <div className="connectWalletDiv flex-1 flex justify-center items-center">
                              <WrappedCircle
                               walletAddress={walletAddress}
                                  setWalletAddress={setWalletAddress}
                                   fetchData={fetchData}
                              />
                      </div>
                  )}
              </div>
   
  
    );
}

export default App;
