import React, { StrictMode, useLayoutEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";
import InvestigationDetails from "./InvestigationDetails";
import {
  addInvestigationSubmit,
  bindState,
  InvestigationMasterBindTestgrid,
  InvestigationMasterUpdatetest,
  ReportCenterGetData,
} from "../../../networkServices/smartReport";

const Investigation = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const [dropDownData, setDropDownData] = useState({
    GetBindCentreName: [],
  });

  const IS_ACTIVE_OPTION = [
    {
      label: "Active",
      value: "1",
    },

    {
      label: "InActive",
      value: "0",
    },
  ];

  const [values, setValues] = useState({
    tableRowId: "",
    centreName: {},
    testName: "",
    testCode: "",
    department: "",
    departmentCode: "",
    isActive: {},
  });

  const [isEdit, setIsEdit] = useState(false);


  const GetCentreName = async () => {
    try {
      const response = await ReportCenterGetData();
      if (response?.data) {
        setDropDownData((prev) => ({
          ...prev,
          GetBindCentreName: handleReactSelectDropDownOptions(
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
  const BindTestgrid = async (centreId) => {
    if (!centreId) return; // Ensure we don't send an empty request

    const payload = {
      clientid: String(centreId),
    };

    try {
      const response = await InvestigationMasterBindTestgrid(payload);
      setTableData(response?.data);
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };

  const handleReactChange = (name, selectedOption) => {
    console.log("Selected Centre ID:", selectedOption?.Centreid);
    setValues((prev) => ({ ...prev, [name]: selectedOption }));

    if (name === "centreName" && selectedOption?.Centreid) {
      BindTestgrid(selectedOption.Centreid);
    }
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = {
      centreName: "Centre name is Required",
      testName: "Test name is Required",
      testCode: "Test code is Required",
      department: "Department is Required",
      isActive: "Status code is Required",
    };

    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }

    const payload = {
      Centreid: String(values?.centreName?.Centreid || ""),
      TestName: values.testName,
      Testcode: values.testCode,
      Department: values.department,
      chkactive: String(values.isActive?.value || ""),
      departcode: values.departmentCode,
    };

    try {
      const response = await addInvestigationSubmit(payload);

      if (response?.status) {
        notify(response.message, "success");
        setIsEdit(false);
        await fetchTestGrid(payload.Centreid);
        handleCencel()
      } else {
        notify(response.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleEdit = (val) => {
    // console.log("handleEdit", val);
    setIsEdit(true);
    setValues({
      // ...prev,
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

  const handleUpdate = async () => {
    const requiredFields = {
      centreName: "Centre name is Required",
      testName: "Test name is Required",
      testCode: "Test code is Required",
      department: "Department is Required",
      isActive: "Status code is Required",
    };

    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }

    const payload = {
      idd: String(values.tableRowId),
      Centreid: String(values.centreName),
      TestName: String(values.testName),
      Testcode: String(values.testCode),
      Department: values.department,
      departcode: values.departmentCode,
      chkactive: String(values.isActive?.value),
    };

    try {
      const response = await InvestigationMasterUpdatetest(payload);
      if (response?.status) {
        notify(response?.message, "success");
        setIsEdit(false);
        await fetchTestGrid(values.centreName);
        handleCencel()
      }
      else{
        notify(response.message || "Updation failed", "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  // Separate function to fetch and update test grid data
  const fetchTestGrid = async (centreName) => {
    try {
      const response = await InvestigationMasterBindTestgrid({
        clientid: String(centreName),
      });
      setTableData(response?.data);
      handleCencel();
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  function handleCencel() {
    setValues((prev) => ({
      ...prev,
      testName: "",
      testCode: "",
      department: "",
      departmentCode: "",
      isActive: {},
    }));
    setIsEdit(false);
  }

  useEffect(() => {
    GetCentreName();
  }, []);

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            <ReactSelect
              placeholderName={t("Centre Name")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"centreName"}
              name={"centreName"}
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={dropDownData?.GetBindCentreName}
              requiredClassName="required-fields"
              value={values?.centreName}
            />
            <Input
              type="text"
              className="form-control required-fields"
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
              className="form-control required-fields"
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
              className="form-control required-fields"
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
              className="form-control required-fields"
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
              requiredClassName="required-fields"
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
      <InvestigationDetails tableData={tableData} onEdit={handleEdit} />
    </>
  );
};

export default Investigation;
