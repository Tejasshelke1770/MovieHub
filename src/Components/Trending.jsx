import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import axios from "../Utils/Axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [categories, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Trending " + categories.toUpperCase();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${categories}/${duration}?page=${page}`);
      // console.log(data); 
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);                   //flaw is when filter changes then page is not setting to 1 
      setTrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [duration, categories]);

  return trending.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className=" flex px-[3%] items-center justify-between  w-full ">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-white mr-3 hover:text-[#6556CD]"
          ></i>
          Trending
        </h1>
        <div className="flex items-center gap-4 w-[100%] ">
          <TopNav />
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<h1 style={{textAlign:"center", backgroundColor:"#1F1E24", color:"white" }}>Loading...</h1>}
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
      >
        <Cards data={trending} title={categories} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
