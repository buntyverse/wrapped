import React from 'react'

const WrappedCircle = ({ walletAddress, setWalletAddress, fetchData }) => {
  return (
    <div className='w-[634px] h-[634px] rounded-full gap-[60px] border-[5px] border-[#40E0D0] bg-[#0B1216] flex flex-col justify-center items-center border-opacity-[30%]'>
          <img src='/Logo.svg' className='w-[230px] h-auto' />
          <img src='/Wrapped.svg' className='w-[444px] h-auto' />
          <div className='bg-white bg-opacity-[3%] border w-[349px] border-white border-opacity-[5%] py-1 px-3 rounded-[6px] flex'>
              <input
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className='bg-transparent flex-1 focus:outline-none text-[16px]' placeholder='Enter Address'></input>
              <button onClick={fetchData} className='w-[38px] h-[34px] p-3 rounded-[4px] bg-[#2ACCBB] flex justify-center items-center'>
                  <img src='/RightArrow.svg' className='w-[14px] h-[14px]'></img>
              </button>
          </div>
    </div>
  )
}

export default WrappedCircle