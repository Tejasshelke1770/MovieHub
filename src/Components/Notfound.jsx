import React from 'react'
import Not404 from '/404.gif'

const Notfound = () => {
  return (
    <div className='flex items-center justify-center w-full'>
    <img className='w-[80%] h-[90%] '  src={Not404} alt='404 Not Found' />
  </div>
  )
}

export default Notfound

