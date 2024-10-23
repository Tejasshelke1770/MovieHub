import React, { useEffect } from "react";
import { asyncloadMovies } from "../../Store/Actions/MovieAction";
import { useDispatch, useSelector } from "react-redux";
import {Link,Outlet,useLocation,useNavigate,useParams,} from "react-router-dom";
import { removeMovie } from "../../Store/Reducers/MovieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb, faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import Loading from "./Loading";
import noimage from "/noimage.jpg";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Recommendation from "./templates/Recommendation";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const { Info } = useSelector((state) => state.movie);
  // console.log(Info);
  const { id } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncloadMovies(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return Info ? (
    <div
     className="w-screen h-screen px-[10%] overflow-y-auto relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7)), 
      url(https://image.tmdb.org/t/p/original/${Info.details.backdrop_path})`,
        backgroundSize: "contain, cover",
        backgroundPosition: "center ", }}
    >
      {/* part 1 nav */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
        <i
          onClick={() => Navigate(-1)}
          className="ri-arrow-left-line text-white mr-3 text-2xl  hover:text-[#6556CD] "
        ></i>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${Info.external_ids.imdb_id}/`}
        >
          <FontAwesomeIcon icon={faImdb} />
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${Info.external_ids.wikidata_id}`}
        >
          <FontAwesomeIcon icon={faWikipediaW} />
        </a>
        <a target="_blank" href={`${Info.details.homepage}`}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />{" "}
        </a>
      </nav>

      <Outlet />

      {/* part 2 poster & watchproviders */}
      <div className="parent A1 flex flex-col ">
        {/* poster & details */}
        <div className="child 1 flex gap-6 ">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]  h-[45vh] w-[14vw] object-cover rounded"
            src={
              Info.details.poster_path ||
              Info.details.backdrop_path ||
              Info.details.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    Info.details.poster_path ||
                    Info.details.backdrop_path ||
                    Info.details.profile_path
                  }`
                : noimage
            }
          />
          <div
            className="information ml-[5%] text-white  w-[60vw] "
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5);",
              backdropFilter: "blur(1px)",
              borderRadius: "10px",
            }}
          >
            {/* title */}
            <h1 className="text-5xl font-black  text-white leading-0">
              {Info.details.name ||
                Info.details.title ||
                Info.details.original_name ||
                Info.details.original_title}
              <sup>
                <small className="text-xl font-bold text-zinc-300">
                  {Info.details.release_date.split("-")[0]}
                </small>
              </sup>
            </h1>

            {/* details */}
            <div className="text-white flex  gap-x-5 items-center mt-3 mb-3">
              <span className="rounded-full text-xl font-semibold text-white bg-yellow-500 flex items-center justify-center h-[6vh] w-[6vh] ">
                {(Info.details.vote_average * 10).toFixed()} <sup>%</sup>
              </span>
              <h1 className="font-semibold text-2xl w-[60px] leading-6">
                User Score
              </h1>
              <h1 className="font-semibold">{Info.details.release_date}</h1>
              <h1>{Info.details.genres.map((G) => G.name).join(", ")}</h1>
              <h1>{Info.details.runtime}Min</h1>
            </div>

            {/* tagline */}
            <h1 className="text-xl font-semibold italic text-zinc-200">
              {Info.details.tagline}
            </h1>

            {/* overview */}
            <h1 className=" text-2xl mt-1 mb-1">overview</h1>
            <p className="text-sm  text-justify overflow-y-auto max-h-[8vh]">
              {Info.details.overview}
            </p>

            {/* Trailer */}
            <Link to={`${pathname}/trailer`}>
              <button className="mt-4 px-4 py-2 bg-[#6556CD] rounded-md font-bold  hover:scale-105 duration-300">
                <i className="ri-play-fill mr-1"></i>Watch Trailer
              </button>
            </Link>
          </div>
        </div>

        {/* watch provider and similar */}
        <div className="child 2 flex   justify-between  ">
          <div className=" w-[20%]  1">
            {Info.watchProvider && Info.watchProvider.flatrate && (
              <h1 className="text-zinc-200 font-semibold text-xl mt-3">
                Stream
              </h1>
            )}

            <div className="flex overflow-x-auto  pb-1 mt-4 gap-6 ">
              {Info.watchProvider &&
                Info.watchProvider.flatrate &&
                Info.watchProvider.flatrate.map((L) => (
                  <img
                    className="w-[2.5vw] h-[2.5vw] object-cover rounded-md "
                    src={`https://image.tmdb.org/t/p/original/${L.logo_path}`}
                  />
                ))}
            </div>

            {Info.watchProvider && Info.watchProvider.buy && (
              <h1 className="text-zinc-200 font-semibold text-xl mt-3">Buy</h1>
            )}

            <div className="flex overflow-x-auto pb-1 mt-4 gap-6">
              {Info.watchProvider &&
                Info.watchProvider.buy &&
                Info.watchProvider.buy.map((B) => (
                  <img
                    className="w-[2.5vw] h-[2.5vw] object-cover rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${B.logo_path}`}
                  />
                ))}
            </div>
            {Info.watchProvider && Info.watchProvider.rent && (
              <h1 className="text-zinc-200 font-semibold text-xl mt-3">Rent</h1>
            )}

            <div className="flex overflow-x-auto pb-1  mt-4 gap-6">
              {Info.watchProvider &&
                Info.watchProvider.rent &&
                Info.watchProvider.rent.map((R) => (
                  <img
                    className="w-[2.5vw] h-[2.5vw] object-cover rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${R.logo_path}`}
                  />
                ))}
            </div>

          </div>

          <div className="2  Recommendations 0 w-[76%] border-t border-zinc-300">
            <h1 className="text-2xl  text-zinc-100 font-semibold mb-4">
              Recommendations
            </h1>
            {
              <Recommendation
                data={
                  Info.recommendation.length > 0
                    ? Info.recommendation
                    : Info.similar
                }
              />
            }
          </div>
        </div>
      </div>

      {/* <div className="Parent A2 w-full h-screen text-white">ggg</div> */}
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;

// <h1 className="text-zinc-200 font-semibold text-xl mt-3">
//Rent
//</h1>
