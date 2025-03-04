import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { setLoading } from "../loadingSlice/loadingSlice";
import makeApiRequest from "../../../networkServices/axiosInstance";
import { notify } from "../../../utils/utils";

// Token Management
export const getDashboard = createAsyncThunk(
  "getDashboardData",
  async (data, { dispatch }) => {
    const options = {
      method: "POST",
      data:data
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.HIMSDashboard}`, options);
      dispatch(setLoading(false));
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);
