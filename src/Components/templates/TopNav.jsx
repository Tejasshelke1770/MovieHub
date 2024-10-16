import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Utils/Axios";
import noimage from "/noimage.jpg"

const TopNav = () => {
  const [query, setquery] = useState('')  //for search query
  const [searches, setSearches] = useState([])  // to store api data
  console.log(searches);
  

  const getSearches = async()=>{ 
    try {
      const {data} = await axios.get(`/search/multi?query=${query}`)
      // console.log(data.results);
      setSearches(data.results)
    } catch (error) {
      console.log( "Error :",error);
    }
  }

  useEffect(() => {
    getSearches();
  }, [query]);
 
  return (
    <div className="w-full pl-[15%] ">
    <div className="w-full h-[10vh] relative flex items-center  ">
      <i className="ri-search-line text-zinc-200 text-3xl"></i>
      <input
        onChange={(e)=> setquery(e.target.value) }
        value={query}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search anything "
      />
      {query.length > 0 && <i onClick={()=>setquery('')} className="ri-close-fill text-zinc-200 text-3xl cursor-pointer"></i>}
        
        <div className={`w-[49%] max-h-[50vh] bg-zinc-200 absolute z-10 top-[100%] left-[7%] overflow-auto rounded`} >
            {searches.map((e,i)=>(
              <Link to={`/${e.media_type}/details/${e.id}`} key={i} 
              className="gap-10 hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-10 flex justify-start items-center border-b-2 border-zinc-100 "> 
              <img className="object-cover w-[10vh] h-[10vh] rounded shadow-lg" 
                src={e.backdrop_path || e.profile_path || e.poster_path ? `https://image.tmdb.org/t/p/original/${e.backdrop_path || e.profile_path || e.poster_path}` : noimage}  
              />
              <span>{e.name || e.original_title}</span>  
          </Link> 
            )) }
        </div>
      </div>
    </div>
  )
}; 

export default TopNav;
