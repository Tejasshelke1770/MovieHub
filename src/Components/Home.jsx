import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../Utils/Axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";


const Home = () => {
  document.title = "Homepage";
  const [wallpaper, setWallpaper] = useState(null); //wallpaper
  const [trending, setTrending] = useState(null); //trending card
  const [category, setCategory] = useState("all"); //filter categories

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setWallpaper( data.results[Math.floor(Math.random() * data.results.length)]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-screen overflow-auto overflow-x-hidden">
        <TopNav  />
        <Header data={wallpaper} />

        <div className="my-5 flex justify-between px-5">
          <h1 className="text-3xl font-semibold text-zinc-400  ">Trending</h1>
          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=> setCategory(e.target.value)} />
        </div>

        <HorizontalCards data={trending} showoverview={true}  />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
