import React, { useState } from "react";
import WalletForm from "./components/WalletForm";
import HyperliquidData from "./components/HyperliquidData";
import VertexData from "./components/VertexData";
import DYDXData from "./components/DYDXData";


function App() {
    const [walletAddress, setWalletAddress] = useState("");

    const fetchData = () => {
        if (!walletAddress) {
            alert("Please enter a wallet address!");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Trading Dashboard</h1>
            <WalletForm
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                fetchData={fetchData}
            />
            <div style={{ marginTop: "20px" }}>
                {walletAddress && <HyperliquidData walletAddress={walletAddress} />}
                {walletAddress && <VertexData walletAddress={walletAddress} />}
                <DYDXData walletAddress={walletAddress} />
                
               

            </div>
        </div>
    );
}

export default App;
