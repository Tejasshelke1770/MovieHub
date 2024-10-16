import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import axios from "../Utils/Axios";
import Cards from "./templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

const Movie = () => {
  const Navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore]= useState(true)
  document.title = "Movies " + category.toUpperCase();


  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?language=en-US&page=${page}`);
      console.log(data);
      if(data.results.length > 0){
          setMovies((prev) => [...prev, ...data.results]);
          setPage(page + 1);
      }else{
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = () => {
    if (movies.length === 0) {
      getMovies();
    } else {
      setMovies([]);
      setPage(1);
      getMovies();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movies.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center px-[3%]">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => Navigate(-1)}
            className="ri-arrow-left-line text-white mr-3  hover:text-[#6556CD] "
          ></i>
          Movies
        </h1>
        <div className="flex items-center  gap-4 w-full ">
          <TopNav />
          <Dropdown
            title="Category"
            options={[ "top_rated", "popular", "upcoming","now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        loader={
          <h1 style={{textAlign: "center",backgroundColor: "#1F1E24",color: "white",}}>
            Loading...
          </h1>
        }
        dataLength={movies.length}
        next={getMovies}
        hasMore={hasMore}
      >
        <Cards data={movies} title='movie' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
