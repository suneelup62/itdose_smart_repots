import React from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import Tables from "../../../components/UI/customTable";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
const SmartReportDetails = ({ tableData, onEdit }) => {
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");

  const THEAD = [
    t("S.No"),
    t("Center Name"),
    t("Test Name"),
    t("Test Code"),
    t("Department"),
    t("Department Code"),
    t("Status"),
    t("Modify"),
    // t("Acction"),
  ];

  const handleEdit = (val) => {
    onEdit(val);
  };
  const handleTableData = (tableData) => {
    return tableData?.map((row, index) => {
      const { centre, TestName, Testcode, Department, Departcode, status } =
        row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        centre: centre,
        TestName: TestName,
        Testcode: Testcode,
        Department: Department,
        DepartmentCode: Departcode,
        status: (
          <span
            style={{
              color: status === "Active" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {status}
          </span>
        ),
        // Modify: (
        //   <i
        //     className="fa fa-edit"
        //     style={{ color: "#1873c9" }}
        //     onClick={() => onEdit(row)}
        //   ></i>
        // ),
        Modify: (
          <i className="fa fa-edit" style={{ color: "#1873c9", cursor: "pointer" }} onClick={() => handleEdit(row)}></i>
        ),
        // Action: (
        //   <div>
        //     <button
        //       className="btn btn-sm btn-primary me-2"
        //       onClick={() => handleObservation(row)}
        //       style={{ margin: "2px" }}
        //     >
        //       Observation
        //     </button>
        //     <button
        //       className="btn btn-sm btn-secondary"
        //       onClick={() => handleInterpretation(row)}
        //     >
        //       Interpretation
        //     </button>
        //   </div>
        // ),
      };
    });
  };

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading title={t("Records")} isBreadcrumb={false} />
          <div className="row p-2"></div>
          <div className="row p-2">
            <div className="col-12">
              <Tables
                isSearch={true}
                thead={THEAD}
                tbody={handleTableData(tableData?.length ? tableData : [])}
                style={{ maxHeight: "40vh" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartReportDetails;