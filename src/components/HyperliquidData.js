import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        fetchHyperliquidData()
    }, [walletAddress])
    return (
        <div className="cardMoprh px-[29px] py-[33px] w-[524px] flex flex-col gap-6">
            <img className="w-[201px] h-auto" src="/hyperliquid.svg"></img>
            {loading && <p>Loading...</p>}
            {data && !loading ? (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                       <span className="text-[18px] leading-[22px] text-[#9CA3AF]"> Total Volume:</span>
                        <p className="text-[30px] text-white leading-[36px]">{data.totalVolume}</p>
                    </div>
                      <div className="flex flex-col gap-1">
                       <span className="text-[18px] leading-[22px] text-[#9CA3AF]"> Net PnL:</span>
                        <p className="text-[30px] text-white leading-[36px]">{data.netPnL}</p>
                    </div>
                     <div className="flex flex-col gap-1">
                       <span className="text-[18px] leading-[22px] text-[#9CA3AF]"> Traded Assets:</span>
                        <p className="text-[30px] text-white leading-[36px]">{data.tradedAssets.join(", ")}</p>
                    </div>
                </div>
            ) : (
                <div>{!loading ? "No data" : ""}</div>
            )}
        </div>
    );
};

export default HyperliquidData;
