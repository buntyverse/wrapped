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
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

// 0x316fc62528c317e569fe5aa4df6c1af0c4f2e678

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);

  const { address: connectedWalletAddress, isConnected } = useAccount();

  const addressToPass = connectedWalletAddress || walletAddress;

  const fetchData = () => {
    if (!walletAddress) {
      alert("Please enter a wallet address!");
    }

    setIsDashboardVisible(true);
  };

  const handleBackButtonClick = () => {
    // Reset the wallet address and visibility
    setWalletAddress("");
    setIsDashboardVisible(false);
  };

  return (
    <div className="text-white flex flex-col h-lvh">
      <img className="fixed w-lvw h-lvh z-[-10]" src="/wrapped_bg.png" />

      <Navbar />
      {/* 
      {connectedWalletAddress || (isDashboardVisible && walletAddress) ? (
       
      ) : (
        <></>
      )} */}

      {/* Conditional rendering of the Dashboard or the Wallet connection screen */}
      {connectedWalletAddress || (isDashboardVisible && walletAddress) ? (
        <>
          <Dashboard
            walletAddress={addressToPass}
            handleBackButtonClick={handleBackButtonClick}
          />
          {/* {(connectedWalletAddress || walletAddress) && (
            <button
              onClick={handleBackButtonClick}
              className="bg-gradient-to-b from-teal-400 to-teal-950  text-white font-bold py-2 px-4 rounded-lg border-2 w-32"
            >
              Back
            </button>
          )} */}
        </>
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
