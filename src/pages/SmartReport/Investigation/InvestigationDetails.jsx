import React, { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";

import Tables from "../../../components/UI/customTable";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import Input from "../../../components/formComponent/Input";
import { notify } from "../../../utils/utils";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { useTransition } from "react";
import {
  InvestigationMasterBindsearchgrid,
  InvestigationMasterBindTestgrid,
  InvestigationMasterDownloadToExcel,
} from "../../../networkServices/smartReport";
import Modal from "../../../components/modalComponent/Modal";
import Observation from "../Observation/Observation";
import UploadToExcel from "./UploadToExcel";
import DownloadToExcel from "./UploadToExcel";
import { parseString } from "xml2js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import makeApiRequest from "../../../networkServices/axiosInstance";
import axios from "axios";
import { axiosInstance } from "../../../utils/helpers";
const InvestigationDetails = ({ tableData, onEdit, sendDataToParent }) => {
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");

  const [handleModelData, setHandleModelData] = useState({});
  const [serchVluses, setSerchVluses] = useState({
    searchtype: "",
    txtsearchInv: "",
    clientid: "",
  });

  const [searchTableData, setSearchByTableData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false); // Track if search is active
  const serchBydropDownData = [
    { value: "TestName", label: "Test Name" },
    { value: "Testcode", label: "Test Code" },
    { value: "Department", label: "Department" },
    { value: "Departcode", label: "Department Code" },
  ];
  const THEAD = [
    t("S.No"),
    t("Center Name"),
    t("Test Name"),
    t("Test Code"),
    t("Department"),
    t("Department Code"),
    t("Report type"),
    t("Status"),
    t("Modify"),
    // t("Acction"),
  ];
  const [uploadFileData, setUploadFileData] = useState({
    uploadFile: "",
    previewUrl: "",
  });
  const handleClose = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

  const handleObservation = (row) => {
    setHandleModelData({
      isOpen: true,
      width: "60vw",
      label: "Observation Master",
      Component: <Observation ObservationRow={row} />,
      // RejectPurchaseRequest: RejectPurchaseRequest
    });
  };
  function handleInterpretation(row) {
    console.log(row);
  }

  const handleTableData = (tableData) => {
    return tableData?.map((row, index) => {
      const { centre, TestName, Testcode, Department, Departcode,FormatName, status,ReportFormat } =
        row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        centre: centre,
        TestName: TestName,
        Testcode: Testcode,
        Department: Department,
        DepartmentCode: Departcode,
        ReportFormat:FormatName,
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
          <i
            className="fa fa-edit"
            style={{ color: "#1873c9", cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          ></i>
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

  // Handle input change and update state
  const handleChangeTable = (e) => {
    const { name, value } = e.target;
    setSerchVluses((prev) => ({ ...prev, [name]: value }));
  };

  const handleReactChange = (name, e) => {
    setSerchVluses({
      ...serchVluses,
      [name]: e?.value,
      clientid: tableData[0]?.Centreid,
    });
  };

 
  // Function to fetch data based on search criteria
  async function Bindsearchgrid() {
    const payload = {
      searchtype: serchVluses?.searchtype,
      txtsearchInv: serchVluses?.txtsearchInv,
      clientid: String(serchVluses?.clientid),
    };
    try {
      const response = await InvestigationMasterBindsearchgrid(payload);
      if (response?.data?.length) {
        setSearchByTableData(response?.data || []); // Set search results
        // hendelClear(); // Clear search input
        setIsSearchActive(true); // Mark search as active
      } else {
        notify("No data found", "error"); // Notify if no data found
        setSearchByTableData([]); // Reset search results if empty
        setIsSearchActive(false);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  // Debounce API call
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (serchVluses.txtsearchInv) {
        Bindsearchgrid();
      }
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [serchVluses.txtsearchInv]);

  // Function to handle editing and updating searchTableData
  const handleEdit = (row) => {
    onEdit(row); // Call parent function if needed

    setSearchByTableData((prevData) =>
      prevData.map((item) => (item.Testcode === row.Testcode ? row : item))
    );
  };

  useEffect(() => {
    if (serchVluses.txtsearchInv === "") {
      setIsSearchActive(false);
    }
  }, [serchVluses?.txtsearchInv]);

  useEffect(() => {
    // Create the object
    const passfun = {
      isSearchActive: isSearchActive,
      Bindsearchgrid: Bindsearchgrid,
      serchVluses: serchVluses,
    };

    sendDataToParent(passfun); // Send object to parent
  }, [isSearchActive]); // Triggers when `isSearchActive` changes

  const tableDisplayData = isSearchActive ? searchTableData : tableData;

  // const tableDisplayData = isSearchActive ? searchTableData : tableData;

  // const handelUploadToExcel = () => {
  //   return setHandleModelData({
  //     isOpen: true,
  //     width: "40vw",
  //     label: "Upload To Excel File",
  //     Component: <UploadToExcel />,
  //     // RejectPurchaseRequest: RejectPurchaseRequest
  //   });
  // };

  const handleDownloadToExcel = async () => {
    const localData = useLocalStorage("authToken", "get");
    const headers = {
      "Content-Type": "",
      Authorization: localData && `Bearer ${localData}`,
    };

    try {
      axiosInstance
        .get("/api/v1/InvestigationMaster/download", {
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
  if(uploadFileData.uploadFile===""){
    notify("Please upload a file","error")
  }
    let formData = new FormData();
    formData.append("file", uploadFileData.uploadFile);

    try {
      const options = {
        method: "Post",
        data: formData,
      };
      const data = await makeApiRequest(
        "/api/v1/InvestigationMaster/save",
        options,
        "multipart/form-data"
      );
      if(data?.success){
        notify(data?.message,"success")
        handleCencel()
      }else{
        notify(data?.data,"error")
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
    }else{
      notify("Please upload a valid Excel file", "error");
    }
  };

  const handleCencel = () => {
    setUploadFileData((prev) => ({
      ...prev,
        uploadFile: "",
        previewUrl: "",
    }));
    setIsEdit(false);
  };
  const hendelClear = () => {
    setSerchVluses({
      searchtype: "",
      txtsearchInv: "",
    });
  };
  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading title={t("Records")} isBreadcrumb={false} />
          <div className="row p-2">
            <ReactSelect
              placeholderName={t("Serch by")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"searchtype"}
              name={"searchtype"}
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={serchBydropDownData}
              // requiredClassName="required-fields"
              value={serchVluses?.searchtype}
            />
            <Input
              type="text"
              className="form-control"
              id="txtsearchInv"
              lable={t("Type to search")}
              placeholder=" "
              required={true}
              value={serchVluses?.txtsearchInv}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="txtsearchInv"
              onChange={handleChangeTable}
            />
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
          <div className="row p-2">
            <div className="col-12">
              <Tables
                thead={THEAD}
                tbody={handleTableData(tableDisplayData)}
                style={{ maxHeight: "60vh" }}
              />
            </div>
          </div>
        </div>

        {handleModelData?.isOpen && (
          <Modal
            visible={handleModelData?.isOpen}
            setVisible={handleClose}
            modalWidth={handleModelData?.width}
            Header={t(handleModelData?.label)}
            buttonType={"button"}
            // modalData={handleModelData?.modalData}
            // buttons={handleModelData?.extrabutton}
            // buttonName={handleModelData?.buttonName}

            footer={<></>}
            // handleAPI={handleModelData?.RejectPurchaseRequest}
          >
            {handleModelData?.Component}
          </Modal>
        )}
      </div>
    </>
  );
};

export default InvestigationDetails;
