import React, { useState } from "react";
import axios from "axios";

const HyperliquidData = ({ walletAddress }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchHyperliquidData = async () => {
        const url = "https://api.hyperliquid.xyz/info";
        const perpetualsUrl = "https://api.hyperliquid.xyz/info";

        const payload = {
            type:"userFillsByTime",
            user: walletAddress,
            startTime: new Date("2024-01-01T00:00:00Z").getTime(),
            endTime: Date.now(),
        };

        try {
            setLoading(true);

            const perpetualsResponse = await axios.post(perpetualsUrl, {type:"meta"}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const perpetuals = perpetualsResponse.data.universe;

            const response = await axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const fills = response.data;

            let totalVolume = 0;
            let netPnL = 0;
            const tradedAssets = new Set();

            fills.forEach(fill => {
                console.log(fill)
                const size = parseFloat(fill.sz*fill.px);
                const pnl = parseFloat(fill.closedPnl)
                totalVolume += size || 0;
                netPnL += pnl || 0;



                if (typeof fill.coin === "string" && fill.coin.startsWith("@")) {
                    const index = parseInt(fill.coin.slice(1), 10);
                    if (perpetuals[index] && perpetuals[index].name) {
                        tradedAssets.add(perpetuals[index].name);
                    }
                } else {
                    tradedAssets.add(fill.coin);
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

    return (
        <div>
            <h2>Hyperliquid Data</h2>
            <button onClick={fetchHyperliquidData}>Fetch Hyperliquid Data</button>
            {loading && <p>Loading...</p>}
            {data && (
                <div>
                    <p>Total Volume: {data.totalVolume}</p>
                    <p>Net PnL: {data.netPnL}</p>
                    <p>Traded Assets: {data.tradedAssets.join(", ")}</p>
                </div>
            )}
        </div>
    );
};

export default HyperliquidData;
