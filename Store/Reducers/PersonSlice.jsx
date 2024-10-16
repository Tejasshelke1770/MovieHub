import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Info: null,
};

export const PersonSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loadPerson: (state, action) => {
      state.Info = action.payload;
    },
    removePerson: (state) => {
      state.Info = null;
    },
  },
});

export const { loadPerson, removePerson } = PersonSlice.actions;
export default PersonSlice.reducer;
