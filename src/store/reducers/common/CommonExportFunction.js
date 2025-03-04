import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../loadingSlice/loadingSlice";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import makeApiRequest from "../../../networkServices/axiosInstance";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";

export const CentreWiseCacheByCenterID = createAsyncThunk(
  "CentreWiseCache",
  async ({ centreID }, { dispatch }) => {
    const options = {
      method: "GET",
    };

    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.CentreWiseCacheByCenterID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const CentreWisePanelControlCache = createAsyncThunk(
  "CentreWisePanelControlCache",
  async ({ centreID }, { dispatch }) => {
    const options = {
      method: "GET",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.CentreWisePanelControlCache}?CentreID=${centreID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const getEmployeeWise = createAsyncThunk(
  "centre",
  async ({ employeeID }, { dispatch }) => {
    const options = {
      method: "GET",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.EmployeeWiseCentreList}?EmployeeId=${employeeID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetBindMenu = createAsyncThunk(
  "BindMenu",
  async ({ RoleID }, { dispatch }) => {
    // console.log("RoleID", RoleID);
    const options = {
      method: "GET",
    };
    try {
      dispatch(setLoading(true));
      // const data = await makeApiRequest(
      //   `${apiUrls.BindMenuList}?RoleID=${RoleID}`,
      //   options
      // );
      const newdata = {
        success: true,
        data: [
          {
            menuName: "Rate Master",
            menuOrder: "1",
            menuID: "84",
            menuIcon: "fas fa-tachometer-alt",
            children: [
              {
                childrenName: "Rate List",
                url: "/ratelist",
                childrenOrder: "1",
                breadcrumb: "Rate Master / Rate List",
              },
              {
                childrenName: "Test Master",
                url: "/testList",
                childrenOrder: "2",
                breadcrumb: "Test Master / Test List",
              },
              // {
              //   childrenName: "View Issues",
              //   url: "/viewissues",
              //   childrenOrder: "2",
              //   breadcrumb: "Tickets / View Issues",
              // },
              // {
              //   childrenName: "Summary",
              //   url: "/Summary",
              //   childrenOrder: "3",
              //   breadcrumb: "Tickets / Summary",
              // },
              // {
              //   childrenName: "Report Issue",
              //   url: "/reportissue",
              //   childrenOrder: "4",
              //   breadcrumb: "Tickets / New Ticket",
              // },
              // {
              //   childrenName: "Circular",
              //   url: "/Circular",
              //   childrenOrder: "5",
              //   breadcrumb: "Tickets / Circular",
              // },
              // {
              //   childrenName: "DeveloperCalendar",
              //   url: "/DeveloperCalendar",
              //   childrenOrder: "6",
              //   breadcrumb: "Tickets / Developer Calendar",
              // },
            ],
          },
         
        ],

        message: "",
      };
      dispatch(setLoading(false));
      return newdata;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const getNotification = createAsyncThunk(
  "GetNotify",
  async ({ RoleID, EmployeeID, CentreID }, { dispatch }) => {
    const options = {
      method: "GET",
    };
    try {
      dispatch(setLoading(true));
      const data = await makeApiRequest(
        `${apiUrls.getNotificationDetail}?RoleID=${RoleID}&EmployeeID=${EmployeeID}&CentreID=${CentreID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetRoleListByEmployeeIDAndCentreID = createAsyncThunk(
  "GetRoleList",
  async ( payload , { dispatch }) => {
    const options = {
      method: "Post",
      data:payload
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindRoleVsMenu_File}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetBindReferDoctor = createAsyncThunk(
  "GetBindDoctorList",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
      data,
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.BindReferDoctor}`, options);
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetBindReferalType = createAsyncThunk(
  "getReferTypeList",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
      data,
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.BindRefferalType}`, options);
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetBindDepartment = createAsyncThunk(
  "GetBindDepartmentList",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
      data: {
        centreID: "1",
        TypeID: "5",
      },
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindDepartment}?TypeID=5`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);
export const BindSeeMoreList = createAsyncThunk(
  "BindSeeMoreList",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
      data: {
        centreID: "1",
        TypeID: "5",
      },
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.BindSeeMoreList}`, options);
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetPanelDocument = createAsyncThunk(
  "getPanelDocumentList",
  async ({ PanelID }, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.GetPanelDocument}?PanelID=${PanelID}`,
        options
      );

      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetPatientUploadDocument = createAsyncThunk(
  "getPatientUploadDocument",
  async ({ patientID }, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.GetPatientUploadDocument}?patientID=${patientID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const ReferenceTypeInsert = createAsyncThunk(
  "REFERENCETYPE",
  async (data, { dispatch }) => {
    const options = {
      method: "POST",
      data,
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(apiUrls.CreateTypeOfReference, options);
      dispatch(setLoading(false));
      if (data?.status) {
        notify(data?.message, "success");
      } else {
        notify(data?.message, "error");
      }
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);
export const ProjectList = createAsyncThunk(
  "ProjectSelect",
  async (payload, { dispatch }) => {
    const options = {
      method: "POST",
      data: payload,
    };
    dispatch(setLoading(true));
    try {
      const response = await makeApiRequest(apiUrls.ProjectSelect, options);
      dispatch(setLoading(false));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      notify(error?.message || "An error occurred", "error");
      throw error; // Ensure the error is rethrown for any further handling upstream
    }
  }
);
export const RoleList = createAsyncThunk(
  "login",
  async (payload, { dispatch }) => {
    const options = {
      method: "POST",
      data: payload,
    };
    dispatch(setLoading(true));
    try {
      const response = await makeApiRequest(apiUrls.login, options);
      dispatch(setLoading(false));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      notify(error?.message || "An error occurred", "error");
      throw error; // Ensure the error is rethrown for any further handling upstream
    }
  }
);

export const GetAdvanceReason = createAsyncThunk(
  "GetAdvanceReason",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.GetAdvanceReason}`, options);
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const CreateAdvanceReason = createAsyncThunk(
  "CreateAdvanceReason",
  async (data, { dispatch }) => {
    console.log(data);
    const options = {
      method: "POST",
      data,
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(apiUrls.CreateAdvanceReason, options);
      dispatch(setLoading(false));
      if (data?.success) {
        notify(data?.message, "success");
      } else {
        notify(data?.message, "error");
      }
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);

export const GetBindResourceList = createAsyncThunk(
  "BINDRESOURCELIST",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(apiUrls.BindResourceList, options);
      dispatch(setLoading(false));
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);

export const GetAllDoctor = createAsyncThunk(
  "GetAllDoctorList",
  async (_, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindDoctorDept}?Department=ALL&CentreID=1`,
        options
      );
      dispatch(setLoading(false));
      return {
        data: handleReactSelectDropDownOptions(data?.data, "Name", "DoctorID"),
      };
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);

export const GetBindAllDoctorConfirmation = createAsyncThunk(
  "GetBindAllDoctorConfirmation",
  async ({ Department, CentreID }, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindDoctorDept}?Department=${Department}`,
        options
      );
      dispatch(setLoading(false));
      return data;
      // return {
      //   data: handleReactSelectDropDownOptions(data?.data, "Name", "DoctorID"),
      // };
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);

export const GetBindSubCatgeory = createAsyncThunk(
  "GetBindSubCatgeory",
  async ({ Type, CategoryID }, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.getBindSubCategory}?Type=${Type}&CategoryID=${CategoryID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
      // return {
      //   data: handleReactSelectDropDownOptions(data?.data, "Name", "DoctorID"),
      // };
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);

// Token Management
export const getBindCentre = createAsyncThunk(
  "getBindCentre",
  async (_, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.getBindCenterAPI}`, options);
      dispatch(setLoading(false));
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);
export const getBindSpeciality = createAsyncThunk(
  "getBindSpeciality",
  async (_, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.BindSpeciality}`, options);
      dispatch(setLoading(false));
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);
export const getBindPanelList = createAsyncThunk(
  "getBindPanelList",
  async ({ PanelGroup }, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.GetPanelName}?PanelGroup=${PanelGroup}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);
