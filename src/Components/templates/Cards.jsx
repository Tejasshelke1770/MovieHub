import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap justify-center bg-[#1F1E24] px-[3%]  w-full h-full  gap-6 px-10 py-6 ">
      {console.log(title)}
      {data.map((item, index) => (
        <Link
          to={`/${item.media_type || title}/details/${item.id}`}
          className="relative w-[25vh] mr-[4vh]  "
          key={index}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[30vh] h-[40vh] object-cover rounded"
            src={
              item.poster_path || item.backdrop_path || item.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    item.poster_path || item.backdrop_path || item.profile_path
                  }`
                : noimage
            }
          />
          <h1 className="text-zinc-400 hover:text-zinc-300 font-semibold text-xl  mt-1 mb-1">
            {item.name ||
              item.title ||
              item.original_name ||
              item.original_title}
          </h1>
          {item.vote_average && (
            <div className="rounded-full absolute right-[-10%] top-[50%] font-semibold text-white bg-yellow-500 flex items-center justify-center h-[5vh] w-[5vh] ">
              {(item.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
