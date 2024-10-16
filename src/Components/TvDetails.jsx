import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { loadTv, removeTv } from "../../Store/Reducers/TvSlice";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadTv } from "../../Store/Actions/TvAction";
import Loading from "./Loading";
import { faImdb, faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Recommendation from "./templates/Recommendation";

const TvDetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { Info } = useSelector((state) => state.tv);
  console.log(Info);

  useEffect(() => {
    dispatch(asyncloadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);
  return Info ? (
    <div
      className="w-screen h-screen overflow-y-auto px-[10%] "
      style={{
        background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7)), 
    url(https://image.tmdb.org/t/p/original/${Info.details.backdrop_path})`,
        backgroundSize: "contain, cover",
        backgroundPosition: "center ",
      }}
    >
      <nav className="h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
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

      <div className="flex flex-col">
        {/* image and details */}
        <div className="flex gap-6">
          <img
            className="image shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]  h-[45vh] object-cover rounded"
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
            alt="image not available"
          />

          <div 
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5);",
            backdropFilter: "blur(1px)",
            borderRadius: "15px",
          }}
          className="details w-full  text-white ml-[5%] "
          >
            <h1 className="text-5xl font-black  text-white leading-0 ">
              {Info.details.name || Info.details.original_name}
              <sup>
                <small className="text-xl font-bold text-zinc-300">
                  {Info.details.first_air_date.split("-")[0]}
                </small>
              </sup>
            </h1>

            <div className="details flex gap-x-5 items-center mt-3 mb-3">
              <span className="rounded-full text-xl font-semibold text-white bg-yellow-500 flex items-center justify-center h-[6vh] w-[6vh] ">
                {(Info.details.vote_average * 10).toFixed()} <sup>%</sup>
              </span>

              <h1 className="font-semibold text-2xl w-[60px] leading-6">
                User Score
              </h1>
              <h1 className="font-semibold text-nowrap">
                {Info.details.first_air_date}
              </h1>
              <h1 className="text-wrap	">
                {Info.details.genres.map((G) => G.name).join(", ")}
              </h1>
              <div className="min-w-40 ">
                {Info.details.number_of_seasons} seasons{" "}
                {Info.details.number_of_episodes} Episodes
              </div>
            </div>

            {Info.details.tagline.length > 0 ? (
              <h1 className="text-xl font-semibold italic text-zinc-200 ">
                {Info.details.tagline}
              </h1>
            ) : (
              ""
            )}

            <h1 className="text-2xl my-1 ">overview</h1>
            <p className="text-sm  text-justify overflow-y-auto max-h-[8vh]">
              {Info.details.overview}
            </p>

            <Link to={`${pathname}/trailer`}>
              <button className="mt-4 px-4 py-2 bg-[#6556CD] rounded-md font-bold  hover:scale-105 duration-300 ">
                <i className="ri-play-fill mr-1"></i> Watch Trailer
              </button>
            </Link>
          </div>
        </div>
        {/* watchprovider & recommendations */}
        <div className="flex justify-between ">
          <div className="watchProviders w-[20%] ">
            {Info.watchProvider && Info.watchProvider.ads ? (
              <h1 className="text-xl text-white font-semibold mt-3">Ads</h1>
            ) : (
              ""
            )}

            <div className="flex pb-1 mt-4 gap-6 overflow-x-auto">
              {Info.watchProvider && Info.watchProvider.ads
                ? Info.watchProvider.ads.map((A) => (
                    <img
                      className="w-[2.5vw] h-[2.5vw] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${A.logo_path}`}
                    />
                  ))
                : ""}
            </div>

            {Info.watchProvider && Info.watchProvider.free ? (
              <h1 className="text-xl text-white font-semibold mt-3">free</h1>
            ) : (
              ""
            )}

            <div className="flex pb-1 mt-4 gap-6 overflow-x-auto">
              {Info.watchProvider && Info.watchProvider.free
                ? Info.watchProvider.free.map((F) => (
                    <img
                      className="w-[2.5vw] h-[2.5vw] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${F.logo_path}`}
                    />
                  ))
                : ""}
            </div>

            {Info.watchProvider && Info.watchProvider.flatrate ? (
              <h1 className="text-xl text-white font-semibold mt-3">stream</h1>
            ) : (
              ""
            )}

            <div className="flex pb-1 mt-4 gap-6 overflow-x-auto">
              {Info.watchProvider && Info.watchProvider.flatrate
                ? Info.watchProvider.flatrate.map((F) => (
                    <img
                      className="w-[2.5vw] h-[2.5vw] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${F.logo_path}`}
                    />
                  ))
                : ""}
            </div>
          </div>

          <div className="recommendation w-[76%] border-t">
            <h1 className="text-2xl  text-zinc-100 font-semibold mb-4">
              Recommendations
            </h1>
            <Recommendation
              data={
                Info.recommendation.length > 0
                  ? Info.recommendation
                  : Info.similar
              }
            />
          </div>
        </div>

      </div>

    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
