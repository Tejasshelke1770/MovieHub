import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './templates/TopNav'
import Dropdown from "./templates/Dropdown";
import axios from "../Utils/Axios";
import Cards from './templates/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';



const Tvshow = () => {
    const Navigate = useNavigate()
    const [tvData, setTvData] = useState([])
    const [category, setCategory] = useState('top_rated')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
  document.title = "Tv Shows " + category.toUpperCase();


    const getTvData = async()=>{
      try {
      const {data} = await axios.get(`/tv/${category}?language=en-US&page=${page}`)
      console.log(data)
      if(data.results.length > 0){
        setTvData((prev)=> [...prev,...data.results])
        setPage(page+1)
      }else{
        setHasMore(false)
      }
      } catch (error) {
        console.log(error);
      }
    }

    const refreshHandler = ()=>{
      if (tvData.length === 0) {
        getTvData()
      }else{
        setPage(1)
        setTvData([])
        getTvData()
      }
    }

    useEffect(()=>{
      refreshHandler()
    },[category])

  return tvData.length > 0 ? (
    <div className='w-screen h-screen'>
        <div className='w-full flex items-center px-[3%] '>
            <h1 className='text-2xl text-zinc-400 font-semibold'><i
            onClick={() => Navigate(-1)}
            className="ri-arrow-left-line text-white mr-3  hover:text-[#6556CD] "
          ></i>Tv Shows</h1>
          <div className='flex items-center w-[90%] gap-10'>
            <TopNav/>
            <Dropdown
            title="Filter"
            options={["airing_today", "on_the_air",'popular', 'top_rated' ]}
            func={(e) => setCategory(e.target.value)}
          />
          </div>
        </div>
        <InfiniteScroll
        loader={<h1 style={{textAlign:"center", backgroundColor:"#1F1E24", color:"white" }}>Loading...</h1>}
        dataLength={tvData.length}
        next={getTvData}
        hasMore={hasMore}
        >
          <Cards data={tvData} title='tv' />
        </InfiniteScroll>
    </div>
  ) : <Loading/>
}

export default Tvshow
