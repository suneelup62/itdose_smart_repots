import React, { useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import {
  MRDBindMRDRack,
  MRDBindRackDetail,
  MRDBindRoom,
  MRDSaveNewRack,
} from "../../../networkServices/MRDApi";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";
import ReportObservation from "./ReportObservation";
import {
  bindState,
  InvestigationMasterBindTestgrid,
  ObservationMasterBindObservgrid,
  ReportCenterGetData,
  smartReportBindCity,
} from "../../../networkServices/smartReport";

const Observation = () => {
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");
    const [isEdit, setIsEdit] = useState(false);
    const [tableData, setTableData] = useState([]);
  const [dropDownData, setDropDownState] = useState({
    GetBindCentreName:[],
    Getinvid: [],
  });
  console.log("GetBindSCity",dropDownData.Getinvid)
  
  const IS_ACTIVE_OPTION = [
    {
      label: "Active",
      value: "1",
    },

    {
      label: "Inactive",
      value: "0",
    },
  ];

  const [values, setValues] = useState({
    centreName: {},
    investigationName: "",
    observationName: "",
    observationCode: "",
    invid:"",
    centreid:""
  });

  // const [payloadInvid,setPayloadInvid]=useState({
  //   invid:"",
  //   centreid:""
  // })
  
 console.log("values",values)
const GetCentreName = async () => {
     try {
       const response = await ReportCenterGetData();
       if (response?.data) {
         setDropDownState((preV) => ({
           ...preV,
           GetBindCentreName: handleReactSelectDropDownOptions(
             response?.data,
             "CentreName",
             "Centreid"
           ),
         }));
       }
     } catch (error) {
       console.log(error, "SomeThing Went Wrong");
     }
   };
   // BindTestgrid
   console.log("valuse",values)
   const BindTestgrid = async () => {
     debugger
      const payload = {
        clientid: String(values?.centreName?.Centreid),
      };
  
      try {
        const response = await InvestigationMasterBindTestgrid(payload);
    
        if (Array.isArray(response?.data) && response.data.length > 0) {
          const invidList = response.data.map((item) => item.id);
          const centreidList = response.data.map((item) => item.Centreid);      
          setValues((val) => ({
            ...val,
            invids: invidList,  // Store an array of all `id`s
            centreids: centreidList, // Store an array of all `Centreid`s
          }));
        }

          // if (response?.data) {
          //       const invidOptions = handleReactSelectDropDownOptions(
          //         response.data,
          //         "id",
          //         "Centreid",
                  
          //       );
          //       setDropDownState((prev) => ({
          //         ...prev,
          //         Getinvid: invidOptions,
          //       }));
          //       return invidOptions; 
          //     }
          //     return [];
      } catch (error) {
        console.log(error, "SomeThing Went Wrong");
        return []
      }
    };

// ObservationMaster BindObservgrid
    const BindObservgrid = async () => {
       const payload = {
        //  clientid: String(values?.centreName?.Centreid),
        centreid:String(1),
        invid:String(6)
         
       };
   
       try {
         const response = await ObservationMasterBindObservgrid(payload);
         setTableData(response?.data);
         // setTableData(dataTable);
       } catch (error) {
         console.log(error, "SomeThing Went Wrong");
       }
     };
     const handleReactChange = (name, e, key) => {
      setValues((val) => ({ ...val, [name]: e }));
      if (name == "centreName") {
        BindTestgrid(String(e?.clientid));
      }
      // BindTestgrid(centreName?.clientid)
    };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log("handleSubmit", values);
    if (!values?.centreName) {
      notify("Centre name is required.", "error");
      return;
    }
    if (!values?.investigationName) {
      notify("Investigation name is required.", "error");
      return;
    }
    if (!values?.observationName) {
      notify("Observation name is required.", "error");
      return;
    }
    if (!values?.observationCode) {
      notify("Observation code is required.", "error");
      return;
    }
    const payload = {
      Centreid: String(values?.centreName),
      TestName: values?.testName,
      Testcode: values?.testCode,
      Department: values?.department,
      chkactive: values?.isActive,
      departcode: values?.departmentCode,
    };
    console.log("payload", payload);
    try {
      const response = await addInvestigationSubmit(payload);
      if (response?.success) {
        notify(response?.message, "success");
        // getReportcentreGetData();
      } else {
        notify(response?.message, "error");
      }
    } catch (error) {
      console.log(error, "Some Thing Went Wrong");
    }
  };

  const handleEdit = (val) => {
    console.log("handleEdit", val);
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
    debugger
    if (!values?.centreName) {
      notify("Centre name is Required", "error");
      return;
    }
    if (!values?.testName) {
      notify("Test name is Required", "error");
      return;
    }
    if (!values?.testCode) {
      notify("Test code is Required", "error");
      return;
    }
    if (!values?.department) {
      notify("Department is Required", "error");
      return;
    }
    if (!values?.isActive) {
      notify("Status code is Required", "error");
      return;
    }
    // console.log("smartReportUpdateCentre", values);
    const payload = {
      idd: String(values?.tableRowId),
      Centreid: String(values?.centreName),
      TestName: String(values?.testName),
      Testcode: String(values?.testCode),
      Department: values?.department,
      departcode: values?.departmentCode,
      chkactive: String(values?.isActive?.value),
    };
    // try {
    //   const response = await InvestigationMasterUpdatetest(payload);
    //   if (response?.status) {
    //     notify(response?.message, "success");
    //     setIsEdit(false);
    //       const payload = {
    //   clientid: String(values?.centreName),
    // };

    // try {
    //   const response = await InvestigationMasterBindTestgrid(payload);

    //   setTableData(response?.data);
    //   // setTableData(dataTable);
    // } catch (error) {
    //   console.log(error, "SomeThing Went Wrong");
    // }
    //   }
    // } catch (error) {
    //   console.log(error, "Some Thing Went Wrong");
    // }
  };

  const handleCencel = () => {
    setValues((prev) => ({
      ...prev,
      testName: "",
      testCode: "",
      department: "",
      departmentCode: "",
      isActive: {},
    }));
    setIsEdit(false);
  };

  useEffect(() => {
    GetCentreName()
    BindObservgrid()
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
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={dropDownData?.GetBindCentreName}
              requiredClassName="required-fields"
              value={values?.centreName}
            />
            <ReactSelect
              placeholderName={t("Investigation")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"investigationName"}
              name={"investigationName"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={dropDownData?.Getinvid}
              requiredClassName="required-fields"
              value={values?.investigationName}
            />
            <Input
              type="text"
              className="form-control required-fields"
              id="observationName"
              lable={t("Observation Name")}
              placeholder=" "
              required={true}
              value={values?.observationName}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="observationName"
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control required-fields"
              id="observationCode"
              lable={t("Observation Code")}
              placeholder=" "
              required={true}
              value={values?.observationCode}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="observationCode"
              onChange={handleChange}
            />
            {/* <div className="col-xl-2 col-md-4 col-sm-6 col-12">
              <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
                {values?.rackID ? t("Update") : t("Submit")}
              </button>
            </div> */}
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
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleSubmit}
                >
                  {t("Submit")}
                </button>
              )}
            </div>
        </div>
      </div>
      <ReportObservation tableData={tableData} onEdit={handleEdit} />
    </>
  );
};

export default Observation;
