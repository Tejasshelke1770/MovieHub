import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './Reducers/MovieSlice.jsx'
import tvReducer from './Reducers/TvSlice.jsx'
import personReducer from './Reducers/PersonSlice.jsx'

export const store = configureStore({
  reducer: {
    movie : movieReducer,
    tv : tvReducer,
    person : personReducer
  }
})