import React, { useEffect, useState } from "react";
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
                    
                    totalVolume += parseFloat(fill.size*fill.price) || 0;
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
            });
        } catch (error) {
            console.error("Error fetching DYDX data:", error.message);
        } finally {
            setLoading(false);
        }
    };

            useEffect(() => {
                fetchDYDXData()
            }, [walletAddress])

    return (
        <div className="cardMoprh px-[29px] py-[33px] w-[524px] flex flex-col gap-6">
            <img className="w-[93px] h-auto" src='/dyx.svg'></img>
            {loading && <p>Loading...</p>}
            {data && !loading ? (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                           <span className="text-[18px] leading-[22px] text-[#9CA3AF]"> Total Volume:</span>
                            <p className="text-[30px] text-white leading-[36px]">{data.totalVolume}</p>
                </div>
                <div className="flex flex-col gap-1">
                           <span className="text-[18px] leading-[22px] text-[#9CA3AF]"> Total PnL:</span>
                            <p className="text-[30px] text-white leading-[36px]">{data.totalPnL}</p>
                </div>
              </div>
            ) : (
                     <div>{!loading ? "No data" : ""}</div>
            )}
        </div>
    );
};

export default DYDXData;
