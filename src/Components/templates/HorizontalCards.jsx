import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg"



const HorizontalCards = ({ data, showoverview}) => {
  return (
      <div className="w-full  flex  overflow-y-hidden mb-5 px-1">
        {data.map((el, idx) => {
          return (
            <Link
              to={`/${el.media_type}/details/${el.id}`}
              key={idx}
              className="min-w-[30vh] max-h-[70vh] cursor-pointer bg-zinc-900 mr-5 mb-5 rounded-md overflow-hidden hover:scale-105 duration-300  " 
            >
              <img
                className="h-[45vh] object-cover "
                src={el.poster_path || el.profile_path ? `https://image.tmdb.org/t/p/original/${el.poster_path || el.profile_path  }` : noimage}
              />
              <div className="text-white px-3  ">
                <h1 className="mt-1 mb-1 text-l font-bold ">
                  {el.name || el.original_title || el.original_name || el.title}
                </h1>
                {showoverview && <p className=" mt-2  ">
                  {el.overview && el.overview.slice(0, 50)}...
                  <Link className="text-zinc-500 text-sm">More</Link>
                </p>}
              </div>
            </Link>
          );
        })}
      </div>
   
  );
};

export default HorizontalCards;

//{`/${el.media_type || title }/details/${el.id}`}