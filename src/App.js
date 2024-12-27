import React, { useState } from "react";
import WalletForm from "./components/WalletForm";
import HyperliquidData from "./components/HyperliquidData";
import VertexData from "./components/VertexData";
import DYDXData from "./components/DYDXData";
import Navbar from "./components/Home/Navbar";
import WrappedCircle from "./components/Home/WrappedCircle";
import Dashboard from "./components/Dashboard/Dashboard";

// 0x7A6fAE9A5930Ea178919cfC2635E5a5Dc3850075

function App() {
    const [walletAddress, setWalletAddress] = useState("0x316fc62528c317e569fe5aa4df6c1af0c4f2e678");
    const [isDashboardVisible, setIsDashboardVisible] = useState(false);
    
    const fetchData = () => {
        if (!walletAddress) {
            alert("Please enter a wallet address!");
        }

        // setIsDashboardVisible(true);
    };

    return (
        <div className="text-white flex flex-col h-lvh">
            <img className="fixed w-lvw h-lvh z-[-10]" src='/wrapped_bg.png' />
            <Navbar />
            { walletAddress ? (
                <Dashboard walletAddress={walletAddress} />
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
