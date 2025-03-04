import { apiUrls } from "../networkServices/apiEndpoints";
import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { notify } from "../utils/utils";
import makeApiRequest from "./axiosInstance";

export const getDashboard = async (params) => {
  // console.log(params);
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };

    const data = await makeApiRequest(`${apiUrls?.HIMSDashboard}`, options);
    if (data.status === true) {
      notify(data.message, "success");
    }

    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Add Expense", error);
  }
};

export const getDashboardDataTYPEID = async (params) => {
  // console.log(params);
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };

    const data = await makeApiRequest(
      `${apiUrls.HIMSDashboardTYPEID}`,
      options
    );
    if (data.status === true) {
      notify(data.message, "success");
    }
    // console.log(data);
    // if(data?.data?.success === false){
    //     console.log(data?.data?.message);
    //   notify(data?.data?.message, "error")
    // }

    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Add Expense", error);
  }
};

export const DashboardMISUserWiseGraphSetting = async (params) => {
  // console.log(params);
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };

    const data = await makeApiRequest(
      apiUrls.DashboardMISUserWiseGraphSetting,
      options
    );
    if (data.status === true) {
      notify(data.message, "success");
    }
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Add Expense", error);
  }
};

export const CommonAPIGetEmpBirthDay = async () => {
  try {
    const options = {
      method: "get",
    };

    const data = await makeApiRequest(apiUrls.CommonAPIGetEmpBirthDay, options);
    return data;
  } catch (error) {
    console.log(error, "SomeThing Went Wrong");
  }
};
