import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {

  return (
    <div className="w-[20%] h-screen border-r-2 border-zinc-400 px-10 py-6">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] mr-2 ri-tv-fill"></i>
        <span>Movie Hub</span>
      </h1>
      <nav className="flex flex-col gap-2 text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mt-6 mb-4">
          New Feeds
        </h1>
        <Link to='/trending' className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg duration-300">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to='/popular' className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg duration-300">
        <i className="mr-2 ri-bard-fill"></i>Popular
        </Link>
        <Link to='/movie' className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg duration-300">
        <i className="mr-2 ri-movie-2-fill"></i> Movies
        </Link>
        <Link to='/tv' className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg duration-300">
        <i className="mr-2 ri-tv-2-fill"></i>  Tv Shows
        </Link>
        <Link to='/person' className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg duration-300">
        <i className="mr-2 ri-team-fill"></i> People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400 mt-2" />
      <nav className="flex flex-col gap-2 text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mt-4 mb-4">
          website information 
        </h1>
        <Link to='/about' className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg duration-300">
        <i className="mr-2 ri-information-2-fill"></i>  About MovieHub
        </Link>
        <Link className="hover:bg-[#6556CD] p-4  hover:text-white rounded-lg duration-300">
        <i className="mr-2 ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
