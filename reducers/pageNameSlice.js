import { createSlice } from "@reduxjs/toolkit";

export const pageNameSlice = createSlice({
  name: "pageName",
  initialState: {
    pageName: "home",
  },
  reducers: {
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
  },
});

export const { setPageName } = pageNameSlice.actions;
export default pageNameSlice.reducer;
