import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, } from "react-router-dom";
import Notfound from '../Notfound.jsx'

const Trailer = () => {
const {pathname} = useLocation();
const Navigate = useNavigate();
const reducer = pathname.includes('movie') ? 'movie' : 'tv';
const ytVideo = useSelector((state) => state[reducer].Info.video) 
 
  return (
    <div className="absolute top-[3%] h-[96vh] w-[80vw] z-10 px-10 py-10  flex items-center justify-center "
    style={{
        backgroundColor: "rgba(255, 255, 255, 0.5);",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
      }}
    >
      <div className=" relative h-full w-full ">
        {ytVideo && ytVideo.key  ?  <ReactPlayer controls={true} width={'100%'} height={'100%'}  
        url={`https://www.youtube.com/watch?v=${ytVideo.key}`} /> : <Notfound /> }
      </div>

      <div
        className="absolute top-[0] right-[1%] text-3xl text-white cursor-pointer "
        onClick={() => Navigate(-1)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>

    </div>
  );
};

export default Trailer;
