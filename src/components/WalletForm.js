import React from "react";

const WalletForm = ({ walletAddress, setWalletAddress, fetchData }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Enter wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                style={{ padding: "10px", width: "300px" }}
            />
            <button onClick={fetchData} style={{ marginLeft: "10px", padding: "10px" }}>
                Fetch Data
            </button>
        </div>
    );
};

export default WalletForm;
