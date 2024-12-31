import { copyImageToClipboard } from "copy-image-clipboard";
import React, { useEffect, useState } from "react";
import { CardStepper } from "./Profile";
import hello2Image from "../assets/hlLoyal.png";
import explorer from "../assets/explorer.png";
import tenMil from "../assets/10mVol.png";
import fiveMil from "../assets/5mVol.png";
import oneMilVol from "../assets/1milVol.png";
import dydx from "../assets/dydx.png";
import tenkPnL from "../assets/10kPnL.png";
import hundredkPnL from "../assets/100kPnL.png";
import fiftykPnL from "../assets/50kPnL.png";
import fiveHPnL from "../assets/500kPnL1.png";
import oneMilPnL from "../assets/1milPnL.png";
import newbie from "../assets/newbie.png";
import { FaXTwitter } from "react-icons/fa6";

const BadgeCard = ({ walletAddress, summaryData, handleBackClick }) => {
  const [copied, setCopied] = useState(false);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCopyImage = async (imageUrl) => {
    try {
      await copyImageToClipboard(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Error copying to clipboard:", e);
    }
  };

  const handleTweet = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=Just%20checked%20out%20my%20journey%20with%20perpetuals%20so%20far%20on%20Filament%20Wrapped%20%F0%9F%93%88%20%20check%20yours%20here%3A%20wrapped.filament.finance`;
    window.open(tweetUrl, "_blank");
  };

  const downloadImage = async (imageSrc, imageName) => {
    try {
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  useEffect(() => {
    setLoading(true);

    const newBadges = [];

    if (summaryData?.totalVolume) {
      if (summaryData.totalVolume >= 10000000) {
        newBadges.push({
          name: "Market Maker",
          imageUrl: tenMil,
          type: "volume",
          description:
            "Dominating the markets with over $10M in trading volume.",
          totalVolume: summaryData.totalVolume,
        });
      } else if (summaryData.totalVolume >= 5000000) {
        newBadges.push({
          name: "The Whale",
          imageUrl: fiveMil,
          type: "volume",
          description: "Master of trades, total volume exceeding $5M.",
          totalVolume: summaryData.totalVolume,
        });
      } else if (summaryData.totalVolume >= 1000000) {
        newBadges.push({
          name: "Big Shot",
          imageUrl: oneMilVol,
          type: "volume",
          description:
            "Breaking into the big leagues with over $2M in trading volume.",
          totalVolume: summaryData.totalVolume,
        });
      }
    }

    if (summaryData?.totalPnL) {
      if (summaryData.totalPnL >= 1000000) {
        newBadges.push({
          name: "Oligarch",
          imageUrl: oneMilPnL,
          type: "pnl",
          description: "The crème de la crème, earning over $1M in profits.",
          totalPnL: summaryData.totalPnL,
        });
      } else if (summaryData.totalPnL >= 500000) {
        newBadges.push({
          name: "Baller",
          imageUrl: fiveHPnL,
          type: "pnl",
          description: "Earning over $500k in profits.",
          totalPnL: summaryData.totalPnL,
        });
      } else if (summaryData.totalPnL >= 100000) {
        newBadges.push({
          name: "Veteran",
          imageUrl: hundredkPnL,
          type: "pnl",
          description: "Trading prowess with over $100k in profits.",
          totalPnL: summaryData.totalPnL,
        });
      } else if (summaryData.totalPnL >= 50000) {
        newBadges.push({
          name: "Veteran",
          imageUrl: fiftykPnL,
          type: "pnl",
          description: "Trading prowess with over $100k in profits.",
          totalPnL: summaryData.totalPnL,
        });
      } else if (summaryData.totalPnL >= 10000) {
        newBadges.push({
          name: "Fresh Money",
          imageUrl: tenkPnL,
          type: "pnl",
          description: "Achieved $10k+ in realized profits.",
          totalPnL: summaryData.totalPnL,
        });
      }
    }

    if (
      summaryData?.dexChecked.includes("hyperliquid") &&
      summaryData.dexChecked.includes("dydx") &&
      summaryData.dexChecked.includes("vertex")
    ) {
      newBadges.push({
        name: "Explorer Badge",
        imageUrl: explorer,
        description: "Conquered Vertex, Hyperliquid, and DYDX.",
      });
    } else if (
      summaryData.dexChecked.includes("hyperliquid") &&
      !summaryData.dexChecked.includes("dydx") &&
      !summaryData.dexChecked.includes("vertex")
    ) {
      newBadges.push({
        name: "HL Maximalist",
        imageUrl: hello2Image,
        description: "Dedicated solely to the Hyperliquid ecosystem.",
      });
    } else if (summaryData.dexChecked.length >= 2) {
      newBadges.push({
        name: "Perp Explorer",
        imageUrl: explorer,
        description: "Adventurer conquering multiple platforms.",
      });
    } else if (summaryData.dexChecked.includes("dydx")) {
      newBadges.push({
        name: "DYDX Hedgie",
        imageUrl: dydx,
        description: "Trading exclusively on DYDX.",
      });
    } else {
      newBadges.push({
        name: "Fresh Trader",
        imageUrl: newbie,
        description: "Starting your journey in the world of perpetuals.",
      });
    }

    if (
      !newBadges.some(
        (badge) => badge.type === "volume" || badge.type === "pnl"
      )
    ) {
      newBadges.push({
        name: "Fresh Trader",
        imageUrl: newbie,
        description: "Starting your journey in the world of perpetuals.",
      });
    }

    setBadges(newBadges);
    setLoading(false);
  }, [summaryData]);

  return (
    <div className=" p-8 flex flex-col items-center rounded-xl  overflow-auto">
      <div className="flex flex-col items-center max-w-full">
        {!loading && badges.length > 0 ? (
          <CardStepper
            badges={badges}
            handleCopyImage={handleCopyImage}
            downloadImage={downloadImage}
          />
        ) : (
          <p>Loading badges...</p>
        )}
      </div>

      <div className="flex justify-center mt-4 gap-6 items-center w-full flex-wrap">
        <button
          className="p-4 text-white font-semibold rounded-2xl bg-teal-900 backdrop-blur-[30px] w-60 flex justify-center items-center gap-2"
          onClick={handleTweet}
        >
          Share On <FaXTwitter className="text-xl" />
        </button>
      </div>

      {copied && (
        <div className="mt-4 text-green-500 text-center">
          <p>Copied to clipboard!</p>
        </div>
      )}
    </div>
  );
};

export default BadgeCard;
