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
    <div className="relative">
      {/* Persistent Back Button */}
      <button
        className="absolute top-4 left-4 p-4 text-white font-semibold rounded-2xl  w-14 z-50 xl:ml-28  -mt-6 "
        onClick={handleBackClick}
      >
        <MdArrowBackIos size={32} />
      </button>

      {/* Main Content */}
      <div className="dataDiv px-4 md:px-8 lg:px-16 pt-8 md:pt-12 -m-28 ">
        {!showNewComponent ? (
          <div className="flex flex-wrap gap-6 justify-center 2xl:ml-48 2xl:w-3/4 2xl:pl-32 mt-32">
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
          <div className="flex flex-wrap gap-6 justify-center">
            <BadgeCard
              walletAddress={walletAddress}
              summaryData={summaryData}
              handleBackClick={handleBackClick}
            />
          </div>
        )}

        <div className="flex justify-center mt-6 md:mt-20 mb-20">
          {!showNewComponent ? (
            <button
              className="relative p-4 text-white font-semibold rounded-2xl bg-teal-900 -mt-16 backdrop-blur-[30px] w-40 flex justify-end items-center gap-2"
              onClick={handleNextClick}
            >
              See badges
              <FaAngleRight size={24} />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
