import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCentreNameAPI } from "../../../networkServices/smartReport";

// Async thunk for fetching centre names
export const getCentreNameAction = createAsyncThunk(
  "center/getCentreName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetCentreNameAPI();
      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.message || "Failed to fetch centres");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Slice
const centerSlice = createSlice({
  name: "center",
  initialState: {
    centres: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCentreNameAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCentreNameAction.fulfilled, (state, action) => {
        state.loading = false;
        state.centres = action.payload;
      })
      .addCase(getCentreNameAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default centerSlice.reducer;
