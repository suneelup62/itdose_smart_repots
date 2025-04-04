import React, { StrictMode, useLayoutEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";
import FullTextEditor from "../Description/TextEditor";
import DescriptionDetails from "./DescriptionDetails"
import {
  addInvestigationSubmit,
  BindInvestigationTestCode,
  bindState,
  CenterMasterBindclient,
  InvestigationMasterBindTestgrid,
  InvestigationMasterUpdatetest,
  MasterInvestigationDescription,
  ReportCentreGetData,
} from "../../../networkServices/smartReport";
import Editor from "quill/core/editor";
import { TextEditor } from "rc-easyui";

const Description = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const [dropDownData, setDropDownData] = useState({
    getBindCentreName: [],
    getBindTestCode: [],
  });

  const [Editor, setEditor] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [setChildData, setSetChildData] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [values, setValues] = useState({
    centreName: {},
    testCode: null,
    Template: "",
    Description: "",
  });

  const [Editable, setEditable] = useState(false);

  const GetCentreName = async () => {
    try {
      const response = await CenterMasterBindclient();
      if (response?.status) {
        setDropDownData((prev) => ({
          ...prev,
          getBindCentreName: handleReactSelectDropDownOptions(
            response?.data,
            "CentreName",
            "Centreid"
          ),
        }));
      }
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };
  const BindTestCode = async (stateID) => {
    debugger
    if (!stateID) {
      setDropDownData((prev) => ({ ...prev, getBindTestCode: [] }));
      return [];
    }

    try {
      const response = await BindInvestigationTestCode({
        clientid: String(stateID),
      });
      if (response?.data) {
        const testCodeOptions = handleReactSelectDropDownOptions(
          response.data,
          "TestName",
          "TestCode"
        );
        setDropDownData((prev) => ({
          ...prev,
          getBindTestCode: testCodeOptions,
        }));
        return testCodeOptions; // Return the city options for immediate use
      }
      return [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };
  const getReportCentreGetData = async () => {
    try {
      const response = await ReportCentreGetData();
      if (response?.status) {
        setTableData(response?.data);
      }

    } catch (error) {
      console.log(error, "Something Went Wrong");
    }
  };
   // Separate function to fetch and update test grid data
    const fetchTestGrid = async (id) => {
      try {
        const response = await InvestigationMasterBindTestgrid({
          clientid: String(id),
        });
        if (response?.status) {
          setTableData(response?.data);
          val.BindTestgrid();
          handleCencel();
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  };
  const handleSubmit = async () => {
    const requiredFields = [
      { key: "centreName", message: "Centre Name is required" },
      { key: "testCode", message: "Test Code is required" },
    ];
    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return false;
      }
    }

    const payload = {
      Centreid: String(values?.centreName?.Centreid),
      Testcode: values?.testCode?.value,
      Template: values?.Description,
      image1:image
    };
    console.log("Description", payload);
    try {
      const response = await MasterInvestigationDescription();
      if (response?.status) {
        notify(response.message, "success");
        //  handleCencel()
      } else {
        notify(response.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };
  const handleCencel = () => {
    setValues((prev) => ({
      ...prev,
      centreName: "",
      testCode: null,
      Template: "",
    }));
    setIsEdit(false);
  };

  useEffect(() => {
    GetCentreName();
  }, []);

  useEffect(() => {
    if (values?.centreName?.Centreid) {
      BindTestCode(values?.centreName?.Centreid);
      fetchTestGrid(values?.centreName?.Centreid)
    }
  }, [values?.centreName]);

  useEffect(() => {
    setValues({ ...values, Template: Editor });
  }, [Editor]);

  const handelTesting = () => {
    setEditable(true);
    console.log("Testing");
  };
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Create image preview
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file!");
    }
  };

  const handleEdit = (val) => {
    setIsEdit(true);
    setValues({
      tableRowId: val?.id,
      centreName: val?.Centreid,
      testName: val?.TestName,
      testCode: val?.Testcode,
      department: val?.Department,
      departmentCode: val?.Departcode,
      isActive:
        val.status === "Active" ? IS_ACTIVE_OPTION[0] : IS_ACTIVE_OPTION[1],
    });
  };
  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            <ReactSelect
              placeholderName={t("Select centre name")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"centreName"}
              name={"centreName"}
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={dropDownData?.getBindCentreName}
              // requiredClassName="required-fields"
              value={values?.centreName}
            />
            <ReactSelect
              placeholderName={t("Select test code")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"testCode"}
              name={"testCode"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={dropDownData?.getBindTestCode}
              // requiredClassName="required-fields"
              value={values?.testCode}
            />
            <TextAreaInput
              type="text"
              name="Description"
              rows={2}
              value={values?.Description}
              onChange={handleChange}
              lable={t("Description")}
              placeholder=" "
              respclass="col-xl-6 col-md-4 col-sm-6 col-12"
              className="form-control"
            />
          
            {/* <div>
              <h3>Upload Image</h3>
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {preview && (
                <div>
                  <h4>Image Preview:</h4>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "200px", marginTop: "10px" }}
                  />
                </div>
              )}
            </div> */}
            {/* <ReactSelect
              placeholderName={t("Centre Name")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"centreName"}
              name={"centreName"}
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={dropDownData?.getBindCentreName}
              // requiredClassName="required-fields"
              value={values?.centreName}
            />
            <Input
              type="text"
              className="form-control"
              id="testName"
              lable={t("Test Name")}
              placeholder=" "
              required={true}
              value={values?.testName}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="testName"
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control"
              id="testCode"
              lable={t("Test code")}
              placeholder=" "
              required={true}
              value={values?.testCode}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="testCode"
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control"
              id="department"
              lable={t("Department")}
              placeholder=" "
              required={true}
              value={values?.department}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="department"
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control"
              id="departmentCode"
              lable={t("Department code")}
              placeholder=" "
              required={true}
              value={values?.departmentCode}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="departmentCode"
              onChange={handleChange}
            />

            <ReactSelect
              placeholderName={t("Status")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"isActive"}
              name={"isActive"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={IS_ACTIVE_OPTION}
              value={values?.isActive?.value}
              // requiredClassName="required-fields"
            /> */}
          </div>
          <div className="row p-2">
            <div className="d-flex" style={{}}>
            <label className="mt-2 ml-3">{"Upload Image"}</label>
              <input type="file" 
              accept="image/*"
              className="mt-2 ml-3"
               onChange={handleFileChange} />
              {preview && (
                <div>
                  <h4>Image Preview:</h4>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "50px"}}
                  />
                </div>
              )}
            </div>
            </div>
          <div className="FullTextEditor">
            {/* <FullTextEditor
              value={values?.Template}
              setValue={setEditor}
              editable={Editable}
              setEditTable={setEditable}
            /> */}
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
                  onClick={handleCencel}
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
      <DescriptionDetails tableData={tableData}
        onEdit={handleEdit}/>
    </>
  );
};

export default Description;
