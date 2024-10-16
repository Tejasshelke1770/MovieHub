import { loadPerson } from "../Reducers/PersonSlice";
import axios from "../../src/Utils/Axios";

export const asyncLoadPerson = (id)=> async(dispatch, getState)=>{
    try {
        const details = await axios.get(`/person/${id}`)
        const external_ids = await axios.get(`/person/${id}/external_ids`)
        const combined_credits = await axios.get(`/person/${id}/combined_credits`)
        const movie_credits = await axios.get(`/person/${id}/movie_credits`)
        const tv_credits = await axios.get(`/person/${id}/tv_credits`)

        const data = {
            details: details.data,
            external_ids: external_ids.data,
            combined_credits: combined_credits.data,
            movie_credits : movie_credits.data,
            tv_credits : tv_credits.data,
        }
        dispatch(loadPerson(data))
    } catch (error) {
     console.log(error)   
    }
}