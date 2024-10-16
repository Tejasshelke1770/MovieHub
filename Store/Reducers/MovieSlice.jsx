import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Info: null
}

export const MovieSlice = createSlice({
    name:'movie',
    initialState,
    reducers: {
      loadMovie:(state, action)=>{
        state.Info = action.payload
      },
      removeMovie:(state)=>{
        state.Info = null
      }
    }
})

export const { loadMovie, removeMovie } = MovieSlice.actions

export default MovieSlice.reducer