import React, { StrictMode, useLayoutEffect, useRef, useState } from "react";
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
import FullTextEditor from "../Description/TextEditor";
import Tables from "../../../components/UI/customTable";
import { useCommonDropdowns } from "../../../utils/hooks/useCommonDropdowns";
import {
  BindGetRiskFactor,
  BindInvestigationTestCode,
  CenterMasterBindclient,
  MasterInvestigationRiskfactor,
} from "../../../networkServices/smartReport";

const Riskfactor = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const { dropDownData, GetCentreName, BindTestCode } = useCommonDropdowns();
  const localData = useLocalStorage("userDetails", "get");
  const prevCentreId = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [setChildData, setSetChildData] = useState({});
  const [editorText, setEditorText] = useState("");
  const [Editable, setEditable] = useState(false);
  const [values, setValues] = useState({
    centreName: null,
    testCode: null,
  });
 
  const handleChangeEditor = (data) => {
    setEditorText(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReactChange = (name, selectedOption) => {
    const updatedValues = { ...values, [name]: selectedOption };
    setValues(updatedValues);

    if (name === "testCode" && selectedOption?.TestCode) {
      fetchGetRiskFactor(
        values?.centreName?.Centreid || selectedOption?.Centreid||localData?.centreId,
        selectedOption?.TestCode
      );
    }
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
      Centreid: String(values?.centreName?.Centreid||localData?.centreId),
      Testcode: values?.testCode?.TestCode,
      Test_id: String(values?.testCode?.value),
      Template: editorText,
    };
    try {
      const response = await MasterInvestigationRiskfactor(payload);
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
      testCode: null,
    }));
    setIsEdit(false);
    setEditable(true);
    setEditorText("");
  };

  const fetchGetRiskFactor = async (id, Code) => {
    const payload = {
      Centreid: String(id),
      TestCode: Code,
    };
    try {
      const response = await BindGetRiskFactor(payload);
      if (response?.status) {
        if (response.data.length > 0) {
          setEditable(true);
          setIsEdit(true);
          setEditorText(response?.data[0]?.Template);
        } else {
          setIsEdit(false);
          setEditable(true);
          setEditorText("");
          notify("No data found for this code.", "error");
        }
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleEdit = (val) => {
    console.log("Edit", val);
    setIsEdit(false);
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

  const handleUpdate = async () => {
    const payload = {
      Centreid: String(values?.centreName?.Centreid||localData?.centreId),
      Testcode: values?.testCode?.TestCode,
      Test_id: String(values?.testCode?.value),
      Template: editorText,
    };
    try {
      const response = await MasterInvestigationRiskfactor(payload);
      if (response?.status) {
        setEditable(true);
        setEditorText("");
        notify(response.message, "success");
        setIsEdit(false);
        handleCencel();
      } else {
        notify(response.message, "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    GetCentreName();
  }, []);

  useEffect(() => {
    const currentCentreId = values?.centreName?.Centreid||localData?.centreId;

    if (currentCentreId && currentCentreId !== prevCentreId.current) {
      setValues((prev) => ({ ...prev, testCode: null }));
      BindTestCode(currentCentreId);
      prevCentreId.current = currentCentreId;
      setEditable(true);
      setEditorText("");
    }
  }, [values?.centreName]);

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            {/* <ReactSelect
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
            /> */}
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
            <ReactSelect
              placeholderName={t("Select test")}
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
    </>
  );
};

export default Riskfactor;
