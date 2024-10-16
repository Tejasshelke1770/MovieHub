import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import Tvshow from "./Components/Tvshow";
import People from "./Components/People";
import About from "./Components/About";
import MovieDetails from "./Components/MovieDetails";
import TvDetails from "./Components/TvDetails";
import PersonDetails from "./Components/PersonDetails";
import Trailer from "./Components/templates/Trailer";
import Notfound from "./Components/Notfound.jsx";

function App() {
  return (
    <div className="bg-[#1F1E24] h-screen w-screen flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<Tvshow />} />
        <Route path="/tv/details/:id" element={<TvDetails />} >
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
