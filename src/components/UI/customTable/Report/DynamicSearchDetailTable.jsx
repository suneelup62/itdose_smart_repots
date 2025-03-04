import React from "react";
import Tables from "..";
import { View_Print } from "../../../SvgIcons";

const DynamicSearchDetailTable = ({ thead, tbody }) => {
  return (
    <>
      <Tables
        thead={thead}
        tbody={tbody?.map((ele, index) => ({
          SrNo: index + 1,
          date: ele?.date,
          patientId: ele?.patientId,
          barCode: "12244",
          tests: <input type="checkbox" />,

          patientName: ele?.patientName,
          test: ele?.test,
          time: ele?.time,
          print: <View_Print />,
          doctor: ele?.doctor,
          center: ele?.center,
          view: <i class="fa fa-eye"></i>,
          Document: <i class="fa fa-file-text" aria-hidden="true"></i>,
        }))}
        
        style={{ maxHeight: "162px" }}
      />
    </>
  );
};

export default DynamicSearchDetailTable;
