import { createSlice } from "@reduxjs/toolkit";

export const sidebarVisibilitySlice = createSlice({
  name: "sidebarVisibility",
  initialState: {
    showSidebars: true,
  },
  reducers: {
    setShowSidebars: (state, action) => {
      state.showSidebars = action.payload;
    },
  },
});

export const { setShowSidebars } = sidebarVisibilitySlice.actions;
export default sidebarVisibilitySlice.reducer;
