import axios from "../../src/Utils/Axios";
import { loadMovie } from "../Reducers/MovieSlice";

export const asyncloadMovies = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const external_ids = await axios.get(`/movie/${id}/external_ids`);
    const recommendation = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const video = await axios.get(`/movie/${id}/videos`);
    const watchProvider = await axios.get(`/movie/${id}/watch/providers`);

    const data = {
      details: details.data,
      external_ids: external_ids.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t => t.name) ,
      video: video.data.results.find((m) => m.type === "Trailer"),
      watchProvider: watchProvider.data.results.IN ,
    };
    dispatch(loadMovie(data));
  } catch (error) {
    console.log(error);
  }
};
