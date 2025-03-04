import React, { useState } from "react";
import Heading from "../../components/UI/Heading";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Input from "../../components/formComponent/Input";
import DatePicker from "../../components/formComponent/DatePicker";
import moment from "moment";
import RadioInput from "../../components/formComponent/RadioInput";
import RateMasterTable from "../Master/RateMaster/RateMasterTable";
import Tables from "../../components/UI/customTable";
import { useFetchApi } from "../../networkServices/useFetch";
import { notify } from "../../utils/utils";
import { apiUrls } from "../../networkServices/apiEndpoints";

const ReportDispatch = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [payload, setPayload] = useState({
    Select: "",
    Type: "",
    Center: "",
    RateType: "",
    Department: "",
    ReferDoctor: "",
    SearchByTestName: "",
    Employee: "",
    DateTypeSearch: "",
    // ReferDoctor: "",
    // EmployeeID: "",
    sampleStatus: "",
    fromDate: new Date(),
    toDate: new Date(),
    fromTime: new Date(),
    toTime: new Date(),
  });

  const handleDispatchSelect = (name, e) => {
    setPayload({
      ...payload,
      [name]: e.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const thead = [
    { name: t("Sr. No."), width: "3%" },
    t("Reg Date"),
    t("RN"),
    t("Barcode No"),
    t("Doctor"),
    t("Mobile"),
    t("Agt/Gender"),
    t("Test"),
    t("PUHID"),
    t("RateType"),
    t("Remarks"),
  ];

  const tableData = [
    {
      SrNo: "1",
      RegDate: "123/Jan/2025 11:38 am",
      RN: "LAB001408",
      BarcodeNo: "000529",
      Doctor: "Dr. Self",
      Mobile: "Mr. GAGAN",
      AgtGender: "9540374619 21Y6M4/MG-6",
      Test: "Glucose-6-Phosphate Dehydrogenase (G6PD), Quantitative",
      PUHID: "PAT/5757/0038",
      RateType: "MARKETING TEAM",
      Remarks: "MARKETING TEAM",
    },
    {
      SrNo: "2",
      RegDate: "23/3/2025 11:42 am",
      RN: "LAB001409",
      BarcodeNo: "000530",
      Doctor: "Dr. Self",
      Mobile: "M. BRIJESH",
      AgtGender: "9540374629 32Y5M 30",
      Test: "Absolute Basophil Count",
      PUHID: "PAT/5757/0048",
      RateType: "MARKETING TEAM",
      Remarks: "SKIPRATE",
    },
    {
      SrNo: "3",
      RegDate: "23/Jan/2025 12:00 pm",
      RN: "LAB001410",
      BarcodeNo: "000531",
      Doctor: "Dr. Self",
      Mobile: "Mr. SAIF",
      AgtGender: "7487687409 27Y8M 16D/M",
      Test: "Liver Function Test (LFT) Profile",
      PUHID: "PAT0093",
      RateType: "MARKETING TEAM",
      Remarks: "MARKETING TEAM",
    },
  ];

  const tableDataList = [
    {
      SrNo: "1",
      testname: "1,5 ANHYDROGLUCITOL",
      testCode: "AHGLU",
      rate: "415",
      mrp: "820",
    },
    {
      SrNo: "2",
      testname: "17 OH PROGESTERONE",
      testCode: "OHPROG",
      rate: "415",
      mrp: "100",
    },
    {
      SrNo: "3",
      testname: "25-OH VITAMIN D (TOTAL)",
      testCode: "VITAM",
      rate: "415",
      mrp: "100",
    },
    {
      SrNo: "4",
      testname: "AAROGYAM 1.1 WITH UTSH",
      testCode: "AAROG",
      rate: "415",
      mrp: "200",
    },
    {
      SrNo: "5",
      testname: "ALLERGY PANEL - FOOD PLUS INHALANT - (OUTLAB)",
      testCode: "ALLER",
      rate: "415",
      mrp: "400",
    },
    {
      SrNo: "6",
      testname: "AFB CULTURE (MGIT)",
      testCode: "AFBCU",
      rate: "415",
      mrp: "1200",
    },
    {
      SrNo: "7",
      testname: "ALBUMIN - SERUM",
      testCode: "SERUM",
      rate: "415",
      mrp: "1300",
    },
  ];

  const handleClick = async () => {
    const dATA = {
      userName: "mgr",
      password: "921100",
    };
    const { response, error } = await useFetchApi("Post", apiUrls.login, dATA);

    console.log('response',response)
    console.log('error',error)
    if(error){
      notify(error.response.data.message || 'Something error occured.', 'error')
    }
    if(response){
      notify(error.daresponseta.message, 'response')
    }
  };

  const handleSelectPatient = (val, index) => {
    console.log(val);
  };

  return (
    <>
      <div className="card mt-1">
        {/* <button onClick={handleClick}>Click</button> */}
        <Heading isBreadcrumb={true} />
        <div className="row p-2">
          <div className="col-xl-2 col-md-4 col-sm-4 col-12 d-flex gap-1">
            <ReactSelect
              placeholderName={"Select"}
              id="Select"
              name="Select"
              removeIsClearable={true}
              value={payload?.Select}
              handleChange={handleDispatchSelect}
              searchable={true}
              respclass="w-45"
            />

            <Input
              type="text"
              className="form-control"
              id="Type"
              name="Type"
              value={payload?.Type}
              onChange={handleChange}
              lable={"Type"}
              placeholder=""
              respclass="w-75 ml-1"
            />
          </div>
          <ReactSelect
            placeholderName={"All Centre"}
            id="Center"
            name="Center"
            removeIsClearable={true}
            value={payload?.Center}
            handleChange={handleDispatchSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
          />

          <ReactSelect
            placeholderName={"All RateType"}
            id="RateType"
            name="RateType"
            removeIsClearable={true}
            value={payload?.RateType}
            handleChange={handleDispatchSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
          />

          <ReactSelect
            placeholderName={"All Department"}
            id="Department"
            name="Department"
            removeIsClearable={true}
            value={payload?.Department}
            handleChange={handleDispatchSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
          />

          <ReactSelect
            placeholderName={"All Department"}
            id="Department"
            name="Department"
            removeIsClearable={true}
            value={payload?.Department}
            handleChange={handleDispatchSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6 col-12"}
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
          <Input
            type="text"
            className="form-control"
            id="ReferDoctor"
            name="ReferDoctor"
            value={payload?.SearchByTestName}
            onChange={handleChange}
            lable={"Search By Test Name"}
            placeholder=" "
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
          />
          <Input
            type="text"
            className="form-control"
            id="Employee"
            name="Employee"
            value={payload?.Employee}
            onChange={handleChange}
            lable={"Employee"}
            placeholder=""
            respclass={"col-xl-2 col-sm-4 col-md-6  col-12"}
          />

          <ReactSelect
            placeholderName={"Registration Date"}
            id="DateTypeSearch"
            name="DateTypeSearch"
            removeIsClearable={true}
            value={payload?.DateTypeSearch}
            handleChange={handleDispatchSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6 col-12"}
          />

          <DatePicker
            className="custom-calendar"
            id="fromDate"
            name="fromDate"
            lable={"From Date"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            value={
              payload.fromDate
                ? moment(payload.fromDate, "YYYY-MM-DD").toDate()
                : null
            }
            handleChange={handleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="fromTime"
            name="fromTime"
            lable={"From Time"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            value={
              payload.fromTime
                ? moment(payload.fromTime, "YYYY-MM-DD").toDate()
                : null
            }
            handleChange={handleChange}
          />

          <DatePicker
            className="custom-calendar"
            id="toDate"
            name="toDate"
            lable={"To Date"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            value={
              payload.toDate
                ? moment(payload.toDate, "YYYY-MM-DD").toDate()
                : null
            }
            handleChange={handleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="toTime"
            name="toTime"
            lable={"To Time"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            value={
              payload.toTime
                ? moment(payload.toTime, "YYYY-MM-DD").toDate()
                : null
            }
            handleChange={handleChange}
          />

          <ReactSelect
            placeholderName={"sampleStatus"}
            id="sampleStatus"
            name="sampleStatus"
            removeIsClearable={true}
            value={payload?.sampleStatus}
            handleChange={handleDispatchSelect}
            searchable={true}
            respclass={"col-xl-2 col-sm-4 col-md-6 col-12"}
          />
          <RadioInput
            className={
              "d-flex justify-content-start align-items-center col-xl-1 col-sm-2"
            }
            label={"isUrgent"}
            id={"isUrgent"}
            inputType="checkbox"
          />
          <RadioInput
            className={
              "d-flex justify-content-start align-items-center col-xl-1 col-sm-2"
            }
            label={"isCurious"}
            id={"isCurious"}
            inputType="checkbox"
          />

          <div className="col-sm-1">
            <button className="btn btn-sm btn-primary">Search</button>
          </div>
        </div>
      </div>
      <div className="card my-2 px-2">
        <div className="my-1">
          <Heading isBreadcrumb={true} />
        </div>
        <Tables
          thead={thead}
          tbody={tableData}
          handleSelectPatient={handleSelectPatient}
          tableHeight={"w-100"}
        />
      </div>
    </>
  );
};

export default ReportDispatch;
