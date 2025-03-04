import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "@app/store/reducers/ui";

import {
  CommonSlice,
  DashboardSlices,
  TokenManagementSlice,
  authSlice,
  loadingSlice,
  logoutSlice,
  vitalSignSlice,
} from "./reducers";
// import logger from "redux-logger";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    authSlice: authSlice,
    loadingSlice: loadingSlice,
    CommonSlice: CommonSlice,
    logoutSlice:logoutSlice,
    TokenManagementSlice:TokenManagementSlice,
    DashboardSlices:DashboardSlices,
    vitalSignSlice:vitalSignSlice
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
