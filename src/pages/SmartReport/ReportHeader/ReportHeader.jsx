import React, { StrictMode, useLayoutEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import {
  handleReactSelectDropDownOptions,
  handleReactSelectDropDownOptionsTest,
  notify,
} from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";
import FullTextEditor from "./TextEditor";
import ReportColumnTable from "./ReportColumnTable";
import ReportStyleTable from "./ReportStyleTable";
import {
  AddAndUpdateSmartreportHeade,
  BindInvestigationTestCode,
  CenterMasterBindclient,
  GetReportHeaderAPI,
  MasterInvestigationRiskfactor,
} from "../../../networkServices/smartReport";
import Editor from "quill/core/editor";
import { TextEditor } from "rc-easyui";
import Table from "react-bootstrap/Table";
import { useCommonDropdowns } from "../../../utils/hooks/useCommonDropdowns";

const ReportHeader = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const localData = useLocalStorage("userDetails", "get");
  const { dropDownData, GetCentreName } = useCommonDropdowns();
  const [Editor, setEditor] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [setChildData, setSetChildData] = useState({});

  const [values, setValues] = useState({
    centreName: null,
    Heigh: "",
    XPosition: "",
    YPosition: "",
    FooterHeight: "",
    Template: "",
  });

  const [Editable, setEditable] = useState(false);
  const [editorText, setEditorText] = useState("");
  // const {
  //   centreOptions,
  //   selectedCentre,
  //   setSelectedCentre,
  //   showCentreDropdown,
  // } = useCentreDropdown();

  const BindTestCode = async (stateID) => {
    if (!stateID) {
      setDropDownData((prev) => ({ ...prev, getBindTestCode: [] }));
      return [];
    }

    try {
      const response = await BindInvestigationTestCode({
        clientid: String(stateID),
      });
      if (response?.data) {
        const testCodeOptions = handleReactSelectDropDownOptionsTest(
          response.data,
          "Test",
          "ID",
          "TestCode",
          "TestName"
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]:
        name === "centreName"
          ? { ...prevValues.centreName, Centreid: value }
          : name === "testCode"
            ? { ...prevValues.testCode, value: value, TestCode: value }
            : value,
    }));
  };
  const handleChangeEditor = (data) => {
    setEditorText(data);
  };

  const handleReactChange = (name, selectedOption) => {
    console.log("Selected:", name, selectedOption);

    const updatedValues = { ...values, [name]: selectedOption };
    setValues(updatedValues);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      { key: "centreName", message: "Centre Name is required" },
      // { key: "testCode", message: "Test Code is required" },
      { key: "Heigh", message: "Heigh is required" },
      { key: "XPosition", message: "XPosition is required" },
      { key: "YPosition", message: "YPosition is required" },
      { key: "FooterHeight", message: "FooterHeight is required" },
    ];

    // Required field validation
    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return false;
      }
    }

    //Template Validation
    if (editorText === "") {
      notify("Template is required", "error");
      return false;
    }

    // Range validation
    const rangeValidations = [
      {
        key: "Heigh",
        min: 180,
        max: 350,
        message: "Heigh must be between 180 and 350",
      },
      {
        key: "XPosition",
        min: 20,
        max: 25,
        message: "XPosition must be between 20 and 25",
      },
      {
        key: "YPosition",
        min: 50,
        max: 130,
        message: "YPosition must be between 50 and 130",
      },
      {
        key: "FooterHeight",
        min: 80,
        max: 110,
        message: "FooterHeight must be between 80 and 110",
      },
    ];

    for (let validation of rangeValidations) {
      const numValue = parseInt(values[validation.key], 10);
      if (
        isNaN(numValue) ||
        numValue < validation.min ||
        numValue > validation.max
      ) {
        notify(validation.message, "error");
        return false;
      }
    }

    const payload = {
      Centreid: String(values?.centreName?.Centreid || localData?.centreId),
      Reportheaderheight: String(values?.Heigh),
      ReportheaderXposition: String(values?.XPosition),
      ReportHeaderYPosition: String(values?.YPosition),
      ReportFoterheight: String(values?.FooterHeight),
      Template: editorText,
    };
    try {
      const response = await AddAndUpdateSmartreportHeade(payload);
      if (response?.status) {
        notify(response.message, "success");
        setIsEdit(false);
        setEditable(true);
        setEditorText("");
        handleCencel();
      } else {
        notify(response.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleUpdate = async () => {
    const requiredFields = [
      // { key: "centreName", message: "Centre Name is required" },
      // { key: "testCode", message: "Test Code is required" },
      { key: "Heigh", message: "Heigh is required" },
      { key: "XPosition", message: "XPosition is required" },
      { key: "YPosition", message: "YPosition is required" },
      { key: "FooterHeight", message: "FooterHeight is required" },
    ];

    // Required field validation
    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return false;
      }
    }

    //Template Validation
    if (editorText === "") {
      notify("Template is required", "error");
      return false;
    }

    // Range validation
    const rangeValidations = [
      {
        key: "Heigh",
        min: 180,
        max: 350,
        message: "Heigh must be between 180 and 350",
      },
      {
        key: "XPosition",
        min: 20,
        max: 25,
        message: "XPosition must be between 20 and 25",
      },
      {
        key: "YPosition",
        min: 50,
        max: 130,
        message: "YPosition must be between 50 and 130",
      },
      {
        key: "FooterHeight",
        min: 80,
        max: 110,
        message: "FooterHeight must be between 80 and 110",
      },
    ];

    for (let validation of rangeValidations) {
      const numValue = parseInt(values[validation.key], 10);
      if (
        isNaN(numValue) ||
        numValue < validation.min ||
        numValue > validation.max
      ) {
        notify(validation.message, "error");
        return false;
      }
    }

    const payload = {
      Centreid: String(values?.centreName?.Centreid || localData?.centreId),
      Reportheaderheight: String(values?.Heigh),
      ReportheaderXposition: String(values?.XPosition),
      ReportHeaderYPosition: String(values?.YPosition),
      ReportFoterheight: String(values?.FooterHeight),
      Template: editorText,
    };
    console.log("payload", payload);
    try {
      const response = await AddAndUpdateSmartreportHeade(payload);
      if (response?.status) {
        notify(response.message, "success");
        setIsEdit(false);
        setEditable(true);
        setEditorText("");
        handleCencel();
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
      Heigh: "",
      XPosition: "",
      YPosition: "",
      FooterHeight: "",
    }));
    setIsEdit(false);
    setEditable(true);
    setEditorText("");
  };

  const GetReportHeader = async (id) => {
    const payload = {
      Centreid: String(id),
    };
    try {
      const response = await GetReportHeaderAPI(payload);
      if (response?.status) {
        if (response.data.length > 0) {
          const responseData = response.data[0];
          setEditable(true);
          setIsEdit(true);
          setEditorText(response?.data[0]?.Template);
          setValues((prev) => {
            return {
              ...prev,
              Heigh: responseData?.Reportheaderheight,
              XPosition: responseData?.ReportheaderXposition,
              YPosition: responseData?.ReportheaderYPosition,
              FooterHeight: responseData?.ReportFoterheight,
            };
          });
        } else {
          setValues((prev) => ({
            ...prev,
            Heigh: "",
            XPosition: "",
            YPosition: "",
            FooterHeight: "",
          }));
          setIsEdit(false);
          setEditable(true);
          setEditorText("");
          notify("No report header found for this center.", "error");
        }
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    if (values?.centreName?.Centreid) {
      GetReportHeader(values?.centreName?.Centreid);
    }
    if (localData?.flag == 1) {
      GetReportHeader(localData?.centreId);
    }
    setValues({ ...values, Template: Editor });
  }, [values?.centreName, Editor]);

  useEffect(() => {
    GetCentreName();
  }, []);
  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            {localData?.flag == 1 ? (
              <Input
                type="text"
                className="form-control"
                id="testName"
                lable={t("Centre name")}
                placeholder=" "
                required={true}
                value={localData?.centreName}
                respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                name="testName"
                disabled={true}
              />
            ) : (
              <ReactSelect
                placeholderName={t("Select centre name")}
                searchable={true}
                respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                id={"centreName"}
                name={"centreName"}
                removeIsClearable={true}
                handleChange={handleReactChange}
                isDisabled={isEdit}
                dynamicOptions={dropDownData?.getBindCentreName}
                value={values?.centreName}
              />
            )}
          </div>

          <div className="row p-2">
            <div className="col-xl-10 col-md-4 col-sm-6 col-12">
              <FullTextEditor
                value={editorText} // Use Template1 instead of Template
                setValue={handleChangeEditor}
                EditTable={Editable}
                setEditTable={setEditable}
              />
            </div>

            <div
              className="col-xl-2 col-md-4 col-sm-6 col-12"
              style={{ width: "200px" }}
            >
              <ReportColumnTable />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-xl-8 col-md-4 col-sm-6 col-12">
              <div>
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>
                        <b>Report Header Heigh :</b>
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control"
                          id="Heigh"
                          lable={t("Heigh")}
                          placeholder=" "
                          required={true}
                          value={values?.Heigh}
                          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                          name="Heigh"
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <div style={{ color: "red" }}>*Range 180-350</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Report Header X Position :</b>
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control"
                          lable={t("XPosition")}
                          id="XPosition"
                          placeholder=" "
                          required={true}
                          value={values?.XPosition}
                          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                          name="XPosition"
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <div style={{ color: "red" }}>*Range 20-25</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Report Header Y Position :</b>
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control"
                          lable={t("YPosition")}
                          id="YPosition"
                          placeholder=" "
                          required={true}
                          value={values?.YPosition}
                          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                          name="YPosition"
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <div style={{ color: "red" }}>*Range 50-130</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Report Footer Height :</b>
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control"
                          lable={t("Footer Height")}
                          id="FooterHeight"
                          placeholder=" "
                          required={true}
                          value={values?.FooterHeight}
                          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                          name="FooterHeight"
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <div style={{ color: "red" }}>*Range 80-110</div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
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
                  onClick={handleCencel}
                >
                  {t("Cancel")}
                </button>
              </>
            ) : (
              <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
                {t("Save Report Header")}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportHeader;
