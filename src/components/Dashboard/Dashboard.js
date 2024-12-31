import React, { useState } from "react";
import HyperliquidData from "../HyperliquidData";
import VertexData from "../VertexData";
import DYDXData from "../DYDXData";
import "./Dashboard.css";
import BadgeCard from "../Cards/SummaryCard";
import { FaAngleRight } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";

const Dashboard = ({ walletAddress, handleBackButtonClick }) => {
  const [showNewComponent, setShowNewComponent] = useState(false);

  const [summaryData, setSummaryData] = useState({
    totalVolume: 0,
    totalPnL: 0,
    totalAssetsTraded: 0,
    dexChecked: [],
  });

  const updateTotals = (volume, pnl, dex) => {
    setSummaryData((prevTotals) => {
      if (prevTotals.dexChecked.includes(dex)) {
        return prevTotals;
      }
      return {
        totalVolume: prevTotals.totalVolume + volume,
        totalPnL: prevTotals.totalPnL + pnl,
        dexChecked: [...prevTotals.dexChecked, dex],
      };
    });
  };

  const handleNextClick = () => {
    setShowNewComponent(true);
  };

  const handleBackClick = () => {
    if (showNewComponent) {
      setShowNewComponent(false);
    } else {
      handleBackButtonClick();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Persistent Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        <MdArrowBackIos size={24} />
        <p>Back</p>
      </button>

      {/* Main Content */}
      <div className="data-container">
        {!showNewComponent ? (
          <div className="data-section">
            {walletAddress && (
              <HyperliquidData
                walletAddress={walletAddress}
                updateTotals={updateTotals}
              />
            )}
            {walletAddress && (
              <VertexData
                walletAddress={walletAddress}
                updateTotals={updateTotals}
              />
            )}
            {walletAddress && (
              <DYDXData
                walletAddress={walletAddress}
                updateTotals={updateTotals}
              />
            )}
          </div>
        ) : (
          <div className="badge-section">
            <BadgeCard
              walletAddress={walletAddress}
              summaryData={summaryData}
              handleBackClick={handleBackClick}
            />
          </div>
        )}
        <div className="next-button-container">
          {!showNewComponent ? (
            <button className="next-button" onClick={handleNextClick}>
              See badges
              <FaAngleRight size={24} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
