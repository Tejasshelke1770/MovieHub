import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Info: null
}

export const TvSlice = createSlice({
name:"tv", 
initialState,
reducers:{
    loadTv:(state, action)=>{
        state.Info = action.payload
    },
    removeTv:(state)=>{
        state.Info = null
    }
}
})

export const { loadTv, removeTv } = TvSlice.actions

export default TvSlice.reducer