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
import Tables from "../../../components/UI/customTable";
// import InvestigationDetails from "./InvestigationDetails";
import {
  BindGetRiskFactor,
  BindInvestigationTestCode,
  CenterMasterBindclient,
  MasterInvestigationRiskfactor,
} from "../../../networkServices/smartReport";

const Riskfactor = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const [dropDownData, setDropDownData] = useState({
    getBindCentreName: [],
    getBindTestCode: [],
  });

  const [isEdit, setIsEdit] = useState(false);
  const [setChildData, setSetChildData] = useState({});

  const [values, setValues] = useState({
    centreName: null,
    testCode: null,
  });
  const [editorText, setEditorText] = useState("");
  const handleChangeEditor = (data) => {
    setEditorText(data);
  };

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
          "TestCode",
          "ID"
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
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  };

  console.log("values", values);
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
      Testcode: values?.testCode?.label,
      Test_id: String(values?.testCode?.value),
      Template: editorText,
    };

    try {
      const response = await MasterInvestigationRiskfactor(payload);
      if (response?.status) {
        notify(response.message, "success");
        setEditable(true);
        setEditorText("");
        await fetchTestGrid(payload?.Centreid);
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
    }));
    setIsEdit(false);
  };

  useEffect(() => {
    GetCentreName();
  }, []);

  useEffect(() => {
    if (values?.centreName?.Centreid) {
      BindTestCode(values?.centreName?.Centreid);
    }
  }, [values?.centreName]);

  const fetchTestGrid = async (id) => {
    try {
      const response = await BindGetRiskFactor({
        centreid: String(id),
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

  const handleEdit = (val) => {
    console.log("Edit", val);
    setEditable(true);
    setIsEdit(true);
    setEditorText(val?.Template);
    setValues({
      centreName: val?.Centre,
      testCode: val?.TestCode,
      centreid: val?.centreid,
      testCodeName: val?.TestCode,
      testid: val?.testid,
    });
    // setPreview(val?.Image)
  };

  useEffect(() => {
    if (values?.centreName?.Centreid) {
      BindTestCode(values?.centreName?.Centreid);
      fetchTestGrid(values?.centreName?.Centreid);
    }
  }, [values?.centreName]);

  const handleTableData = (tableData) => {
    return tableData?.map((row, index) => {
      const { Centre, TestCode, Image, Template, centreid, testid } = row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        centre: Centre,
        Testcode: TestCode,
        // Department: Image,
        // Template: Template,
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

  // const handleEdit = (row) => {
  //   onEdit(row);
  // };
  const THEAD = [
    t("S.No"),
    t("Center Name"),
    t("Test Code"),
    // t("Image"),
    // t("Template"),
    t("Acction"),
  ];
  const handleUpdate = async () => {
    // const requiredFields = [
    //   { key: "centreName", message: "Centre Name is required" },
    //   { key: "testCode", message: "Test Code is required" },
    //   { key: "Description", message: "Description is required" },
    // ];
    // for (let field of requiredFields) {
    //   if (!values[field.key]) {
    //     notify(field.message, "error");
    //     return false;
    //   }
    // }
    // if (!base64Data) {
    //   notify("Please upload a valid image file.", "error");
    //   return;
    // }
    const payload = {
      Centreid: String(values?.centreid),
      Testcode: values?.testCode,
      Test_id: String(values?.testid),
      Template: editorText,
    };
    try {
      const response = await MasterInvestigationRiskfactor(payload);
      if (response?.status) {
        setEditable(true);
        setEditorText("");
        notify(response.message, "success");
        await fetchTestGrid(payload?.Centreid);
        handleCencel();
      } else {
        notify(response.message, "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };
  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            <ReactSelect
              placeholderName={t("Select Centre Name")}
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
              placeholderName={t("Select Test Code")}
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
          </div>
          <div className="FullTextEditor">
            {/* <FullTextEditor
              value={values?.Template}
              setValue={setEditor}
              editable={Editable}
              setEditTable={setEditable}
            /> */}
            <FullTextEditor
              value={editorText} // Use Template1 instead of Template
              setValue={handleChangeEditor}
              EditTable={Editable}
              setEditTable={setEditable}
            />
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
      {/* <RiskfactorDetails tableData={tableData} onEdit={handleEdit} /> */}
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading title={t("Records")} isBreadcrumb={false} />
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

export default Riskfactor;
