import React, { useEffect, useState } from "react";
import axios from "axios";
import DataCard from "./Cards/DataCard";
import { coinList } from "../components/assets/list";

const HyperliquidData = ({ walletAddress, updateTotals }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHyperliquidData = async () => {
      const url = "https://api.hyperliquid.xyz/info";
      const perpetualsUrl = "https://api.hyperliquid.xyz/info";

      const payload = {
        type: "historicalOrders",
        user: walletAddress,
      };
      const payload2 = {
        type: "userFills",
        user: walletAddress,
      };

      try {
        setLoading(true);

        const perpetualsResponse = await axios.post(
          perpetualsUrl,
          { type: "meta" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const perpetuals = perpetualsResponse.data.universe;

        const response = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const fillResponse = await axios.post(url, payload2, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const orders = response.data;
        const fills = fillResponse.data;
        let totalVolume = 0;
        let netPnL = 0;
        const tradedAssets = new Set();

        orders.forEach((order) => {
          // console.log(order);
          if (order.status == "filled") {
            const size =
              parseFloat(order.order.limitPx) * parseFloat(order.order.origSz);
            totalVolume += size || 0;
          }

          if (typeof order.coin === "string" && order.coin.startsWith("@")) {
            const index = parseInt(order.coin.slice(1), 10);
            if (perpetuals[index] && perpetuals[index].name) {
              tradedAssets.add(perpetuals[index].name);
            }
          } else {
            // console.log(tradedAssets);
            tradedAssets.add(order.order.coin);
          }
        });

        fills.forEach((fill) => {
          {
            const pnl = parseInt(fill.closedPnl);
            // console.log(fill.closedPnl);
            netPnL += pnl || 0;
          }
        });

        setData({
          totalVolume,
          netPnL,
          tradedAssets: Array.from(tradedAssets),
        });
      } catch (error) {
        console.error("Error fetching Hyperliquid data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHyperliquidData();
    // setNewBadges([
    //   ...badges,
    //   {
    //     name: "HyperLiquidBadge",
    //     imageUrl:
    //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXsaqSdj88PK6vAoFLYqyhFfaamHrVCOpt6_S4l-sBLEgS_N1TzJ5vkeZjHt-qIa3Ene8&usqp=CAU",
    //   },
    // ]);
  }, [walletAddress]);
  console.log("data2", data);

  useEffect(() => {
    // fetchHyperliquidData();

    console.log(data);

    if (data && !loading && data?.totalVolume > 0) {
      updateTotals(data.totalVolume, data.netPnL, "hyperliquid");

      const lowerTradedAssets = data.tradedAssets.map((asset) =>
        asset.toLowerCase()
      );

      const matchingCoins = coinList.filter((coin) =>
        lowerTradedAssets.includes(coin.symbol.toLowerCase())
      );

      console.log(matchingCoins, "matched coin gecko coins  ");

      // console.log(data.tradedAssets, "traded assets");
    }

    // updateTotals(data.totalVolume, data.netPnL, "hyperliquid");
  }, [loading]);

  return (
    <>
      {data && !loading ? (
        <DataCard
          loading={loading}
          pnl={data.netPnL}
          totalVolume={data.totalVolume}
          tradedAssets={data.tradedAssets ? data.tradedAssets : []}
          imgSrc="/hyperliquid.svg"
        />
      ) : (
        <div>{!loading ? "No data" : ""}</div>
      )}
    </>
  );
};

export default HyperliquidData;
