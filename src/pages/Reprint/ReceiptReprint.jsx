import React, { useState } from "react";
import Heading from "../../components/UI/Heading";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import DatePicker from "../../components/formComponent/DatePicker";
import { useTranslation } from "react-i18next";
import moment from "moment";
import TimePicker from "../../components/formComponent/TimePicker";
import ColorCodingSearch from "../../components/commonComponents/ColorCodingSearch";
import ReceiptReprintTable from "../../components/UI/customTable/Receipt/ReceiptReprintTable";
import { CentreOptions, employeeDataOptions, RateTypeDataOptions, SelectTypeptions } from "./ReprintOptions";
import { notify } from "../../utils/ustil2";
import { useFetchApi } from "../../networkServices/useFetch";
import { apiUrls } from "../../networkServices/apiEndpoints";


const ReceiptReprint = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();

  const [selectitem, setSelectItem] = useState({});
  const tableDataList = [
    {
      Remarks: "",
      TestIdHash: "b179d666-dae5-11ef-9bfd-02eda9a2fa8d",
      UploadDocumentCount: 0,
      DueAmount: 0,
      LedgertransactionIDHash: "32168c5a-7681-95ba-d4da-7cc7-8c5c76c6",
      VIP: 0,
      isUrgent: 0,
      IsRefund: 0,
      Title: "Mr.",
      FirstName: "MOHIT",
      MiddleName: "",
      LastName: "",
      TestID: 222158,
      BarcodeNo: "000578",
      Mobile: "9627412164",
      GrossAmount: 651,
      TestIDDetail: "222158",
      HideReceipt: 0,
      DiscountOnTotal: 0,
      NetAmount: 651,
      Amount: 651,
      Centre: "MARKETING TEAM",
      PatientID: 56626,
      Age: "22 Y 0 M 0 D",
      Gender: "Male",
      DoctorName: "Dr. Self",
      DoctorID: 1,
      LedgerTransactionNo: "LAB/001447",
      BedNo: "",
      InvestigationID: 30034979,
      ItemName: "Complete Blood Count (CBC)",
      IsSampleCollected: "N",
      DepartmentID: 298301992,
      CentreID: 5757,
      PatientGuid: "17335b1b-914e-a282-3c7b-d672-f5880911",
      Date: "25-Jan-2025 11:59 AM",
      Department: "HAEMATOLOGY",
      PatientCode: "PAT/00962",
      Status: 1,
      LedgerTransactionID: 60937,
      RateTypeId: 5758,
      RateType: "MARKETING TEAM - R",
      MedicalHistory: "",
      Adjustment: 651,
      MedicalHistoryCount: 0,
      CreatedByName: "MARKET-Admin",
      IsTrfRequired: 0,
      IsConcentForm: 0,
      IsMedicalHistory: 0,
      canSettlement: 0,
      canRefund: 0,
      canDiscountAfterBill: 0,
      HideRate: 0,
      reportStatus: "fullpaid",
      IsVip: 0,
      IsMask: 0,
    },
    {
      Remarks: "",
      TestIdHash: "29a0e4c4-dae3-11ef-9bfd-02eda9a2fa8d",
      UploadDocumentCount: 0,
      DueAmount: 126.74,
      LedgertransactionIDHash: "c4da0fa5-c023-0fda-191a-d466-fae01015",
      VIP: 0,
      isUrgent: 0,
      IsRefund: 0,
      Title: "Mr.",
      FirstName: "DUMMYYY",
      MiddleName: "",
      LastName: "",
      TestID: 222132,
      BarcodeNo: "000576",
      Mobile: "9876543246",
      GrossAmount: 851,
      TestIDDetail: "222132,222133,222134,222148",
      HideReceipt: 0,
      DiscountOnTotal: 269.63,
      NetAmount: 581.37,
      Amount: 454.63,
      Centre: "MARKETING TEAM",
      PatientID: 56618,
      Age: "24 Y 0 M 0 D",
      Gender: "Male",
      DoctorName: "Dr. Self",
      DoctorID: 1,
      LedgerTransactionNo: "LAB/001446",
      BedNo: "",
      InvestigationID: 30036189,
      ItemName: "Liver Function Test- LFT Profile",
      IsSampleCollected: "N",
      DepartmentID: 298301987,
      CentreID: 5757,
      PatientGuid: "9eada16f-1f6f-16d8-373b-8b2b-7da99f5b",
      Date: "25-Jan-2025 11:41 AM",
      Department: "BIOCHEMISTRY",
      PatientCode: "PAT/00961",
      Status: 1,
      LedgerTransactionID: 60928,
      RateTypeId: 5758,
      RateType: "MARKETING TEAM - R",
      MedicalHistory: "",
      Adjustment: 454.63,
      MedicalHistoryCount: 0,
      CreatedByName: "MARKET-Admin",
      IsTrfRequired: 0,
      IsConcentForm: 0,
      IsMedicalHistory: 0,
      canSettlement: 0,
      canRefund: 0,
      canDiscountAfterBill: 0,
      HideRate: 0,
      reportStatus: "partialpaid",
      IsVip: 0,
      IsMask: 0,
    },
    {
      Remarks: "",
      TestIdHash: "94ca75f6-da52-11ef-9bfd-02eda9a2fa8d",
      UploadDocumentCount: 0,
      DueAmount: 0,
      LedgertransactionIDHash: "3094d379-4b70-f095-ccd8-ea88-67b26a9b",
      VIP: 0,
      isUrgent: 0,
      IsRefund: 0,
      Title: "Mr.",
      FirstName: "GOPAL",
      MiddleName: "",
      LastName: "",
      TestID: 221792,
      BarcodeNo: "000575",
      Mobile: "4008888888",
      GrossAmount: 200,
      TestIDDetail: "221792",
      HideReceipt: 0,
      DiscountOnTotal: 0,
      NetAmount: 200,
      Amount: 200,
      Centre: "MARKETING TEAM",
      PatientID: 56518,
      Age: "78 Y 9 M 9 D",
      Gender: "Male",
      DoctorName: "Dr. Self",
      DoctorID: 1,
      LedgerTransactionNo: "LAB/001445",
      BedNo: "",
      InvestigationID: 30035415,
      ItemName: "Kidney/Renal Function Tests Gold (KFT Gold /RFT Go",
      IsSampleCollected: "N",
      DepartmentID: 298301987,
      CentreID: 5757,
      PatientGuid: "d8b3ed51-690f-d90f-3e1d-7468-02bc2c1c",
      Date: "24-Jan-2025 06:26 PM",
      Department: "BIOCHEMISTRY",
      PatientCode: "PAT/00960",
      Status: 1,
      LedgerTransactionID: 60828,
      RateTypeId: 5758,
      RateType: "MARKETING TEAM - R",
      MedicalHistory: "",
      Adjustment: 200,
      MedicalHistoryCount: 0,
      CreatedByName: "MARKET-Admin",
      IsTrfRequired: 0,
      IsConcentForm: 0,
      IsMedicalHistory: 0,
      canSettlement: 0,
      canRefund: 0,
      canDiscountAfterBill: 0,
      HideRate: 0,
      reportStatus: "fullpaid",
      IsVip: 0,
      IsMask: 0,
    },
    {
      Remarks: "",
      TestIdHash: "70977935-da52-11ef-9bfd-02eda9a2fa8d",
      UploadDocumentCount: 0,
      DueAmount: -45,
      LedgertransactionIDHash: "c8a2a831-2d9d-9fe2-4c21-904b-c24b3aa8",
      VIP: 0,
      isUrgent: 0,
      IsRefund: 0,
      Title: "Mr.",
      FirstName: "MANISH",
      MiddleName: "",
      LastName: "",
      TestID: 221791,
      BarcodeNo: "000574",
      Mobile: "2222222222",
      GrossAmount: 651,
      TestIDDetail: "221791,221945,221947",
      HideReceipt: 0,
      DiscountOnTotal: 0,
      NetAmount: 651,
      Amount: 651,
      Centre: "MARKETING TEAM",
      PatientID: 56517,
      Age: "76 Y 7 M 7 D",
      Gender: "Male",
      DoctorName: "Dr. Self",
      DoctorID: 1,
      LedgerTransactionNo: "LAB/001444",
      BedNo: "588989",
      InvestigationID: 30034979,
      ItemName: "Complete Blood Count (CBC)",
      IsSampleCollected: "N",
      DepartmentID: 298301992,
      CentreID: 5757,
      PatientGuid: "d80fb41c-e1bf-34b7-f89e-df33-a773ad66",
      Date: "24-Jan-2025 06:25 PM",
      Department: "HAEMATOLOGY",
      PatientCode: "PAT/00959",
      Status: 1,
      LedgerTransactionID: 60827,
      RateTypeId: 5758,
      RateType: "MARKETING TEAM - R",
      MedicalHistory: "",
      Adjustment: 651,
      MedicalHistoryCount: 0,
      CreatedByName: "MARKET-Admin",
      IsTrfRequired: 0,
      IsConcentForm: 0,
      IsMedicalHistory: 0,
      canSettlement: 0,
      canRefund: 0,
      canDiscountAfterBill: 0,
      HideRate: 0,
      reportStatus: "All",
      IsVip: 0,
      IsMask: 0,
    },
    {
      Remarks: "",
      TestIdHash: "62cd7ee7-da50-11ef-9bfd-02eda9a2fa8d",
      UploadDocumentCount: 0,
      DueAmount: 0,
      LedgertransactionIDHash: "30385547-def5-ad0d-810b-59c3-9362f027",
      VIP: 0,
      isUrgent: 0,
      IsRefund: 0,
      Title: "Mr.",
      FirstName: "MOHIT",
      MiddleName: "",
      LastName: "",
      TestID: 221785,
      BarcodeNo: "000573",
      Mobile: "7777777777",
      GrossAmount: 651,
      TestIDDetail: "221785",
      HideReceipt: 0,
      DiscountOnTotal: 0,
      NetAmount: 651,
      Amount: 651,
      Centre: "MARKETING TEAM",
      PatientID: 56516,
      Age: "23 Y 4 M 4 D",
      Gender: "Male",
      DoctorName: "Dr. Self",
      DoctorID: 1,
      LedgerTransactionNo: "LAB/001443",
      BedNo: "",
      InvestigationID: 30034979,
      ItemName: "Complete Blood Count (CBC)",
      IsSampleCollected: "S",
      DepartmentID: 298301992,
      CentreID: 5757,
      PatientGuid: "ec38cb89-2599-e9f9-c086-45fa-8af7c8b3",
      Date: "24-Jan-2025 06:10 PM",
      Department: "HAEMATOLOGY",
      PatientCode: "PAT/00958",
      Status: 2,
      LedgerTransactionID: 60826,
      RateTypeId: 5758,
      RateType: "MARKETING TEAM - R",
      MedicalHistory: "",
      Adjustment: 651,
      MedicalHistoryCount: 0,
      CreatedByName: "MARKET-Admin",
      IsTrfRequired: 0,
      IsConcentForm: 0,
      IsMedicalHistory: 0,
      canSettlement: 0,
      canRefund: 0,
      canDiscountAfterBill: 0,
      HideRate: 0,
      reportStatus: "fullpaid",
      IsVip: 0,
      IsMask: 0,
    },
    {
      Remarks: "",
      TestIdHash: "4069e6fc-da49-11ef-9bfd-02eda9a2fa8d",
      UploadDocumentCount: 0,
      DueAmount: 0,
      LedgertransactionIDHash: "3615ee30-97e6-c9cf-1e13-c67c-db22a2f9",
      VIP: 0,
      isUrgent: 0,
      IsRefund: 0,
      Title: "Mr.",
      FirstName: "DEMO1",
      MiddleName: "",
      LastName: "",
      TestID: 221728,
      BarcodeNo: "000572",
      Mobile: "2345678777",
      GrossAmount: 200,
      TestIDDetail: "221728",
      HideReceipt: 0,
      DiscountOnTotal: 0,
      NetAmount: 200,
      Amount: 200,
      Centre: "MARKETING TEAM",
      PatientID: 56495,
      Age: "12 Y 0 M 0 D",
      Gender: "Male",
      DoctorName: "Dr. Self",
      DoctorID: 1,
      LedgerTransactionNo: "LAB/001442",
      BedNo: "",
      InvestigationID: 30035415,
      ItemName: "Kidney/Renal Function Tests Gold (KFT Gold /RFT Go",
      IsSampleCollected: "Y",
      DepartmentID: 298301987,
      CentreID: 5757,
      PatientGuid: "fbf4946e-6c10-6518-cdb6-3de5-8afde78d",
      Date: "24-Jan-2025 05:19 PM",
      Department: "BIOCHEMISTRY",
      PatientCode: "PAT/00957",
      Status: 6,
      LedgerTransactionID: 60805,
      RateTypeId: 5758,
      RateType: "MARKETING TEAM - R",
      MedicalHistory: "",
      Adjustment: 200,
      MedicalHistoryCount: 0,
      CreatedByName: "MARKET-Admin",
      IsTrfRequired: 0,
      IsConcentForm: 0,
      IsMedicalHistory: 0,
      canSettlement: 0,
      canRefund: 0,
      canDiscountAfterBill: 0,
      HideRate: 0,
      reportStatus: "fullpaid",
      IsVip: 0,
      IsMask: 0,
    },
  ];
  const [tableData, setTableData] = useState(tableDataList);
  const [payload, setPayload] = useState({
    Select: "",
    Type: "",
    Center: "",
    RateType: "",
    ReferDoctor: "",
    EmployeeID: "",
    fromDate: new Date(),
    toDate: new Date(),
    fromTime: new Date(),
    toTime: new Date(),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleReactSelect = (name, e) => {
    setPayload({
      ...payload,
      [name]: e.value,
    });
  };

  console.log('RateTypeDataOptions',employeeDataOptions);
  const handleCallViewMedReq = (item) => {
    // handleSearchViewReqDetails(item);
    console.log('payload',payload);
  };

  const handleSearch = async () => {
    console.log('payload', payload);

    const suppliername = payload?.SupplierName
      ? String(payload?.SupplierName)
      : "";
    try {
      const response = await SearchVendor(suppliername);
      if (response.success && response.data.length > 0) {
        const data = response?.data?.map((ele) => ({
          ...ele,
          isAssetActive: 0,
        }));

        setTableData(data);
      }
    } catch (error) {
      // notify("Something Went's Wrong", "error");
    }
  };

  const thead = [
    { name: t("Action"), width: "3%" },
    t("Reg Date"),
    t("Visit No."),
    t("UHID"),
    t("Patient Name"),
    t("Remark"),
    t("Age/Gender"),
    t("Mobile No."),
    t("Gross Amt"),
    t("dis Amt"),
    t("Net Amt"),
    t("Due Amt"),
    t("Paid Amt"),
    t("Center"),
    t("Rate Type"),
    t("Doctor"),
    t("User"),
    t("Rec Edit"),
    t("Edit Info"),
    t("Cash Receipt"),
    t("Fully Paid"),
  ];
  const handleSelectPatient = (val, index) => {
    console.log(val);
    setSelectItem(val);
  };
  // const SelectTypeptions = [
  //   {
  //     value: "BarcodeNo",
  //     label: "BarcodeNo",
  //   },
  //   {
  //     value: "Mobile",
  //     label: "Mobile",
  //   },
  //   {
  //     value: "UHID",
  //     label: "UHID",
  //   },
  //   {
  //     value: "PatientName",
  //     label: "PatientName",
  //   },
  //   {
  //     value: "VisitNo",
  //     label: "VisitNo",
  //   },
  // ]


  const searchReceipt=  async()=>{
    const data = {
      "centre": payload.Center,
      "fromDate": payload.fromDate,
      "fromTime": payload.fromTime,
      "toDate": payload.toDate,
      "toTime": payload.toTime,
      "labNo": payload.Type,
      "panelID": payload.RateType,
      "searchType": payload.Select,
      "user": payload.EmployeeID,
      "stype": payload.ReferDoctor
    }
    const {response, error} = await useFetchApi('get', apiUrls.GetUserData, data);
    console.log('res:::::', response, error);
  }

  return (
    <>
      <div className="card">
        <Heading
          isBreadcrumb={true}
          secondTitle={
            <>
              <label>Total Patient: 15</label>
              <label className="ml-3">Net Amount: 22000</label>
            </>
          }
        />
        <div className="row p-2">
          <div className="col-xl-2 col-md-4 col-sm-4 col-12 d-flex">
            <ReactSelect
              placeholderName={"Select"}
              id="Select"
              name="Select"
              removeIsClearable={true}
              value={payload?.Select}
              handleChange={handleReactSelect}
              searchable={true}
              respclass="w-45"
              dynamicOptions={SelectTypeptions}
            />

            <Input
              type="text"
              className="form-control"
              id="Type"
              name="Type"
              value={payload?.Type}
              onChange={handleChange}
              lable={"Type"}
              placeholder=" "
              respclass="w-75 ml-1"
            />
          </div>
          <ReactSelect
            placeholderName={"Center"}
            id="Center"
            name="Center"
            removeIsClearable={true}
            value={payload?.Center}
            handleChange={handleReactSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
            dynamicOptions={CentreOptions}
          />
          <ReactSelect
            placeholderName={"Rate Type"}
            id="RateType"
            name="RateType"
            removeIsClearable={true}
            value={payload?.RateType}
            handleChange={handleReactSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
            dynamicOptions={RateTypeDataOptions}
          />
          <Input
            type="text"
            className="form-control"
            id="ReferDoctor"
            name="ReferDoctor"
            value={payload?.ReferDoctor}
            onChange={handleChange}
            lable={"Refer Doctor"}
            placeholder=" "
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
          />
          <ReactSelect
            placeholderName={"Employee"}
            id="EmployeeID"
            name="EmployeeID"
            removeIsClearable={true}
            value={payload?.EmployeeID}
            handleChange={handleReactSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
            dynamicOptions={employeeDataOptions}
          />
          <div className="col-xl-2 col-md-4 col-sm-4 col-12 d-flex">
            <DatePicker
              className="custom-calendar"
              id="fromDate"
              name="fromDate"
              lable={"From Date"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"w-75"}
              value={
                payload.fromDate
                  ? moment(payload.fromDate, "YYYY-MM-DD").toDate()
                  : null
              }
              handleChange={handleChange}
            />
            <TimePicker
              placeholderName="From Time"
              lable={t("From Time")}
              value={payload?.fromTime}
              handleChange={handleChange}
              respclass="w-45 ml-2"
            />
          </div>
          <div className="col-xl-2 col-md-4 col-sm-4 col-12 d-flex">
            <DatePicker
              className="custom-calendar"
              id="toDate"
              name="toDate"
              lable={"To Date"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"w-75"}
              value={
                payload.toDate
                  ? moment(payload.toDate, "YYYY-MM-DD").toDate()
                  : null
              }
              handleChange={handleChange}
            />

            <TimePicker
              placeholderName="To Time"
              lable={t("To Time")}
              value={payload?.toTime}
              handleChange={handleChange}
              respclass="w-45 ml-2"
            />
          </div>
          <div className="col-sm-1">
            {/* <button className="btn btn-sm btn-primary" onClick={handleSearch}> */}
            <button className="btn btn-sm btn-primary" onClick={searchReceipt}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="card mt-2">
        <Heading
          title={"Details"}
          secondTitle={
            <>
              <span className="pointer-cursor">
                {" "}
                <ColorCodingSearch
                  color={"hsl(263, 57.70%, 79.60%)"}
                  label={t("Full Paid")}
                  onClick={() => {
                    handleCallViewMedReq("1");
                  }}
                />
              </span>
              <span className="pointer-cursor">
                {" "}
                <ColorCodingSearch
                  color={"lightgreen"}
                  label={t("Partial Paid")}
                  onClick={() => {
                    handleCallViewMedReq("2");
                  }}
                />
              </span>
              <span className="pointer-cursor">
                {" "}
                <ColorCodingSearch
                  color={"#F08080"}
                  label={t("Fully Unpaid")}
                  onClick={() => {
                    handleCallViewMedReq("3");
                  }}
                />
              </span>
              <span className="pointer-cursor">
                <ColorCodingSearch
                  color={"rgb(160, 216, 160)"}
                  label={t("Full Refund")}
                  onClick={() => {
                    handleCallViewMedReq("4");
                  }}
                />
              </span>
              <span className="pointer-cursor">
                <ColorCodingSearch
                  color={"#FFA500"}
                  label={t("Credit")}
                  onClick={() => {
                    handleCallViewMedReq("5");
                  }}
                />
              </span>
            </>
          }
        />
        <div className="row">
          <div className="col-sm-12">
            <ReceiptReprintTable
              thead={thead}
              tbody={tableData}
              handleSelectPatient={handleSelectPatient}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptReprint;
