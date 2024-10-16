import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import axios from "../Utils/Axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";


const Popular = () => {
  const Navigate = useNavigate()
  const [popular, SetPopular] = useState([])
  const [category, setCategory] = useState('movie')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  document.title = "Popular " + category.toUpperCase();
  
    const getPopular = async()=>{        
        try {                          
            const {data} = await axios.get(`/${category}/popular?&page=${page}`)
            console.log(data)
            if(data.results.length > 0){
                SetPopular((prev)=>[...prev, ...data.results])
                setPage(page+1)
            }else{
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);    
        }
    }
  
    const refreshHandler = ()=>{
        if(popular.length === 0){
            getPopular()
        }else{
            setPage(1);
            SetPopular([]);
            getPopular()
        }
    }
    useEffect(()=>{
        refreshHandler()
    },[category])

  return popular.length > 0  ?(
    <div className="w-screen h-screen">
      <div className="flex items-center w-full px-[3%] ">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => Navigate(-1)}
            className="ri-arrow-left-line text-white mr-3  hover:text-[#6556CD] "
          ></i>
          Popular
        </h1>
        <div className="flex items-center gap-4 w-[100%] px-10">
            <TopNav/>
            <Dropdown
            title="Filter"
            options={["tv", "movie", ]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
      loader={<h1 style={{textAlign:"center", backgroundColor:"#1F1E24", color:"white" }}>Loading...</h1>}
      dataLength={popular.length}
      next={getPopular}
      hasMore={hasMore}
      >
      <Cards data={popular} title={category} />
      </InfiniteScroll>
      
    </div>
  ): <Loading />
};

export default Popular;
