import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthState: (state) => {
      const token = localStorage.getItem("jwt");
      state.isAuthenticated = !!token;
    },
  },
});

// Export actions
export const { checkAuthState } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
