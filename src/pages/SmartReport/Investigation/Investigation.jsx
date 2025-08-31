import React, { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import InvestigationDetails from "./InvestigationDetails";
import {
  addInvestigationSubmit,
  BindReportDrop,
  CenterMasterBindclient,
  InvestigationMasterBindTestgrid,
  InvestigationMasterUpdatetest,
} from "../../../networkServices/smartReport";

const Investigation = () => {
  const [t] = useTranslation();
  const localData = useLocalStorage("userDetails", "get");

  const [dropDownData, setDropDownData] = useState({
    GetBindCentreName: [],
    GetFormatOption: [],
  });

  const [showCentreDropdown, setShowCentreDropdown] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [setChildData, setSetChildData] = useState({});

  const IS_ACTIVE_OPTION = [
    { label: "Active", value: "1" },
    { label: "InActive", value: "0" },
  ];

  const [values, setValues] = useState({
    tableRowId: "",
    centreName: {},
    testName: "",
    testCode: "",
    department: "",
    departmentCode: "",
    isActive: {},
    ReportType: {
      label: "",
      value: "",
    },
  });

  const GetCentreName = async () => {
    try {
      const response = await CenterMasterBindclient();

      if (response?.status) {
        const dataArray = Array.isArray(response?.data) ? response.data : [];

        // Flag-based logic
        if (localData?.flag === "1") {
          const userCentreId = localData?.centreId;
          const userCentreName = localData?.centreName;

          setValues((prev) => ({
            ...prev,
            centreName: {
              label: userCentreName,
              value: userCentreId,
              Centreid: userCentreId,
            },
          }));

          setShowCentreDropdown(false);
          await BindTestgrid(userCentreId);
        } else {
          setDropDownData((prev) => ({
            ...prev,
            GetBindCentreName: handleReactSelectDropDownOptions(
              dataArray,
              "CentreName",
              "Centreid"
            ),
          }));
        }
      }
    } catch (error) {
      console.log("Error in GetCentreName", error);
    }
  };

  const GetFormatOption = async () => {
    try {
      const response = await BindReportDrop();
      if (response?.status) {
        const dataArray = Array.isArray(response?.data) ? response.data : [];
        setDropDownData((prev) => ({
          ...prev,
          GetFormatOption: handleReactSelectDropDownOptions(
            dataArray,
            "FORMAT",
            "Id"
          ),
        }));
      }
    } catch (error) {
      console.log("Error in GetFormatOption", error);
    }
  };

  const BindTestgrid = async (centreId) => {
    if (!centreId) return;

    try {
      const response = await InvestigationMasterBindTestgrid({
        clientid: String(centreId),
      });
      if (response?.status) {
        setTableData(response?.data);
      }
      if (response?.data?.length === 0) {
        notify("No Data Found", "error");
      }
    } catch (error) {
      console.log("Error in BindTestgrid", error);
    }
  };

  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
    if (name === "centreName" && selectedOption?.value) {
      BindTestgrid(selectedOption.value);
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
      departmentCode: "Department code is Required",
      isActive: "Status is Required",
    };

    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }

    const payload = {
      Centreid: String(
        values?.centreName?.value || values?.centreName?.Centreid
      ),
      TestName: values?.testName,
      Testcode: values?.testCode,
      Department: values?.department,
      chkactive: String(values?.isActive?.value),
      departcode: values?.departmentCode,
      ReportFormat: String(values?.ReportType?.value),
    };

    try {
      const response = await addInvestigationSubmit(payload);
      if (response?.status) {
        notify(response.message, "success");
        setIsEdit(false);
        await BindTestgrid(payload.Centreid);
        handleCencel();
      } else {
        notify(response.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleUpdate = async (val) => {
    const requiredFields = {
      centreName: "Centre name is Required",
      testName: "Test name is Required",
      testCode: "Test code is Required",
      department: "Department is Required",
      departmentCode: "Department code is Required",
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
      Department: values?.department,
      departcode: values?.departmentCode,
      ReportFormat: String(values?.ReportType?.value || values?.ReportType),
      chkactive: String(values.isActive?.value),
    };

    try {
      const response = await InvestigationMasterUpdatetest(payload);
      if (response?.status) {
        notify(response?.message, "success");
        setIsEdit(false);
        // await fetchTestGrid(values.centreName);
        await BindTestgrid(payload.Centreid);
        if (setChildData.isSearchActive) {
          const payload1 = {
            searchtype: setChildData?.serchVluses?.searchtype,
            txtsearchInv: setChildData?.serchVluses?.txtsearchInv,
            clientid: String(setChildData?.serchVluses?.clientid),
          };
          await setChildData.Bindsearchgrid(payload1);
        }
        handleCencel();
      } else {
        notify(response.message || "Updation failed", "error");
      }
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
      ReportType: null,
      isActive: {},
    }));
    setIsEdit(false);
  }

  const handleOnEdit = (val) => {
    setIsEdit(true);
    setValues({
      tableRowId: val?.id,
      centreName: val?.Centreid,
      testName: val?.TestName,
      testCode: val?.Testcode,
      department: val?.Department,
      departmentCode: val?.Departcode,
      ReportType: val?.ReportFormat,
      isActive:
        val.status === "Active" ? IS_ACTIVE_OPTION[0] : IS_ACTIVE_OPTION[1],
    });
  };

  useEffect(() => {
    GetCentreName();
    GetFormatOption();
  }, []);
  const receiveChildObject = (obj) => {
    setSetChildData(obj); // Store child object in state
  };

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            {showCentreDropdown ? (
              <ReactSelect
                placeholderName={t("Select centre name")}
                searchable={true}
                respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                id={"centreName"}
                name={"centreName"}
                removeIsClearable={true}
                handleChange={handleReactChange}
                dynamicOptions={dropDownData?.GetBindCentreName}
                value={values?.centreName}
              />
            ) : (
              <Input
                type="text"
                className="form-control"
                id="testName"
                lable={t("Centre name")}
                placeholder=" "
                required={true}
                value={values?.centreName?.label}
                respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                name="testName"
                disabled={true}
              />
            )}

            <Input
              type="text"
              className="form-control"
              id="testName"
              lable={t("Test name")}
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
              placeholderName={t("Report type")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id="ReportType"
              name="ReportType"
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={dropDownData?.GetFormatOption}
              value={values?.ReportType}
            />
            <ReactSelect
              placeholderName={t("Status")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id="isActive"
              name="isActive"
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={IS_ACTIVE_OPTION}
              value={values?.isActive?.value}
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
                  className="btn btn-sm btn-secondary ml-2"
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
      <InvestigationDetails
        tableData={tableData}
        onEdit={handleOnEdit}
        fetchDataAfterEdit={() => {}}
        sendDataToParent={receiveChildObject}
        setParentData={setChildData}
      />
    </>
  );
};

export default Investigation;
