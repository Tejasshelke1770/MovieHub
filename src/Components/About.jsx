import React from "react";

const stats = [
  {num: '969,868', cat:"Movies*"},
  {num: '180,821', cat:"TV Shows*"},
  {num: '301,695', cat:"TV Seasons"},
  {num: '4,808,026', cat:"TV Episodes"},
  {num: '3,617,196', cat:"People*"},
  {num: '6,259,736', cat:"Images"},
  {num: '570,924', cat:"Edit last week"},
]
const info = [
  {num :1, para: 'Every year since 2008, the number of contributions to our database has increased (check out our last years wrap!) Withover 1,500,000 developers and companies using our platform, MovieHub has become a premiere source for metadata.'},
  {num :2, para: 'Along with extensive metadata for movies, TV shows and people,we also offer one of the best selections of high resolutionposters and fanart. On average, over 1,000 images are added every single day.'},
  {num :3, para: "We're international. While we officially support 39 languages we also have extensive regional data. Every single day TMDB is used in over 180 countries."},
  {num :4, para: "Our community is second to none. Between our staff and community moderators, we're always here to help. We're passionate about making sure your experience on TMDB is nothing short of amazing."},
  {num :5, para: "Trusted platform. Every single day our service is used by millions of people while we process over 3 billion requests. We've proven for years that this is a service that can be trusted and relied on."},
]

const About = () => {
  return (
    <div className="scroll-smooth w-full h-full overflow-x-hidden ">
    <div
      className="w-full  bg-[#1F1E24]"
      style={{
        backgroundImage: "radial-gradient(at 25% top, #32112c 0, #0a1526 40%)",
      }}
    >
      <div style={{
          backgroundImage:
            "url(https://www.themoviedb.org/assets/2/v4/marketing/red_pipes-594140f35efb300741add9827cc4f41053b0a4bb7ba249a40375377cc9d22d47.svg)",
          backgroundSize: "contain",
          backgroundPosition: "center -180px",
          backgroundRepeat:'repeat-y'
          
        }}
        
        className="image  "
      >
        <div className="content w-[800px] mx-auto  pt-20 flex flex-col items-center relative ">
          <h1
            style={{
              fontFamily: "Shrikhand, cursive",
              fontWeight: "400",
              fontStyle: "italic",
            }}
            className=" text-[10rem] text-white select-none"
          >
            Hi there,
          </h1>
          <img
            src="https://www.themoviedb.org/assets/2/v4/marketing/deadpool-06f2a06d7a418ec887300397b6861383bf1e3b72f604ddd5f75bce170e81dce9.png"
            style={{ marginTop: "-130px", marginLeft: "55px" }}
          />
          <h3 className="text-[4rem] font-bold leading-tight text-white tracking-tight mt-5 mb-3	">
            Let's talk about Movie<span className="text-orange-400">Hub</span>
          </h3>
          <p className="text-[1.1rem] font-semibold text-center text-white leading-5">
            The Movie Database (TMDB) is a community built movie and TV
            database. Every piece of data has been added by our amazing
            community dating back to 2008. TMDB's strong international focus and
            breadth of data is largely unmatched and something we're incredibly
            proud of. Put simply, we live and breathe community and that's
            precisely what makes us different.
          </p>
          <h4 className="text-white text-3xl font-bold mt-16 mb-10">
            The MovieHub advantage
          </h4>
          <div className="w-full text-white ">
            {info.map((e, i)=>(
                <div className="flex items-start w-full mb-4 ">
                <div className="w-[6vw]  text-[#6556CD]  font-bold text-[3rem] leading-none">
                  {e.num}
                </div>
                <p className="text-[1.1rem] font-semibold text-left leading-5 w-[63vw]">
                  {e.para}
                </p>
              </div>
            ) )}
            
            <div className="w-full flex justify-center ">
            <button className="px-4 py-2 bg-white my-16 duration-300 text-l rounded font-bold text-[#6556CD] hover:bg-[#6556CD]  hover:text-white">Contact MovieHub</button>
            </div>
          </div>
        </div>
        <div className="w-full py-[5%] bg-white">
        <div className="w-full px-[17%]  h-[55vh] bg-white flex items-center justify-center gap-4">
        <i class="ri-arrow-drop-left-line text-6xl"></i>
        <img src="https://www.themoviedb.org/assets/2/v4/marketing/logos/plex_pms_icon_300-ca5eafe435c01b120e3a0bbe1ee0ff27d3d87ac91f023d3cba6d09406151d692.png"  />
        <div className="flex flex-col justify-start ">
          <h2 className="text-[1.2rem] font-semibold px-3  leading-none mb-4">The MovieHub product, service, attitude and support are truly top notch. We love how they support their community and the passion with which they have built an amazing asset that our users can enjoy!</h2>
          <hr />
          <p className="mt-3 px-3 italic font-semibold">Scott Olechowski, Chief Product Officer & Co-founder of Plex, Inc.</p>
        </div>
        <i class="ri-arrow-drop-right-line text-6xl"></i>
        </div>
        </div>
        <div className="w-full footer px-[20%] bg-white flex items-center pb-10">
          <div className="content w-[65%] ">
            <h1 className="text-3xl font-semibold">Stats</h1>
            <p className="text-xs mt-2">We all love them. Here's a few that we find interesting.</p>
            <div className="numbers flex gap-x-10 gap-y-3 justify-start items-start flex-wrap  pt-3">
            {stats.map((stat, ind)=>(
                <div className="w-[19%]">
                  <h1 className="text-bold text-2xl">{stat.num}</h1>
                  <p className=" text-xs">{stat.cat}</p>
                </div>
            ) )}
            </div>
            <p className="opacity-50 mt-3">* These counts do not include adult content.</p>
            <button className="px-4 py-2 bg-red-700 mt-6 duration-300 text-l rounded font-bold text-white hover:bg-black  hover:text-red-700">Contact MovieHub</button>
          </div>
          <div className="">
            <img src="https://www.themoviedb.org/assets/2/v4/marketing/sheldon-1a29d9f7807771f061c5a3799a61ed2f0a84505553c70fc99719df02335d9746.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default About;


