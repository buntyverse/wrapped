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

  // If totalVolume is 0, display "No Data Found" for the entire card
  if (totalVolume === 0) {
    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sm:w-full md:w-[524px] sm:px-4 sm:py-6"
      >
        <div className="cardMoprh px-[29px] py-[33px] w-full flex flex-col gap-6 sm:px-4 sm:py-6">
          <img
            className="w-[139.5px] max-w-28 h-auto sm:w-[100px] mx-auto"
            src={imgSrc}
            alt="Asset"
          />
          <p className="text-center sm:text-sm">No Data Found</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="cardMoprh px-[29px] py-[33px] w-[524px] flex flex-col gap-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img className="w-[139.5px] h-auto" src={imgSrc} alt="Asset" />
      {loading && <p>Loading...</p>}
      {!loading ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[18px] leading-[22px] text-[#9CA3AF]">
              {" "}
              Total Volume:
            </span>
            <p className="text-[30px] text-white leading-[36px]">
              {totalVolume}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[18px] leading-[22px] text-[#9CA3AF]">
              {" "}
              Total PnL:
            </span>
            <p className="text-[30px] text-white leading-[36px]">{pnl}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[18px] leading-[22px] text-[#9CA3AF]">
              {" "}
              Traded Assets:
            </span>
            <p className="text-[30px] text-white leading-[36px]">
              {tradedAssets.join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <div>{!loading ? "No data" : ""}</div>
      )}
    </div>
  );
};

export default DataCard;
