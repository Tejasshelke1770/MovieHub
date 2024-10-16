import React from 'react'
import loader from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black '>
      <img className='w-[40vh]' src={loader}  />
    </div>
  )
}

export default Loading
