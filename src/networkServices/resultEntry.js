import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";

export const BindDepartmentResultEntryLab = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "get",
      };
      const data = await makeApiRequest(`${apiUrls.BindDepartmentResultEntryLab}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };


  export const BindTestResultEntryLab = async () => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "get",
      };
      const data = await makeApiRequest(`${apiUrls.BindTestResultEntryLab}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  }; 
  

  export const TestResultEntryLab = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "get",
      };
      const data = await makeApiRequest(`${apiUrls.TestResultEntryLab}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };


  export const SearchResultEntryLab = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "POST",
        data: params,
      };
      const data = await makeApiRequest(`${apiUrls.SearchResultEntryLab}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
  

  
  export const LabObservationSearch = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "POST",
        data: params,
      };
      const data = await makeApiRequest(`${apiUrls.LabObservationSearch}`, options);
      store.dispatch(setLoading(false)); 
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };

    

  export const GetPatientInvsetigationsNameOnly = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "get",
      };
      const data = await makeApiRequest(`${apiUrls.GetPatientInvsetigationsNameOnly}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };



  export const SaveResultEntryLabdata = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "POST",
        data: params,
      };
      const data = await makeApiRequest(`${apiUrls.SaveResultEntryLab}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };


  export const BindAttachmentLab = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "POST",
        data: params,
      };
      const data = await makeApiRequest(`${apiUrls.BindAttachmentLab}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };


  export const LabSampleRejection = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "POST",
        data: params,
      };
      const data = await makeApiRequest(`${apiUrls.LabSampleRejection}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };


  // BindLabReport
 



  // export const BindTestDDLlab = async (params) => {
  //   store.dispatch(setLoading(true));
  //   try {
  //     const options = {
  //       method: "get",
  //       // data: params,
  //     };
  //     const data = await makeApiRequest(`${apiUrls.BindTestDdlLab}`, options);
  //     store.dispatch(setLoading(false));
  //     return data;
  //   } catch (error) {
  //     store.dispatch(setLoading(false));
  //     console.error("Error Found", error); 
  //   }
  // };


  export const BindTestDDLlab = async (params) => {
    store.dispatch(setLoading(true));
  
    try {
      // Construct the URL with query parameters
      const query = new URLSearchParams(params).toString();


      const urlWithParams = `${apiUrls.BindTestDdlLab}?${query}`;
  
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


  
  export const BindSampleinfo = async (params) => {
    store.dispatch(setLoading(true));
  
    try {
      // Construct the URL with query parameters
      const query = new URLSearchParams(params).toString();


      const urlWithParams = `${apiUrls.BindSampleinfo}?${query}`;
  
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
  
  

  export const BindLabReport = async (params) => {
    store.dispatch(setLoading(true)); 
    try {
      const options = {
        method: "Post",
        data: params,
      }; 
      const data = await makeApiRequest(apiUrls.BindLabReport, options);
      return data;
    } catch (error) {
      console.error("Error Add Expense", error);
    } finally {
      store.dispatch(setLoading(false));
    }
  };


  
  export const BindlabOutSource = async (params) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "get",
      };
      const data = await makeApiRequest(`${apiUrls.BindlabOutSource}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };


 