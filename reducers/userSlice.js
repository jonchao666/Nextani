// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getIdToken } from "@/utils/firebaseAuth";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",

  async (thunkAPI) => {
    const idToken = await getIdToken();

    const response = await axios.get(`${process.env.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    return response.data;
  }
);

const initialState = {
  userData: null,
  loading: false,
  error: null,
  displayName: "",
  email: "",
  displayImageUrl: "",
  verifyingEmail: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDisplayImageUrl: (state, action) => {
      state.displayImageUrl = action.payload;
    },
    setVerifyingEmail: (state, action) => {
      state.verifyingEmail = action.payload;
    },
    setChangingDisplayName: (state, action) => {
      state.changingDisplayName = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.loading = false;
      state.error = null;
      state.displayName = "";
      state.email = "";
      state.displayImageUrl = "";
      state.verifyingEmail = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        // Set email, displayName, and displayImageUrl directly here
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.displayImageUrl =
          action.payload.profilePicture || `/DefaultProfilePicture.svg`;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  setDisplayName,
  setEmail,
  setDisplayImageUrl,
  setVerifyingEmail,
  setChangingDisplayName,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
