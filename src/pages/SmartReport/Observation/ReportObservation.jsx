import React, { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import { MRDBindRoom, MRDSaveNewRoom } from "../../../networkServices/MRDApi";
import Tables from "../../../components/UI/customTable";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import Input from "../../../components/formComponent/Input";
import { notify } from "../../../utils/utils";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { useTransition } from "react";



const ReportObservation = ({ tableData, onEdit }) => {
//--------------------------------- Static Data Table Data ------------------
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");
 

  const [payload, setPayload] = useState({
    roomName: "",
    savetype: "Save",
    isActive: "1",
    roomID: "",
  });

  const THEAD = [
    t("S.No"),
    t("Center Name"),
    t("Investigation"),
    t("Observation Name"),
    t("Observation Code"),
    t("Modify"),
    t("Remove"),
  ];
  

  const handleTableData = (tableData) => { 
    return tableData?.map((row, index) => {
      const { Centrename, InvName, Observname, observcode} = row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        CenterName:Centrename,
        InvName: InvName,
        Observname: Observname,
        observcode:observcode,
        Edit: <i className="fa fa-edit" style={{ color: "#1873c9", }}onClick={() => onEdit(row)}></i>,
        Deletet: <i className="fa fa-trash text-danger" style={{ color: "#1873c9", }}onClick={() => onEdit(row)}></i>,
    //     Edit:  <button className="btn btn-sm btn-primary"
    //     onClick={() => handleEdit(row)}>{"Edit"}
    //   </button>,
      };
    });
  };




  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading title={t("Records")} isBreadcrumb={false} />
          <div className="row p-2">
            {/* <Input
              type="text"
              className="form-control"
              id="roomName"
              lable={t("Search Entity")}
              placeholder=" "
              required={true}
              value={payload?.roomName}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="roomName"
              onChange={handleChange}
            /> */}

            {/* <ReactSelect
              placeholderName={t("IsActive")}
              searchable={true}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              id={"isActive"}
              name={"isActive"}
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={IS_ACTIVE_OPTION}
              value={payload?.isActive}
            /> */}
          </div>
          <div className="row p-2">
            <div className="col-12">
              <Tables 
               isSearch={true}
              thead={THEAD} 
              tbody={handleTableData(tableData?.length ? tableData : [])} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportObservation;