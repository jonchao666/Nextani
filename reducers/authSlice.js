import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const verifyAuth = createAsyncThunk(
  "auth/verifyAuth",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.API_URL}/auth/verifyToken`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error verifying auth:", error);
      return false;
    }
  }
);

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.fulfilled, (state, action) => {
        // handle the fulfilled state
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        // handle the rejected state
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const { setIsAuthenticated } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
