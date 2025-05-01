import React, { useRef, useState } from "react";
import Heading from "../components/UI/Heading";
import { useTranslation } from "react-i18next";
import Tables from "../utils/hooks/customTable"; // uses the updated table component
import { useLocalStorage } from "../utils/hooks/useLocalStorage";
import { notify } from "../utils/utils";
import { axiosInstance } from "../utils/helpers";
import makeApiRequest from "../networkServices/axiosInstance";

const DashboardData = ({ tableData, onEdit}) => {
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");

  const THEAD = [
    t("S.No"),
    t("Centre Id"),
    t("Center Name"),
    t("TotalReportCount"),
    t("GeneratedReportCount"),
    t("RemainingReportCount"),
  ];

  const [uploadFileData, setUploadFileData] = useState({
    uploadFile: null,
    previewUrl: null,
  });

  const fileInputRef = useRef(null);
const [isUploadSuccess, setIsUploadSuccess] = useState(false); 
  const handleEdit = (row) => {
    onEdit(row);
  };

  const handleTableData = (tableData) => {
    return tableData?.map((row, index) => {
      const { centreid,centrename, TotalReportCount, GeneratedReportCount,RemainingReportCount } = row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        centreid:centreid,
        centre: centrename,
        TotalReportCount: TotalReportCount,
        GeneratedReportCount: GeneratedReportCount,
        RemainingReportCount:RemainingReportCount,
        // RemainingReportCount:(<div style={{color:"green", fontWeight:"bold"}}>{RemainingReportCount}</div>)
        // Modify: (
        //   <i
        //     className="fa fa-edit"
        //     style={{ color: "#1873c9", cursor: "pointer" }}
        //     onClick={() => handleEdit(row)}
        //   ></i>
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

  const handelUploadToExcel = async () => {
    setIsUploadSuccess(true)
    if (!uploadFileData.uploadFile) {
      notify("Please upload a file", "error");
      setIsUploadSuccess(false)
      return;
    }
    let formData = new FormData();
    formData.append("file", uploadFileData.uploadFile);

    try {
      const options = {
        method: "Post",
        data: formData,
      };
      const data = await makeApiRequest(
        "/api/v1/SmartReportMaster/UploaddescriptionExcel",
        options,
        "multipart/form-data"
      );
      if (data?.success) {
        notify(data?.message, "success");
        setIsUploadSuccess(false)
        handleCencel();
      } else {
        notify(data?.data?.message, "error");
        handleCencel();
      }
    } catch (error) {
      console.error("Error Found", error);
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
    } else {
      notify("Please upload a valid Excel file", "error");
    }
  };

  const handleCencel = () => {
    setUploadFileData({
      uploadFile: "",
      previewUrl: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mt-2 spatient_registration_card">
      <div className="patient_registration card">
        <Heading title={t("Records")} isBreadcrumb={false} />
        {/* <div className="row p-2">
          <div className="col-12">
            <div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleDownloadToExcel()}
              >
                Download Excel File
              </button>

              <input
                type="file"
                onChange={uploadFile}
                id="file"
                ref={fileInputRef}
                style={{ marginLeft: "30px" }}
              />
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => handelUploadToExcel()}
                style={{ margin: "2px" }}
                disabled={isUploadSuccess}
              >
                Upload Excel File
              </button>
            </div>
          </div>
        </div> */}
        <div className="row p-2">
          <div className="col-12">

            <Tables
              thead={THEAD}
              tbody={handleTableData(tableData)}
              scroll={{ y: "400px" }}
              pagination={{ pageSize: 10 }}
            //   isSearchInput={true}
              isSearchInputlable={"Search by Id"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
