import React from "react";
import Tables from "../../../components/UI/customTable";

const RateMasterTable = ({ thead, tbody ,handleSelectPatient}) => {
  return (
    <>
      <Tables
        thead={thead}
        tbody={tbody?.map((ele, index) => ({
          SrNo: <span className="ml-2">{index + 1}</span>,
          TestCode: ele?.TestCode,
          TypeName: ele?.TypeName,
          Rate: ele?.Rate,
          mrp: ele?.ERate,
        }))}
        style={{ maxHeight: "auto" }}
        getRowClick={handleSelectPatient}
      />
    </>
  );
};

export default RateMasterTable;
