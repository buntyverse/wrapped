import React, { useState } from "react";
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

    return (
        <div>
            <h2>Vertex Data</h2>
            <button onClick={fetchVertexData}>Fetch Vertex Data</button>
            {loading && <p>Loading...</p>}
            {data && (
                <div>
                    <p>Total Volume: {data.totalVolume}</p>
                    <p>Total PnL: {data.totalPnL}</p>
                </div>
            )}
        </div>
    );
};

export default VertexData;
