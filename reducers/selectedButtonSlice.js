import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "home",
};

export const selectedButtonSlice = createSlice({
  name: "selectedButton",
  initialState,
  reducers: {
    setSelectedButton: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedButton } = selectedButtonSlice.actions;
export default selectedButtonSlice.reducer;
