import axios from "../../src/Utils/Axios";
import {loadTv} from '../Reducers/TvSlice' ;

export const asyncloadTv = (id)=>async(dispatch, getState)=>{
try {
    const details = await axios.get(`/tv/${id}`);
    const external_ids = await axios.get(`/tv/${id}/external_ids`);
    const recommendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const video = await axios.get(`/tv/${id}/videos`);
    const watchProvider = await axios.get(`/tv/${id}/watch/providers`);

    const data = {
      details: details.data,
      external_ids: external_ids.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t => t.name) ,
      video: video.data.results.find((t) => t.type === "Trailer"),
      watchProvider: watchProvider.data.results.IN ,
    };
    dispatch(loadTv(data));
} catch (error) {
    console.log(error);
}
}  


