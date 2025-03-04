import React, { useState } from "react";
import Input from "../../components/formComponent/Input";
import Heading from "../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import DynamicSearchDetailTable from "../../components/UI/customTable/Report/DynamicSearchDetailTable";
import { useLocation } from "react-router-dom";

const DynamicSearch = () => {
  const [t] = useTranslation();
  const location = useLocation();
  const tableDataList = [
    {
      id: 1,
      date: "07/Feb/2024 01:13 pm",
      code: "LAB/1196/003050",
      patientId: 1046,
      patientName: "Mr. RAJ KAMAL",
      age: "26 Y 11 M 29 D/Male",
      test: "AMYLASE, SERUM",
      time: "0000-00-00 00:00:00",
      doctor: "Dr. Self",
      center: "Lotus Centre",
      statusColor: "purple",
    },
    {
      id: 2,
      date: "16/Jul/2024 12:03 pm",
      code: "LAB/1196/004298",
      patientId: 10834,
      patientName: "Mr. GAGAN",
      age: "21 Y 0 M 0 D/Male",
      test: "24 Hr Urine Copper Atomic",
      time: "0000-00-00 00:00:00",
      doctor: "Dr. Self",
      center: "Lotus Centre",
      statusColor: "red",
    },
    {
      id: 3,
      date: "16/Jul/2024 12:05 pm",
      code: "LAB/1196/004299",
      patientId: 10835,
      patientName: "Mr. GAGAN",
      age: "21 Y 0 M 0 D/Male",
      test: "24 Hr Urine Copper Atomic",
      time: "0000-00-00 00:00:00",
      doctor: "Dr. Self",
      center: "Lotus Centre",
      statusColor: "green",
    },
  ];
  const [tableData, setTableData] = useState(tableDataList);
  const [payload, setPayload] = useState({ VisiNo: "" });

  const handleChange = (e) => {
    const [name, value] = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const thead = [
    { name: t("Sr. No."), width: "5%" },
    { name: t("Reg Date"), width: "10%" },
    { name: t("Visit No"), width: "8%" },
    { name: t("Barcode No"), width: "10%" },
    { name: t("UHID"), width: "8%" },
    { name: t("Name"), width: "15%" },
    { name: t("Age/Gender"), width: "10%" },
    { name: t("Test"), width: "5%" },
    { name: t("Print"), width: "5%" },
    { name: t("Doctor"), width: "10%" },
    { name: t("Centre"), width: "8%" },
    { name: t("View"), width: "5%" },
    { name: t("Audit Trial"), width: "8%" },
    { name: t("Document"), width: "8%" },
    { name: t("M.H"), width: "5%" },
  ];

  console.log(location?.state?.value);
  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row p-2">
          <Input
            type="text"
            className="form-control"
            id="VisiNo "
            name="VisiNo"
            onChange={handleChange}
            value={payload?.VisiNo}
            lable={t("Visi No./BarCode NO.")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          />
          <div className="col-sm-1">
            <button className="btn btn-sm btn-success">Search</button>
          </div>
        </div>
      </div>
      <div className="card mt-2">
        <Heading title={""} />
        <div className="row">
          <div className="col-sm-12">
            <DynamicSearchDetailTable thead={thead} tbody={tableData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicSearch;
