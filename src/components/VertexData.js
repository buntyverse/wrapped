import React, { useEffect, useState } from "react";
import axios from "axios";
import DataCard from "./Cards/DataCard";

const VertexData = ({ walletAddress, updateTotals }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVertexData = async () => {
    const subaccountUrl = `https://archive.prod.vertexprotocol.com/v1`;
    let totalVolume = 0;
    let totalPnL = 0;

    try {
      setLoading(true);
      const subaccountResponse = await axios.post(subaccountUrl, {
        subaccounts: {
          address: walletAddress,
        },
      });
      const subaccounts = subaccountResponse.data.subaccounts || [];

      for (const subaccount of subaccounts) {
        console.log(subaccount.subaccount);
        // Fetch matches for volume

        const ordersUrl = `https://archive.prod.vertexprotocol.com/v1`;
        const ordersResponse = await axios.post(ordersUrl, {
          orders: {
            product_ids: [2],
            subaccount: subaccount.subaccount,
            limit: 500,
          },
        });
        const orders = ordersResponse.data.orders || [];

        orders.forEach((order) => {
          const result =
            Math.abs(parseInt(order.quote_filled)) / Math.pow(10, 18);
          totalVolume += result || 0;
        });

        // Fetch events for PnL
        const eventsUrl = `https://archive.prod.vertexprotocol.com/v1`;
        const eventsResponse = await axios.post(eventsUrl, {
          events: {
            product_ids: [2],
            subaccount: subaccount.subaccount,
            limit: {
              raw: 500,
            },
          },
        });
        const events = eventsResponse.data.events || [];
        console.log(events);
        const event = events[events.length - 1];

        totalPnL =
          parseInt(event.post_balance.perp.balance.amount / Math.pow(10, 18)) *
            parseInt(event.product.perp.oracle_price_x18 / Math.pow(10, 18)) -
          parseInt(event.net_entry_cumulative / Math.pow(10, 18));
      }
      console.log(totalPnL, "totalPnl");

      setData({ totalVolume, totalPnL });
    } catch (error) {
      console.error("Error fetching Vertex data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVertexData();
  }, [walletAddress]);

  useEffect(() => {
    // fetchHyperliquidData();

    // console.log(data);

    if (data && !loading && data?.totalVolume > 0) {
      console.log("dataPnl line 83", data.totalPnL);
      updateTotals(data.totalVolume, data.totalPnL, "vertex");
    }

    // updateTotals(data.totalVolume, data.netPnL, "hyperliquid");
  }, [loading]);

  return (
    <>
      {data && !loading ? (
        <>
          <h1>{data.netPnL}</h1>
          <DataCard
            loading={loading}
            pnl={data.totalPnL}
            totalVolume={data.totalVolume}
            tradedAssets={data.tradedAssets ? data.tradedAssets : []}
            imgSrc="/vertex.svg"
          />
        </>
      ) : (
        <div>{!loading ? "No data" : ""}</div>
      )}
    </>
  );
};

export default VertexData;
