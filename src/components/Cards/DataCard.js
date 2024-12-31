import React, { useState } from "react";

const DataCard = ({ loading, totalVolume, pnl, tradedAssets, imgSrc }) => {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left; // X coordinate relative to the card
    const y = e.clientY - rect.top; // Y coordinate relative to the card

    const tiltX = (y / rect.height - 0.5) * 20; // Vertical tilt
    const tiltY = (x / rect.width - 0.5) * -20; // Horizontal tilt

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });
  };

  console.log(tradedAssets);

  // If totalVolume is 0, display "No Data Found" for the entire card
  if (totalVolume === 0) {
    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cardMoprh px-6 py-8 w-full md:w-96 lg:w-[28rem] max-w-[90%] mx-auto flex flex-col gap-6 bg-gray-800 rounded-lg shadow-lg "
        style={tiltStyle}
      >
        <div className="  ">
          <img
            className="w-28 sm:w-24 h-auto mx-auto"
            src={imgSrc}
            alt="Asset"
          />
        </div>
        <div className="w-full h-full flex justify-center ">
          <p className="text-center text-gray-200 sm:text-sm ">No Data Found</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="cardMoprh px-6 py-8 w-full md:w-96 lg:w-[28rem] max-w-[90%] mx-auto flex flex-col gap-6 bg-gray-800 rounded-lg shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      <img className="h-auto mx-auto" src={imgSrc} alt="Asset" />
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm md:text-base text-gray-400">
              Total Volume:
            </span>
            <p className="text-lg md:text-xl text-white ">
              {totalVolume.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm md:text-base text-gray-400">
              Total PnL:
            </span>
            <p className="text-lg md:text-xl text-white ">
              {pnl.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          {tradedAssets.length !== 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-sm md:text-base text-gray-400">
                Traded Assets:
              </span>
              <p className="text-lg md:text-xl text-white ">
                {tradedAssets.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataCard;
