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
  CenterMasterBindclient,
  InvestigationMasterBindsearchgrid,
  InvestigationMasterBindTestgrid,
  InvestigationMasterUpdatetest,
  ReportCentreGetData,
} from "../../../networkServices/smartReport";
import Modal from "../../../components/modalComponent/Modal";
import Observation from "../Observation/Observation";
import Tables from "../../../components/UI/customTable";
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
      const response = await CenterMasterBindclient();
      if (response?.status) {
        setDropDownData((prev) => ({
          ...prev,
          GetBindCentreName: handleReactSelectDropDownOptions(
            response?.data,
            "CentreName",
            "Centreid",
           
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
    console.log("Edit",val)
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

  const handleUpdate = async (val) => {
    console.log("handleUpdate",val)
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
      Department: values.department,
      departcode: values.departmentCode,
      chkactive: String(values.isActive?.value),
    };

    try {
      const response = await InvestigationMasterUpdatetest(payload);
      if (response?.status) {
        notify(response?.message, "success");
        await fetchTestGrid(values.centreName);
        // If search is active, re-fetch the search results
      if (isSearchActive) {
        await Bindsearchgrid();
      }
        setIsEdit(false); 
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
  const fetchTestGrid = async (id) => {
    debugger
    try {
      const response = await InvestigationMasterBindTestgrid({
        clientid: String(id),
      });
      setTableData(response?.data);
      val.BindTestgrid()
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

  //---------------------------------------------------------------data table----------------

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
    t("Status"),
    t("Modify"),
    t("Acction"),
  ];

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
      const { centre, TestName, Testcode, Department, Departcode, status } =
        row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        centre: centre,
        TestName: TestName,
        Testcode: Testcode,
        Department: Department,
        DepartmentCode: Departcode,
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
          <i className="fa fa-edit" style={{ color: "#1873c9", cursor: "pointer" }} onClick={() => handleEdit(row)}></i>
        ),
        Action: (
          <div>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => handleObservation(row)}
              style={{ margin: "2px" }}
            >
              Observation
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleInterpretation(row)}
            >
              Interpretation
            </button>
          </div>
        ),
      };
    });
  };

  // Handle input change and update state
  const handleChangeTable = (e) => {
    const { name, value } = e.target;
    setSerchVluses((prev) => ({ ...prev, [name]: value }));
  };

  const handleReactChangeTable = (name, e) => {
    setSerchVluses({
      ...serchVluses,
      [name]: e?.value,
      clientid: tableData[0]?.Centreid,
    });
  };

  const hendelClearTable = () => {
    setSerchVluses((prev) => ({
      ...prev,
      searchtype: "",
      txtsearchInv: "",
    }));
  };
  

  // Function to fetch data based on search criteria
  //  async  function Bindsearchgrid   ()  {
  //   debugger;
  //   const payload = {
  //     searchtype: serchVluses?.searchtype,
  //     txtsearchInv: serchVluses?.txtsearchInv,
  //     clientid: String(serchVluses?.clientid),
  //   };
  //   try {
  //     const response = await InvestigationMasterBindsearchgrid(payload);
  //     if (response?.data?.length) {
  //       setSearchByTableData(response?.data); // Set search results
  //       hendelClearTable()
  //       setIsSearchActive(true); // Mark search as active
  //     }
  //     else {
  //       notify("No data found", "error"); // Notify if no data found
  //       setSearchByTableData([]); // Reset search results if empty
  //       setIsSearchActive(false);
  //     }
  //   } catch (error) {
  //     console.error("Something went wrong", error);
  //   }
  // };
  async function Bindsearchgrid() {
    const payload = {
      searchtype: serchVluses?.searchtype,
      txtsearchInv: serchVluses?.txtsearchInv,
      clientid: String(serchVluses?.clientid),
    };
    
    try {
      const response = await InvestigationMasterBindsearchgrid(payload);
      if (response?.data?.length) {
        setSearchByTableData(response?.data);
        // hendelClearTable()
        setIsSearchActive(true);
      } else {
        notify("No data found", "error");
        setSearchByTableData([]);
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

  let tableDisplayData = isSearchActive ? searchTableData : tableData;

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
      {/* <InvestigationDetails tableData={tableData} onEdit={handleEdit} fetchDataAfterEdit={handleUpdate} /> */}
     
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading title={t("Records")} isBreadcrumb={false} />
          <div className="row p-2">
            <ReactSelect
              placeholderName={t("Serch By")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"searchtype"}
              name={"searchtype"}
              removeIsClearable={true}
              handleChange={handleReactChangeTable}
              dynamicOptions={serchBydropDownData}
              // requiredClassName="required-fields"
              value={serchVluses?.searchtype}
            />
            <Input
              type="text"
              className="form-control"
              id="txtsearchInv"
              lable={t("Type To Search")}
              placeholder=" "
              required={true}
              value={serchVluses?.txtsearchInv}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="txtsearchInv"
              onChange={handleChangeTable}
            />
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

export default Investigation;
