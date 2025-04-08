import React, { useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import Tables from "../../../components/UI/customTable";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { notify } from "../../../utils/utils";
import { axiosInstance } from "../../../utils/helpers";
const SmartReportDetails = ({ tableData, onEdit }) => {
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");

  const THEAD = [
    t("S.No"),
    t("Center Name"),
    t("Test Code"),
    t("Image"),
    t("Desription"),
    t("Acction"),
  ];
 const [uploadFileData, setUploadFileData] = useState({
    uploadFile: "",
    previewUrl: "",
  });
  const handleEdit = (val) => {
    onEdit(val);
  };
  const handleTableData = (tableData) => {
    return tableData?.map((row, index) => {
      const { Centre, TestCode, Image, Desription} =
        row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        centre: Centre,
        Testcode: TestCode,
        Department: Image,
        DepartmentCode: Desription,
        // status: (
        //   <span
        //     style={{
        //       color: status === "Active" ? "green" : "red",
        //       fontWeight: "bold",
        //     }}
        //   >
        //     {status}
        //   </span>
        // ),
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

 const handleDownloadToExcel = async () => {
    const localData = useLocalStorage("authToken", "get");
    const headers = {
      "Content-Type": "",
      Authorization: localData && `Bearer ${localData}`,
    };

    try {
      axiosInstance
        .get("/api/v1/SmartReportMaster/downloadDescriptionExcel", {
          method: "GET",
          responseType: "blob",
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `File.xlsx`);
          document.body.appendChild(link);
          link.click();
        });
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

    const uploadFile = (e) => {
      const uploadFile = e?.target.files[0];
      const previewUrl = URL?.createObjectURL(uploadFile);
      if (
        uploadFile &&
        (uploadFile?.name.endsWith(".xlsx") || uploadFile?.name.endsWith(".xls"))
      ) {
        setUploadFileData({
          uploadFile: uploadFile,
          previewUrl: previewUrl,
        });
      }else{
        notify("Please upload a valid Excel file", "error");
      }
    };
  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading title={t("Records")} isBreadcrumb={false} />
          <div className="row p-2">
           <div className="col-12">
           <div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleDownloadToExcel()}
              >
                Download Excel File
              </button>

              <input type="file" onChange={uploadFile} id="file"  style={{marginLeft:"30px"}}/>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => handelUploadToExcel()}
                style={{ margin: "2px" }}
              >
                Upload Excel File
              </button>
            </div>
           </div>
          </div>
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