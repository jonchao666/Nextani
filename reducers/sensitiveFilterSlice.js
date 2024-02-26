import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIsSensitiveFilterDisabled = createAsyncThunk(
  "settings/fetchIsSensitiveFilterDisabled",
  async (jwt, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/user/isSensitiveFilterDisabled`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data.isSensitiveFilterDisabled;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 创建一个slice来管理状态和reducers
const isSensitiveFilterDisabledSlice = createSlice({
  name: "isSensitiveFilterDisabled",
  initialState: {
    isSensitiveFilterDisabled: false,
    loading: false,
    error: null,
  },
  reducers: {
    setIsSensitiveFilterDisabled(state, action) {
      state.isSensitiveFilterDisabled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIsSensitiveFilterDisabled.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIsSensitiveFilterDisabled.fulfilled, (state, action) => {
        state.isSensitiveFilterDisabled = action.payload;
        state.loading = false;
      })
      .addCase(fetchIsSensitiveFilterDisabled.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setIsSensitiveFilterDisabled } =
  isSensitiveFilterDisabledSlice.actions;
export default isSensitiveFilterDisabledSlice.reducer;
