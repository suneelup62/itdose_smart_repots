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
    t("Center ID"),
    t("Center Name"),
    t("LoginId"),
    t("Password"),
    t("State"),
    t("City"),
    t("Addres"),
    t("Frontpage"),
    t("Historicrepresnt"),
    t("Status"),
    t("Acction"),
  ];

  const handleEdit = (val) => {
    onEdit(val);
  };
  const handleTableData = (tableData) => {
    return tableData?.map((row, index) => {
      const { Centreid,CentreName, LoginId,Password,State, city, Address, Isactive ,Logo_Img,Frontpage,Historicrepresnt} = row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        Centreid:Centreid,
        CentreName: CentreName,
        LoginId:LoginId,
        Password:Password,
        State: State,
        city: city,
        Address: Address,
        Frontpage:Frontpage,
        Historicrepresnt:Historicrepresnt,
        Isactive: (
          <span
            style={{
              color: Isactive === "Active" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {Isactive}
          </span>
        ),
        Edit: (
          <i
            className="fa fa-edit"
            style={{ color: "#1873c9" }}
            onClick={() => handleEdit(row)}
          ></i>
        ),
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