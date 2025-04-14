import React, { useRef, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import Tables from "../../../components/UI/customTable";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { notify } from "../../../utils/utils";
import { axiosInstance } from "../../../utils/helpers";
import makeApiRequest from "../../../networkServices/axiosInstance";
const SmartReportDetails = ({ tableData, onEdit }) => {
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");

  const THEAD = [
    t("S.No"),
    t("Center Name"),
    t("Test"),
    // t("Image"),
    t("Desription"),
    t("Acction"),
  ];
 const [uploadFileData, setUploadFileData] = useState({
    uploadFile: null,
    previewUrl: null,
  });

   const fileInputRef = useRef(null);
  const handleEdit = (row) => {
    onEdit(row);
  };
  const handleTableData = (tableData) => {
    return tableData?.map((row, index) => {
      const { Centre, Test, Image, Desription,centreid,testid,TestCode} =
        row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        centre: Centre,
        Test: Test,
        DepartmentCode: Desription,
        Modify: (
          <i className="fa fa-edit" style={{ color: "#1873c9", cursor: "pointer" }} onClick={() => handleEdit(row)}></i>
        ),
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


  const handelUploadToExcel = async () => {
    debugger
     if (!uploadFileData.uploadFile) {
       notify("Please upload a file", "error");
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
      console.log("data",data.data.message)
      if(data?.success){
        notify(data?.message,"success")
        handleCencel()
      }else{
        notify(data?.data?.message, "error");
      }
    } catch (error) {
      console.error("Error Found", error);
      notify(
        error?.response?.data?.message || "Something went wrong while uploading",
        "error"
      );
    }
    
  };
   
  
  // const handelUploadToExcel = async () => {
  //   debugger;
  
  //   // Step 1: Check if a file was selected
  //   if (!uploadFileData.uploadFile) {
  //     console.error("No file selected for upload.");
  //     return;
  //   }
  
  //   // Step 2: Prepare the form data
  //   const formData = new FormData();
  //   formData.append("file", uploadFileData.uploadFile);
  
  //   try {
  //     // Step 3: Configure API request
  //     const options = {
  //       method: "Post",
  //       data: formData,
  //     };
  
  //     // Step 4: Make the API call
  //     const response = await makeApiRequest(
  //       "/api/v1/SmartReportMaster/UploaddescriptionExcel",
  //       options,
  //       "multipart/form-data"
  //     );

  //     // Step 5: Handle the API response
  //     if (response?.success) {
  //       notify(response?.message,"success");
  //       handleCencel(); // Tip: consider renaming to handleCancel if it's a typo
  //     } else {
  //       notify("Upload failed:", response?.data?.message,"error");
  //       // You can handle duplicate entry message here if needed
  //       if (
  //         response?.message &&
  //         response.message.includes("Duplicate entry")
  //       ) {
  //         console.error("Duplicate entry found in uploaded Excel file.");
  //         // Optional: handle duplicates in UI here
  //       }
  //     }
  //   } catch (error) {
  //     // Step 6: Catch and handle unexpected errors
  //     console.error("Error uploading file:", error?.response?.data || error);
  //   }
  // };
  
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

              <input type="file" onChange={uploadFile} id="file" ref={fileInputRef}  style={{marginLeft:"30px"}}/>
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