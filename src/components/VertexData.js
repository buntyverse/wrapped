import React, { useEffect, useState } from "react";
import axios from "axios";

const VertexData = ({ walletAddress }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchVertexData = async () => {
        const subaccountUrl = `https://archive.prod.vertexprotocol.com/v1`;
        let totalVolume = 0;
        let totalPnL = 0;

        try {
            setLoading(true);
            const subaccountResponse = await axios.post(subaccountUrl, {
                "subaccounts": {
                  "address": walletAddress
                
              }});
            const subaccounts = subaccountResponse.data.subaccounts || [];

            for (const subaccount of subaccounts) {
                console.log(subaccount.subaccount)
                // Fetch matches for volume
        
                const ordersUrl = `https://archive.prod.vertexprotocol.com/v1`;
                const ordersResponse = await axios.post(ordersUrl, {
                    "orders": {
                      "product_ids": [
                        2
                      ],
                      "subaccount": subaccount.subaccount,
                      "limit": 500
                    }
                  });
                const orders = ordersResponse.data.orders || [];
        
                orders.forEach(order => { 
              
                    const result = Math.abs(parseInt(order.quote_filled)) / Math.pow(10, 18)
                    totalVolume += result || 0;
                });

                // Fetch events for PnL
                const eventsUrl = `https://archive.prod.vertexprotocol.com/v1`;
                const eventsResponse = await axios.post(eventsUrl, {
                    "events": {
                      "product_ids": [
                        2
                      ],
                      "subaccount": subaccount.subaccount,
                      "limit": {
       "raw": 500
    },
                    }
                  });
                const events = eventsResponse.data.events || [];
                console.log(events)
                const event = events[events.length - 1];
                
                        totalPnL = (parseInt(event.post_balance.perp.balance.amount / Math.pow(10, 18)) * parseInt(event.product.perp.oracle_price_x18 / Math.pow(10, 18)) - parseInt(event.net_entry_cumulative / Math.pow(10, 18)))
                        
                    
               
            }

            setData({ totalVolume, totalPnL });
        } catch (error) {
            console.error("Error fetching Vertex data:", error.message);
        } finally {
            setLoading(false);
        }
  };
  
      useEffect(() => {
          fetchVertexData()
      }, [walletAddress])

    return (
        <div className="cardMoprh px-[29px] py-[33px] w-[524px] flex flex-col gap-6">
            <img className="w-[139.5px] h-auto" src="/vertex.svg"></img>
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

export default VertexData;
