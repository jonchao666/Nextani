// sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { toggleSidebar, setShowSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
