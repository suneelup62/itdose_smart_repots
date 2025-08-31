import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { InvestigationMasterUploadToExcel, ObservationMasterAddObservation } from "../../../networkServices/smartReport";
import * as XLSX from 'xlsx'; // Import XLSX for parsing the Excel file

const UploadToExcel = ({ ObservationRow }) => {

  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");
  const [isEdit, setIsEdit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [dropDownData, setDropDownData] = useState({
    GetBindCentreName: [],
    Getinvid: [],
  });
  const format_OPTION = [
    {
      label: "Format 1",
      value: "1",
    },

    {
      label: "Format 2",
      value: "2",
    },
    {
      label: "Format 3",
      value: "3",
    },
    {
      label: "Format 4",
      value: "4",
    },
  ];
  const [values, setValues] = useState({
    centreName: null,
    observationName: "",
    observationCode: "",
    invid: null,
    ObservId: "",
  });

  const [fileData, setFileData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log("fileName",fileName)
    const payload={
      file:fileName
    }
    try {
      const response = await InvestigationMasterUploadToExcel(payload);
      if (response?.status) {
        notify(response?.message, "success");
      } else {
        notify(response?.message, "error");
      }
    } catch (error) {
      console.error(error, "Some Thing Went Wrong");
    }
  };


  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  };
const handeluploadFile=()=>{

}

// Handle file change (file input)
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file && file.name.endsWith(".xlsx")||file.name.endsWith(".xls")) {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Read the first sheet
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet); // Convert the sheet to JSON
      setFileData(data);
    };
    reader.readAsBinaryString(file);
  } else {
    notify("Please upload a valid Excel file.", "error");
  }
};

// // Handle file change (XML input)
// const handleFileChange = (e) => {
//   const file = e.target.files[0];

//   if (file && file.name.endsWith(".xml")) {
//     setFileName(file.name);
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const xmlString = e.target.result;
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(xmlString, "text/xml");

//       // Convert XML to JSON
//       const jsonData = xmlToJson(xmlDoc);
//       console.log("Parsed JSON:", jsonData);

//       // Convert JSON to Excel
//       const worksheet = XLSX.utils.json_to_sheet(jsonData);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

//       // Generate XLSX file and trigger download
//       XLSX.writeFile(workbook, "ConvertedFile.xlsx");
//     };

//     reader.readAsText(file);
//   } else {
//     notify("Please upload a valid XML file.", "error");
//   }
// };

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          {/* <Heading isBreadcrumb={true} /> */}
          <div className="row p-2">

            {/* <Input
              type="text"
              className="form-control"
              id="observationCode"
              lable={t("Observation Code")}
              placeholder=" "
              required={true}
              value={values?.observationCode}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="observationCode"
              onChange={handleChange}
            /> */}
             {/* <ReactSelect
              placeholderName={t("Format")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"format"}
              name={"format"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={format_OPTION}
              value={values?.format?.value}
              // requiredClassName="required-fields"
            /> */}
             <div className="col-sm-4" style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={handleFileChange}
                  id="file"
                />
              </div>
          </div>
          <div className="button-container-center">
            {isEdit ? (
              <>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleUpdate}
                >
                  {t("Update")}
                </button>
                <button
                  className="btn btn-sm btn-primary ml-2"
                  onClick={handleCancel}
                >
                  {t("Cancel")}
                </button>
              </>
            ) : (
              <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
                {t("Submit")}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <ReportObservation
        tableData={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}
    </>
  );
};

export default UploadToExcel;
