// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",

  async (jwt, thunkAPI) => {
    const response = await axios.get(`${process.env.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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
  changingDisplayName: false,
  deletingAccount: false,
  showDeleteAccountPage: false,
  verifyingDeleteAccount: false,
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
    setDeletingAccount: (state, action) => {
      state.deletingAccount = action.payload;
    },
    setShowDeleteAccountPage: (state, action) => {
      state.showDeleteAccountPage = action.payload;
    },
    setVerifyingDeleteAccount: (state, action) => {
      state.verifyingDeleteAccount = action.payload;
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
          action.payload.profilePicture ||
          `${process.env.API_URL}/profilePicture/defaultImage.svg`;
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
  setDeletingAccount,
  setShowDeleteAccountPage,
  setVerifyingDeleteAccount,
} = userSlice.actions;

export default userSlice.reducer;
