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
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
    },
  },
});

// Export actions
export const { checkIsMobileState } = isMobileSlice.actions;

// Export reducer
export default isMobileSlice.reducer;
