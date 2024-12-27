import React from 'react'
import HyperliquidData from '../HyperliquidData'
import VertexData from '../VertexData'
import DYDXData from '../DYDXData'
import './Dashboard.css'

const Dashboard = ({walletAddress}) => {
  return (
          <div className="dataDiv px-[138px] pt-[126px]">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {walletAddress && <HyperliquidData walletAddress={walletAddress} />}
                        {walletAddress && <VertexData walletAddress={walletAddress} />}
                        {walletAddress && <DYDXData walletAddress={walletAddress} />}
                    </div>
                </div>
  )
}

export default Dashboard