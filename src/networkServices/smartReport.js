 

import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";

//Smart Report Centre

// Get State
export const bindState = async () => {
  store.dispatch(setLoading(true));
  try {
    const options = {
        method: "get", 
    //   data: params,
    };
    const data = await makeApiRequest(`${apiUrls.bindState}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error); 
  }
};

//Bind City
export const smartReportBindCity = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.bindCity}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };

  // Smart Report Add Centre
export const smartReportNewAddCentre = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.addCentre}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };

   // Smart Report Update Centre
export const smartReportUpdateCentre = async (payload) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "Post",
      data: payload,
    };
    const data = await makeApiRequest(`${apiUrls.updateCentre}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error); 
  }
};

// Smart Report Center GetData
  export const ReportCentreGetData = async () => {
    store.dispatch(setLoading(true));
    try {
      const options = {
          method: "get", 
      };
      const data = await makeApiRequest(`${apiUrls.CentreGetData}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
// Smart Report Center Master bindclient
  export const CenterMasterBindclient = async () => {
    store.dispatch(setLoading(true));
    try {
      const options = {
          method: "get", 
      };
      const data = await makeApiRequest(`${apiUrls.bindclient}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
// Add Investigation Submit
  export const addInvestigationSubmit = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.addInvestigation}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
// /InvestigationMaster Bindsearchgrid
  export const InvestigationMasterBindsearchgrid = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.Bindsearchgrid}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
// Investigation Master Bind Testgrid
  export const InvestigationMasterBindTestgrid = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.BindTestgrid}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
// InvestigationMaster Updatetest
  export const InvestigationMasterUpdatetest = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.updatetest}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
  
// ObservationMaster Add Observation
  export const ObservationMasterAddObservation = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.AddObservation}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
// ObservationMaster Update Observation
  export const ObservationMasterUpdateObservation = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.UpdateObservation}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
//  ObservationMaster Remove Observation
  export const ObservationMasterRemoveObservation = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.RemoveObserv}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
  
 // ObservationMaster BindObservgrid
  export const ObservationMasterBindObservgrid = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.BindObservgrid}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
  
// SmartReportMaster InvestigationMaster BindInvestigation
export const BindInvestigationTestCode = async (payload) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "Post",
      data: payload,
    };
    const data = await makeApiRequest(`${apiUrls.InvestigationBindInvestigation}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error); 
  }
};
  // SmartReportMaster Investigation Description
  export const MasterInvestigationDescription = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.InvestigationDescription}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };

  // SmartReportMaster Investigation Riskfactor
  export const MasterInvestigationRiskfactor = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.InvestigationRiskfactor}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
  
  // SmartReportMaster Centre QRCode
  export const CentreQRCode = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.QRCode}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
  // SmartReportMaster Centre_DoctorSignature
  export const CentreDoctorSignature = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.DoctorSignature}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
 // SmartReportMaster Investigation Format
  export const Investigation_Format = async (payload) => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
        data: payload,
      };
      const data = await makeApiRequest(`${apiUrls.InvFormat}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
 // SmartReportMaster Investigation Format
  export const InvestigationMasterDownloadToExcel = async () => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "get",
        responseType: "blob" 
      };
      const data = await makeApiRequest(`${apiUrls.DownloadToExcel}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };

  // SmartReportMaster Investigation Format
  export const InvestigationMasterUploadToExcel = async () => {
    store.dispatch(setLoading(true));
    try {
      const options = {
        method: "Post",
      };
      const data = await makeApiRequest(`${apiUrls.UploadToExcel}`, options);
      store.dispatch(setLoading(false));
      return data;
    } catch (error) {
      store.dispatch(setLoading(false));
      console.error("Error Found", error); 
    }
  };
  