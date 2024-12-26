import React, { useState } from 'react';
import { GmxSdk } from '@gmx-io/sdk';

const TradeHistory = () => {
  const [address, setAddress] = useState('');
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTradeHistory = async () => {
    setLoading(true);
    setError('');
    setTrades([]);
    try {
      // Connect to Arbitrum RPC
      const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
      // Fetch trade history
      const tradeData = await getTradeHistory({ provider, account: address });
      setTrades(tradeData);
    } catch (err) {
      console.error('Error fetching trade history:', err);
      setError('Failed to fetch trade history. Please check the address or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>GMX Trade History</h2>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button
        onClick={fetchTradeHistory}
        disabled={loading || !address}
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {loading ? 'Loading...' : 'Fetch Trade History'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {trades.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Trade History:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {trades.map((trade, index) => (
              <li
                key={index}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  marginBottom: '10px',
                }}
              >
                <p><strong>Trade ID:</strong> {trade.id}</p>
                <p><strong>Position Size:</strong> {trade.size}</p>
                <p><strong>Entry Price:</strong> {trade.entryPrice}</p>
                <p><strong>Timestamp:</strong> {new Date(trade.timestamp * 1000).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TradeHistory;
