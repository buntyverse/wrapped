import React, { useState } from "react";
import axios from "axios";

const DYDXData = ({ walletAddress }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDYDXData = async () => {
        const subaccountsUrl = `https://indexer.dydx.trade/v4/addresses/${walletAddress}`;

        try {
            setLoading(true);

            // Step 1: Fetch subaccounts
            const subaccountsResponse = await axios.get(subaccountsUrl);
            const subaccounts = subaccountsResponse.data.subaccounts || [];

            let totalVolume = 0;
            let totalPnL = 0;
            const tradedAssets = new Set();

            // Step 2: Process each subaccount
            for (const subaccount of subaccounts) {
                console.log(subaccounts)
                const parentSubaccountId = subaccount.subaccountNumber;

                // Fetch fills for the subaccount
                const fillsUrl = `https://indexer.dydx.trade/v4/fills`;
                const fillsResponse = await axios.get(fillsUrl, {
                    params: {
                      address: walletAddress,
                      subaccountNumber:parentSubaccountId,
                    },
                  });
                const fills = fillsResponse.data.fills || [];

                // Calculate total volume from fills
                fills.forEach((fill) => {
                    console.log(fill)
                    totalVolume += parseFloat(fill.size*fill.price) || 0;
                    if (fill.market) {
                        const asset = fill.market.replace("-USD", "");
                        tradedAssets.add(asset);
                    }
                });

                // Fetch historical PnL for the subaccount
                const pnlUrl = `https://indexer.dydx.trade/v4/historical-pnl`;
                const pnlResponse = await axios.get(pnlUrl, {
                    params: {
                      address: walletAddress,
                      subaccountNumber:parentSubaccountId,
                    },
                  });
                console.log(pnlResponse)
                const pnlData = pnlResponse.data.historicalPnl[0].totalPnl
            
                

                // Sum up PnL
                    totalPnL += parseFloat(pnlData) || 0;
                
            }

            // Round the totals to two decimal places
            totalVolume = parseFloat(totalVolume.toFixed(2));
            totalPnL = parseFloat(totalPnL.toFixed(2));

            setData({
                totalVolume,
                totalPnL,
                tradedAssets: Array.from(tradedAssets),
            });
        } catch (error) {
            console.error("Error fetching DYDX data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>DYDX Data</h2>
            <button onClick={fetchDYDXData}>Fetch DYDX Data</button>
            {loading && <p>Loading...</p>}
            {data && (
                <div>
                    <p>Total Volume: {data.totalVolume}</p>
                    <p>Total PnL: {data.totalPnL}</p>
                    <p>Traded Assets: {data.tradedAssets.join(", ")}</p>
                </div>
            )}
        </div>
    );
};

export default DYDXData;
