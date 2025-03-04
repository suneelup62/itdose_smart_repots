import { BindVendor } from "./InventoryApi";

const environment = import.meta.env.VITE_APP_ENVIRONMENT;

const allEnvApiUrls = {
  production: {
    baseUrl: import.meta.env.VITE_APP_REACT_APP_BASE_URL,
  },
  stagging: {
    baseUrl: import.meta.env.VITE_APP_REACT_APP_PROD_URL,
  },
  development: {
    baseUrl: import.meta.env.VITE_APP_REACT_APP_DEV_URL,
  },
};

const envUrl = `${allEnvApiUrls[environment]?.baseUrl}/hpb2b/api`;

export const apiUrls = {
  // Auth Apis
  login: `/api/Login`,
  logout: `/api/MasterPage/Logout`,
  // GetRoleData: `/api/Global/GetRoleData`,
  // GetCentreData: `/api/Global/GetCentreData`,
  GetUserData: `/api/Global/GetUserData`,
  
  // RateListMaster Start
  GetRateListData: `/api/RateListMaster/GetRateListData`,
  // RateListMaster end
  
  // claim update

  UpdateCliam: "Claims/UpdateCliam",

  // master api
  UpdateUserTheme: "MasterPage/UpdateUserTheme",
  ChangePassword: "MasterPage/ChangePassword",
  UpdateEmployeeProfile: "MasterPage/UpdateEmployeeProfile",
  getRoleList: "MasterPage/CentreWiseRoleList",
  EmployeeWiseCentreList: "MasterPage/EmployeeWiseCentreList",
  BindMenuList: "MasterPage/BindMenu",
  getNotificationDetail: "MasterPage/Notification",
  BindFrameMenuByRoleID: "MasterPage/BindFrameMenuByRoleID",
  StoreState: "PatientControl/StateInsert",
  StateInsert: "PatientControl/StateInsert",
  DistrictInsert: "PatientControl/DistrictInsert",
  CityInsert: "PatientControl/CityInsert",
  CentreWiseCacheByCenterID: "PatientControl/CentreWiseCache",
  CentreWiseCacheByCenterID: "PatientControl/CentreWiseCache",

  // DirectPatientReg Mayank START
  CentreWisePanelControlCache: "PanelControl/CentreWisePanelControlCache",
  GetPanelDocument: "PanelControl/GetPanelDocument",
  GetPatientUploadDocument: "PatientControl/GetMasterDocuments",
  CreateTypeOfReference: "PatientControl/CreateTypeOfReference",
  BindSeeMoreList: "CommonAPI/BindSeeMoreList",
  CommonAPIGetEmpBirthDay: "CommonAPI/GetEmpBirthDay",
  ValidateDuplicatePatientEntry: "PatientControl/ValidateDuplicatePatientEntry",
  GetAgeByDateOfBirth: "CommonAPI/GetAgeByDateOfBirth",
  SaveReg: "Registration/SaveReg",
  UpdateRegistration: "Registration/UpdateRegistration",
  // DirectPatientReg Mayank END

  // payment control ----- Arshad Pathaan Khan-----
  LoadCurrencyDetail: "PaymentControl/LoadCurrencyDetail",
  PaymentControlBindPaymentModePanelWise:
    "PaymentControl/BindPaymentModePanelWise",
  GetSwipMachine: "PaymentControl/GetSwipMachine",
  GetBankMaster: "PaymentControl/GetBankMaster",
  getConvertCurrecncy: "PaymentControl/getConvertCurrecncy",
  GetConversionFactor: "PaymentControl/GetConversionFactor",
  // opdServiceBooking ----sahil--
  Oldpatientsearch: "PatientControl/Oldpatientsearch",
  PatientSearchbyBarcode: "PatientControl/PatientSearchbyBarcode",
  BindReferDoctor: "PatientControl/BindReferDoctor",
  bindPanelByPatientID: "CommonAPI/bindPanelByPatientID",
  BindRefferalType: "CommonAPI/bindReferalType",
  BindPRO: "PatientControl/bindPRO",
  BindDepartment: "CommonAPI/bindDepartment",
  BindDoctorDept: "CommonAPI/bindDoctorDept",
  CommonAPIGetDoctorIDByEmployeeID: "CommonAPI/GetDoctorIDByEmployeeID",
  bindHashCode: "CommonAPI/bindHashCode",
  RoleWiseOPDServiceBookingControls:
    "OPDServiceBooking/RoleWiseOPDServiceBookingControls",
  LoadOPD_All_ItemsLabAutoComplete:
    "CommonAPI/LoadOPD_All_ItemsLabAutoComplete",
  PackageExpirayDate: "OPDServiceBooking/PackageExpirayDate",
  ValidateDoctorMap: "OPDServiceBooking/ValidateDoctorMap",
  ValidateDoctorLeave: "OPDServiceBooking/ValidateDoctorLeave",
  GetDiscountWithCoPay: "CommonAPI/GetDiscountWithCoPay",
  getAlreadyPrescribeItem: "OPDServiceBooking/getAlreadyPrescribeItem",
  BindLabInvestigationRate: "PatientControl/BindLabInvestigationRate",
  GetAuthorization: "CommonAPI/GetAuthorization",
  BindResourceList: "CommonAPI/BindResourceList",
  GetAppointmentCount: "OPDServiceBooking/GetAppointmentCount",

  GetDoctorAppointmentTimeSlotConsecutive:
    "OPDServiceBooking/GetDoctorAppointmentTimeSlotConsecutive",

  BindPackageItemDetailsNew: "OPDServiceBooking/BindPackageItemDetailsNew",
  checkblacklist: "PatientControl/Checkblacklist",
  GetDiscReason: "PaymentControl/GetDiscReason",
  BindDisApproval: "PaymentControl/BindDisApproval",
  GetEligiableDiscountPercent: "PaymentControl/GetEligiableDiscountPercent",
  GetInvestigationTimeSlot: "OPDServiceBooking/GetInvestigationTimeSlot",
  BindModality: "CommonAPI/BindModality",
  HoldTimeSlot: "OPDServiceBooking/HoldTimeSlot",
  BindInvestigation: "OPDServiceBooking/BindInvestigation",
  HoldTimeSlot: "OPDServiceBooking/HoldTimeSlot",
  GetLastVisitDetail: "OPDServiceBooking/GetLastVisitDetail",
  LastVisitDetails: "OPDServiceBooking/LastVisitDetails",

  // Dashboard API
  HIMSDashboard: "Dashboard/HIMSDashboard",
  HIMSDashboardTYPEID: "Dashboard/HIMSDashboardDetail",
  DashboardMISUserWiseGraphSetting: "Dashboard/MISUserWiseGraphSetting",
};
