import { createSlice } from "@reduxjs/toolkit";
import { CentreWiseCacheByCenterID } from "./CommonExportFunction";

const initialState = {
  CentreWiseCache: [],
  GetMenuList: [
    // Smart Report
    {
      menuName: "Smart Report",
      menuOrder: "1",
      menuID: "86",
      menuIcon: "fas fa-tachometer-alt",
      children: [
        {
          childrenName: "Report Center",
          childrenOrder: "1",
          breadcrumb: "Smart Report/Report Center",
          url: "/report-center",
        },
        {
          childrenName: "Investigation",
          childrenOrder: "2",
          breadcrumb: "Smart Report/Investigation",
          url: "/investigation",
        },
        {
          childrenName: "Observation",
          childrenOrder: "2",
          breadcrumb: "Smart Report/Observation",
          url: "/observation",
        },
      ],
    },
    // {
    //   menuName: "Rate Master",
    //   menuOrder: "2",
    //   menuID: "84",
    //   menuIcon: "fas fa-tachometer-alt",
    //   children: [
    //     {
    //       childrenName: "Rate List",
    //       childrenOrder: "1",
    //       breadcrumb: "Rate Master / Rate List",
    //       url: "/ratelist",
    //     },
    //     {
    //       childrenName: "Test Master",
    //       childrenOrder: "2",
    //       breadcrumb: "Test Master / Test List",
    //       url: "/testList",
    //     },
    //   ],
    // },
    // {
    //   menuName: "Reprint",
    //   menuOrder: "3",
    //   menuID: "85",
    //   menuIcon: "fas fa-tachometer-alt",
    //   children: [
    //     {
    //       childrenName: "ReceiptReprint",
    //       childrenOrder: "1",
    //       breadcrumb: "Reprint/ Receipt Reprint",
    //       url: "/ReceiptReprint",
    //     },
    //   ],
    // },

    
  ],

  loading: false,
  error: "",
  message: "",
  success: false,
};

export const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CentreWiseCacheByCenterID.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(CentreWiseCacheByCenterID.fulfilled, (state, { payload }) => {
        state.CentreWiseCache = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(CentreWiseCacheByCenterID.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      });
  },
});

export default CommonSlice.reducer;
