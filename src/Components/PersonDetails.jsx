import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncLoadPerson } from "../../Store/Actions/PersonAction";
import { removePerson } from "../../Store/Reducers/PersonSlice";
import Loading from "./Loading";
import noimage from "/noimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb, faInstagram, faTwitter, faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const Navigate = useNavigate()
  const { Info } = useSelector((state) => state.person);
  // console.log(Info);
  const [Category, setCategory] = useState('movie')

  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  return Info ? (
    <div className="w-full h-full px-[10%]  overflow-x-hidden">
      <nav className="h-[10vh] w-[800px] text-2xl flex items-center ">
      <i
      onClick={() => Navigate(-1)}
      className="ri-arrow-left-line text-white mr-3  hover:text-[#6556CD] "
      ></i>
      </nav>
     <div className="flex justify-between">
          {/* COL-1 image and info */}
          <div className="w-[23%] h-full flex flex-col  ">
            <div className="IMAGE h-[60vh] mb-5">
              <img className=" h-[100%] object-cover rounded-md shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
              src={Info.details.profile_path ? `https://image.tmdb.org/t/p/original/${Info.details.profile_path}` :noimage } alt="" />
            </div>
          
            <div className="DETAILS ">
              <div className="SOCIALS text-white text-2xl w-full flex gap-6 items-center mb-5">
            {Info.external_ids.instagram_id  &&  
            <a 
            target="_blank"
            href={`https://www.instagram.com/${Info.external_ids.instagram_id}/`}
            >
              <FontAwesomeIcon icon={faInstagram} />
              </a>}
            {Info.external_ids.imdb_id &&  
              <a
              target="_blank" 
              href={`https://www.imdb.com/name/${Info.external_ids.imdb_id}/`}
            >
              <FontAwesomeIcon icon={faImdb} />
            </a>}
            {Info.external_ids.wikidata_id && 
              <a
              target="_blank" 
              href={`https://www.wikidata.org/wiki/${Info.external_ids.wikidata_id}`}        >
              <FontAwesomeIcon icon={faWikipediaW} />
            </a> }
            {Info.external_ids.twitter_id && 
              <a
              target="_blank" 
              href={`https://x.com/${Info.external_ids.twitter_id}`}        >
              <FontAwesomeIcon icon={faTwitter} />
            </a> }
              </div>
              <div className="INFO text-white">
                <h1 className="text-xl font-semibold mb-4">Personal Info</h1>

                <h2 className="font-semibold ">known For</h2>
                <p className="mb-4 leading-3">{Info.details.known_for_department}</p>

                <h2 className="font-semibold ">Gender</h2>
                <p className="mb-4 leading-3">{Info.details.gender === 1 ? 'Female' : 'Male'}</p>

                <h2 className="font-semibold ">Birthday</h2>
                <p className="mb-4 leading-3">{Info.details.birthday}</p>
                
                <h2 className="font-semibold ">Place of Birth</h2>
                <p className="mb-4 leading-3">{Info.details.place_of_birth}</p>

                <h2 className="font-semibold mb-1">Also Known As</h2>
                {Info.details.also_known_as.map((e, i) => <p key={i}>{e}</p> )}
              </div>
            </div>
          </div>

          {/* COL-2 description and acting */}
          <div className="w-[75%] ">
            <h1 className="text-4xl text-white font-bold mb-5">{Info.details.name}</h1>
            <h2 className="font-semibold text-white text-2xl mt-1 mb-1">Biography</h2>
            <p className="max-h-[35vh] px-1 overflow-y-auto text-white text-sm text-justify">{Info.details.biography}</p>

            <h2 className="mt-4 mb-2 text-2xl text-white font-semibold">Known For</h2>
              <HorizontalCards data={Info.combined_credits.cast} />

              <div className="w-[full] flex justify-between items-center">
              <h1 className="text-xl font-semibold text-white">Acting</h1>
              <Dropdown 
              title={'Category'} 
              options={['tv', 'movie']} 
              func={(e) => setCategory(e.target.value)} />
              </div>

              <div className="ACTING link-disc w-full h-[50vh]  overflow-x-hidden shadow-2xl shadow-zinc-700 border-2 border-zinc-700 mt-4">
                {  Info[Category + '_credits'].cast.map((e, i) => {
                  return (
                    <li className="p-5 text-zinc-400 hover:text-white " key={i}>
                    <Link to={`/${Category}/details/${e.id}`}  >
                      <span>{e.original_title || e.title || e.original_name || e.name} &nbsp;
                      ({e.first_air_date ? e.first_air_date &&  e.first_air_date.split('-')[0] : e.release_date &&  e.release_date.split('-')[0] }) </span>
                      {e.character && 
                      <span className="block ml-5"> <small>as</small> {e.character}</span>
                      }
                    </Link>
                    </li>
                  )
                }) }
              </div>

          </div>

     </div>
     <div className="Footer w-full h-[10vh] "></div>

    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;



// {Info.details.gender === 1 ? <p className="mb-3 leading-3">Female</p> : <p className="mb-3 leading-3">Male</p> }