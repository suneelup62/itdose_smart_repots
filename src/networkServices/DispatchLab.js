 
import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";

// export const DispatchResultEntryLab = async (params) => {
//     store.dispatch(setLoading(true));
//     try {
//       const options = {
//         method: "get",
//       };
//       const data = await makeApiRequest(`${apiUrls.DispatchResultEntryLab}`, options);
//       store.dispatch(setLoading(false));
//       return data;
//     } catch (error) {
//       store.dispatch(setLoading(false));
//       console.error("Error Found", error); 
//     }
//   };


//   export const TestResultEntryLab = async (params) => {
//     store.dispatch(setLoading(true));
//     try {
//       const options = {
//         method: "get",
//       };
//       const data = await makeApiRequest(`${apiUrls.TestResultEntryLab}`, options);
//       store.dispatch(setLoading(false));
//       return data;
//     } catch (error) {
//       store.dispatch(setLoading(false));
//       console.error("Error Found", error); 
//     }
//   };


  export const DispatchResultEntryLab = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "POST",
        data: params,
      };
      const data = await makeApiRequest(`${apiUrls.DispatchResultEntryLab}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
  

  
//   export const LabObservationSearch = async (params) => {
//     store.dispatch(setLoading(true));
//     try {
//       const options = {
//         method: "POST",
//         data: params,
//       };
//       const data = await makeApiRequest(`${apiUrls.LabObservationSearch}`, options);
//       store.dispatch(setLoading(false));
//       return data;
//     } catch (error) {
//       store.dispatch(setLoading(false));
//       console.error("Error Found", error); 
//     }
//   };

    

//   export const GetPatientInvsetigationsNameOnly = async (params) => {
//     store.dispatch(setLoading(true));
//     try {
//       const options = {
//         method: "get",
//       };
//       const data = await makeApiRequest(`${apiUrls.GetPatientInvsetigationsNameOnly}`, options);
//       store.dispatch(setLoading(false));
//       return data;
//     } catch (error) {
//       store.dispatch(setLoading(false));
//       console.error("Error Found", error); 
//     }
//   };


