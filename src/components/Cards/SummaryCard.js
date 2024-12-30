import { copyImageToClipboard } from "copy-image-clipboard";
import React, { useEffect, useState } from "react";
import { CardStepper } from "./Profile";
import hello2Image from "../assets/hlLoyal.png";
import explorer from "../assets/explorer.jpeg";
import tenMil from "../assets/10mVol.jpeg";
import fiveMil from "../assets/5mVol.jpeg";
import twoMil from "../assets/2mVol.jpeg";
import dydx from "../assets/dydx.png";
import tenkPnL from "../assets/10kPnL.png";
import hundredkPnL from "../assets/100kPnL.png";
import fiveHPnL from "../assets/500kPnL.png";
import oneMilPnL from "../assets/1milPnL.jpeg";

import newbie from "../assets/newbie.png";
import { FaXTwitter } from "react-icons/fa6";

const BadgeCard = ({ walletAddress, summaryData, handleBackClick }) => {
  const [copied, setCopied] = useState(false);
  const [badges, setBadges] = useState(new Set());
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
    const tweetUrl = `https://twitter.com/intent/tweet?text=Just%20checked%20out%20my%20journey%20with%20perpetuals%20so%20far%20on%20Filament%20Wrapped%20%F0%9F%93%88%20%20check%20yours%20here%3A%20%20%20wrapped.filament.finance`;
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
    const badgeAlloter = () => {
      const newBadges = [];

      if (summaryData?.totalVolume) {
        if (summaryData.totalVolume >= 10000000) {
          newBadges.push({
            name: "Market Maker",
            imageUrl: tenMil,
            type: "volume",
            totalVolume: summaryData.totalVolume,
            description:
              "Dominating the markets with over $10M in trading volume.",
          });
        } else if (summaryData.totalVolume >= 5000000) {
          newBadges.push({
            name: "The Whale",
            imageUrl: fiveMil,
            type: "volume",
            description: "Master of trades, total volume exceeding $5M.",
            totalVolume: summaryData.totalVolume,
          });
        } else if (summaryData.totalVolume >= 2000000) {
          newBadges.push({
            name: "Big Shot",
            imageUrl: twoMil,
            type: "volume",
            description:
              "For those breaking into the big leagues with over $2M in trading volume.",
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
            description:
              "The crème de la crème, earning over $500k in profits.",
            totalPnL: summaryData.totalPnL,
          });
        } else if (summaryData.totalPnL >= 100000) {
          newBadges.push({
            name: "Veteran",
            imageUrl: hundredkPnL,
            type: "pnl",
            totalPnL: summaryData.totalPnL,
            description:
              "Your trading prowess shines with over $100k in profits.",
          });
        } else if (summaryData.totalPnL >= 10000) {
          newBadges.push({
            name: "Fresh Money/New Money",
            imageUrl: tenkPnL,
            type: "pnl",
            totalPnL: summaryData.totalPnL,
            description: "For achieving $10k+ in realized profits.",
          });
        }
      }

      if (
        summaryData?.dexChecked.includes("hyperliquid") &&
        summaryData.dexChecked.includes("dydx") &&
        summaryData.dexChecked.includes("vertex")
      ) {
        newBadges.push({
          name: "explorer badge",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXsaqSdj88PK6vAoFLYqyhFfaamHrVCOpt6_S4l-sBLEgS_N1TzJ5vkeZjHt-qIa3Ene8&usqp=CAU",
        });
      } else if (
        summaryData.dexChecked.includes("hyperliquid") &&
        !summaryData.dexChecked.includes("dydx") &&
        !summaryData.dexChecked.includes("vertex")
      ) {
        newBadges.push({
          name: "HL Maximalist",
          description: "Dedicated solely to the Hyperliquid ecosystem.",
          imageUrl: hello2Image,
        });
      } else if (summaryData.dexChecked.length >= 2) {
        newBadges.push({
          name: "Perp Explorer",
          description:
            "An adventurer who has conquered Vertex, Hyperliquid, and DYDX.",
          imageUrl: explorer,
        });
      } else if (
        summaryData.dexChecked.includes("dydx") &&
        !summaryData.dexChecked.includes("hyperliquid") &&
        !summaryData.dexChecked.includes("vertex")
      ) {
        newBadges.push({
          name: "DYDX Hedgie",
          description:
            "Loyal to the DYDX universe, trading exclusively on this platform.",
          imageUrl: dydx,
        });
      } else if (
        !summaryData.dexChecked.includes("dydx") &&
        !summaryData.dexChecked.includes("hyperliquid") &&
        !summaryData.dexChecked.includes("vertex")
      ) {
        newBadges.push({
          name: "Fresh Trader/Meat New Explorer",
          description:
            "Starting your journey in the world of perpetuals. Welcome aboard!",
          imageUrl: newbie,
        });
      }

      setBadges((prevBadges) => {
        const updatedBadges = new Set(prevBadges);
        newBadges.forEach((badge) => updatedBadges.add(JSON.stringify(badge)));
        return updatedBadges;
      });

      setLoading(false);
    };

    badgeAlloter();
  }, [summaryData]);

  return (
    <div className="  min-h-screen p-8 flex flex-col items-center rounded-xl ">
      {/* Badges Section */}
      <div className="flex justify-center align-middle">
        {!loading && badges.size !== 0 ? (
          <CardStepper
            badges={Array.from(badges).map((badge) => JSON.parse(badge))}
            handleCopyImage={handleCopyImage}
            downloadImage={downloadImage}
          />
        ) : (
          <></>
        )}
      </div>

      {/* Tweet Button */}
      <div className="flex justify-center mt-4 gap-6 items-center">
        {/* <button
          className="bg-gradient-to-b from-teal-400 to-teal-950 text-white font-bold py-2 px-4 rounded-lg w-32"
          onClick={handleBackClick}
        >
          Back
        </button> */}
        <button
          className="relative p-4 text-white font-semibold rounded-2xl bg-teal-900 lg:-mt-20 -mt-10 backdrop-blur-[30px] w-60 flex justify-center items-center gap-2"
          onClick={handleTweet}
        >
          {/* Adjust the size of the icon */}
          Share On
          <FaXTwitter className="text-xl" />
        </button>
      </div>

      {/* Copy Confirmation */}
      {copied && (
        <div className="mt-4 text-center text-green-500">
          <p>Copied to clipboard!</p>
        </div>
      )}
    </div>
  );
};

export default BadgeCard;
