import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "/noimage.jpg"

const Recommendation = ({data}) => {
  return (
    <div className='flex items-center overflow-y-hidden gap-6    '>
      { data.length > 0  ? data.map((el, i) => (
        <Link 
        style={{
            backgroundColor: "rgba(255, 255, 255, 0.5);",
            backdropFilter: "blur(10px)",
            borderRadius: "10px",
          }}
         to={`/${el.media_type}/details/${el.id}`} 
         className='mb-2  min-w-[343px] h-[240px]  rounded-md  hover:scale-105 duration-300'
         key={i} >
        <img className=' h-[80%] w-full object-cover rounded'
        src={el.backdrop_path || el.profile_path ? `https://image.tmdb.org/t/p/original/${el.backdrop_path || el.profile_path}` : noimage }  />
        <h1 className='ml-2 mt-2 font-semibold text-l text-white  '>{el.title || el.name}</h1>
        </Link>
        
      )) : <h1 className='text-2xl text-zinc-300 font-bold text-center mt-10'> No Recommendations</h1>  }
    </div>
  )
}

export default Recommendation;
