import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";

export const SearchLabSeet = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(`${apiUrls.SearchLabSeet}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};
 
export const handleLabWorkSheet = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(`${apiUrls.LabWorkSheet}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error); 
  }
};

 
// MicroLabEntry API Controllers 


export const MicroLabEntryy = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(`${apiUrls.MicroLabEntry}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};

 

// export const MicroLabEntrySavedData = async (params) => {
//   store.dispatch(setLoading(true));
//   try {
//     const options = {
//       method: "get",
//       // data: params,
//     };
//     const data = await makeApiRequest(`${apiUrls.MicroEntrySavedData}`, options);
//     store.dispatch(setLoading(false));
//     return data;
//   } catch (error) {
//     store.dispatch(setLoading(false));
//     console.error("Error Found", error); 
//   }
// };


export const MicroLabEntrySavedData = async (params) => {
  store.dispatch(setLoading(true));

  try {
    // Construct the URL with query parameters
    const query = new URLSearchParams(params).toString();


    const urlWithParams = `${apiUrls.MicroEntrySavedData}?${query}`;

    const options = {
      method: "GET", 
    };
 
    const data = await makeApiRequest(urlWithParams, options);

    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};
