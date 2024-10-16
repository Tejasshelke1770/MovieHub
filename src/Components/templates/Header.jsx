import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data)
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "contain, cover",
        backgroundPosition: "center ",
      }}
      className="w-full h-[50vh] flex flex-col justify-end pl-[6%] pb-[4%] text-white "
    >
      <h1 className="text-5xl font-bold w-[70%]">
        {data.original_title || data.name}
      </h1>
      <p className="w-[70%] mt-3 mb-3 ">
        {data.overview.slice(0, 200)} ...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400 ">More</Link>
      </p>
      <p className="mb-5 ">
        <i className="ri-megaphone-fill mr-1 text-yellow-500"></i>
        {data.first_air_date
          ? data.first_air_date.toString().slice(0, 4)
          : data.release_date.toString().slice(0, 4)}
        <i className="ri-record-circle-fill mr-1 ml-4 text-yellow-500"></i>
        {data.media_type.toUpperCase()}
        <i className="ri-music-2-fill mr-1 ml-4 text-yellow-500"></i>
        {data.original_language.toUpperCase()}
        <i className="ri-star-fill mr-1 ml-4 text-yellow-500"></i>
        {data.vote_average.toString().slice(0, 3)}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`}>
        <button className="px-4 py-2 bg-[#6556CD] rounded-md font-bold  hover:scale-105 duration-300">
 
          <i className="ri-play-fill mr-1"></i>Watch Trailer
        </button>
      </Link>
    </div>
  );
};

export default Header;
