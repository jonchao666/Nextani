import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileDevice: null,
};

export const isMobileSlice = createSlice({
  name: "isMobile",
  initialState,
  reducers: {
    checkIsMobileState: (state) => {
      state.isMobileDevice =
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        (/iPad|Macintosh/i.test(navigator.userAgent) &&
          navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 1);
    },
  },
});

// Export actions
export const { checkIsMobileState } = isMobileSlice.actions;

// Export reducer
export default isMobileSlice.reducer;
