
//Api Endpoints urls
export const apiUrls = {
  // Auth Apis
  loginApi: "/api/v1/SmartReport_Login/CheckLogin",
  logout: `/api/MasterPage/Logout`,

  //Smart Report Center
  bindState: `/api/v1/CentreMaster/bindState`,
  bindCity: `/api/v1/CentreMaster/bindcity`,
  
  // Add Centre  
  addCentre: `/api/v1/CentreMaster/AddCentre`,
  
  // Update Centre
  updateCentre: `/api/v1/CentreMaster/UpdateCentre`,
  
  // Smart Report Centre GetData
  CentreGetData: `/api/v1/CentreMaster/GetData`,

  // Centre Master bindclient
  bindclient: `/api/v1/CentreMaster/bindclient`,

  // Centre Master Bind ReportDrop
  ReportDrop: `/api/v1/CentreMaster/BindReportDrop`,

  // Add Investigation
  addInvestigation: `/api/v1/InvestigationMaster/AddTest`,
  
  // InvestigationMaster BindTestgrid
  
  BindTestgrid: `/api/v1/InvestigationMaster/BindTestgrid`,
  
  // InvestigationMaster Updatetest

  updatetest: `/api/v1/InvestigationMaster/Updatetest`,
  
  // /InvestigationMaster Bindsearchgrid

  Bindsearchgrid: `/api/v1/InvestigationMaster/Bindsearchgrid`,

   // Add Observation 
   addObservation: `/api/v1/ObservationMaster/AddObservation`,

   // ObservationMaster Add Observation
   AddObservation: `/api/v1/ObservationMaster/AddObservation`,
  
   // ObservationMaster Update Observation
   UpdateObservation: `/api/v1/ObservationMaster/UpdateObservation`,
   
   // ObservationMaster Remove Observation
   RemoveObserv: `/api/v1/ObservationMaster/RemoveObserv`,

   // ObservationMaster BindObservgrid
   BindObservgrid: `/api/v1/ObservationMaster/BindObservgrid`,
    
   // InvestigationMaster BindInvestigation
     InvestigationBindInvestigation: `/api/v1/InvestigationMaster/BindInvestigation`,
   
   // CentreMaster Investigation Description
   InvestigationDescription: `/api/v1/SmartReportMaster/Investigation_Description`,

    // CentreMaster Investigation Description
    InvestigationRiskfactor: `/api/v1/SmartReportMaster/Investigation_Riskfactor`,
   
  // SmartReportMaster Centre QRCode
     QRCode: `/api/v1/SmartReportMaster/Centre_QRCode`,

  // SmartReportMaster Centre_DoctorSignature
     DoctorSignature: `/api/v1/SmartReportMaster/Centre_DoctorSignature`,

  // SmartReportMaster Investigation_Format
     InvFormat: `/api/v1/SmartReportMaster/Investigation_Format`,
  
  // InvestigationMaster download
  DownloadToExcel: `/api/v1/InvestigationMaster/download`,

  // InvestigationMaster download
  UploadToExcel: `/api/v1/InvestigationMaster/save`,
 
   // InvestigationMaster BindGetDescription
  
   GetDescription: `/api/v1/SmartReportMaster/GetDescription`,
   // InvestigationMaster BindGetDescription
  
   GetRiskFactor: `/api/v1/SmartReportMaster/GetRiskFactor`,

};
