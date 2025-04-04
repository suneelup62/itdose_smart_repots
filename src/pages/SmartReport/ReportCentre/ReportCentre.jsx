import React, { useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";
import ReportCentreDetails from "./ReportCentreDetails";
import Tables from "../../../components/UI/customTable";
import { Tabfunctionality } from "../../../utils/helpers";
import {
  bindState,
  ReportCentreGetData,
  smartReportBindCity,
  smartReportNewAddCentre,
  smartReportUpdateCentre,
} from "../../../networkServices/smartReport";

const ReportCenter = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");

  const [values, setValues] = useState({
    centreName: "",
    state: null, // Changed {} to null to avoid object validation issues
    city: null, // Same here
    address: "",
    isActive: 0,
    id: 0,
    centreid: "",
    LoginId:"",
    Password:""
  });
  const [dropDownData, setDropDownState] = useState({
    GetBindState: [],
    GetBindSCity: [],
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
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
  const getState = async () => {
    try {
      const response = await bindState();
      if (response?.data) {
        setDropDownState((preV) => ({
          ...preV,
          GetBindState: handleReactSelectDropDownOptions(
            response?.data,
            "State",
            "ID"
          ),
        }));
      }
    } catch (error) {
      console.log(error, "SomeThing Went Wrong");
    }
  };
  const bindCity = async (stateID) => {
    if (!stateID) {
      setDropDownState((prev) => ({ ...prev, GetBindSCity: [] }));
      return [];
    }

    try {
      const response = await smartReportBindCity({ stateID: String(stateID) });
      if (response?.data) {
        const cityOptions = handleReactSelectDropDownOptions(
          response.data,
          "city",
          "id"
        );
        setDropDownState((prev) => ({
          ...prev,
          GetBindSCity: cityOptions,
        }));
        return cityOptions; // Return the city options for immediate use
      }
      return [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  const handleReactChange = (name, e) => {
    setValues((prev) => ({
      ...prev,
      [name]: e,
      ...(name === "state" ? { city: {} } : {}), // Reset city when state changes
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };
  const handleSubmit = async () => {

    const requiredFields = [
      { key: "centreName", message: "Centre Name is required" },
      { key: "state", message: "State is required" },
      { key: "city", message: "City is required" },
      { key: "address", message: "Address is required" },
    ];
    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return false;
      }
    }
    const payload = {
      txtcentrename: values?.centreName,
      txtstate: String(values?.state?.value),
      txtcity: String(values?.city?.value),
      txtadddress: values?.address,
      chkactive: String(values?.isActive),
      LoginId:(values?.LoginId),
      Password:(values?.Password),
      Logo_Img: values?.imageBase64 || "", // Include the Base64 image
    };
    console.log("payload",payload)
    try {
      const response = await smartReportNewAddCentre(payload);
      if (response?.status) {
        notify(response?.message, "success");
        setIsEdit(false);
        getReportCentreGetData();
        handleCencel();
      } else {
        notify(response?.message, "error");
      }
    } catch (error) {
      console.log(error, "Some Thing Went Wrong");
    }
  };

  const handleEdit = async (val) => {
    console.log("handelEdit",val)
    setIsEdit(true);
    try {
      setValues((prev) => ({
        ...prev,
        centreName: val?.CentreName,
        state: val?.stateid,
        LoginId:val?.LoginId,
        Password:val?.Password,
        city: val?.cityid,
        address: val.Address,
        isActive: val.Isactive === "Active" ? 1 : 0,
        id: 1,
        centreid: val?.Centreid,
      }));
    } catch (error) {
      console.error("Error during edit:", error);
    }
  };

  const handleUpdate = async () => {
    const requiredFields = [
      { key: "centreName", message: "Centre Name is required" },
      { key: "state", message: "State is required" },
      { key: "city", message: "City is required" },
      { key: "address", message: "Address is required" },
    ];
    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return false;
      }
    }

    const payload = {
      centreid: String(values?.centreid || ""),
      txtcentrename: values?.centreName || "",
      txtstate:
        values?.state && typeof values.state === "object"
          ? String(values?.state?.value)
          : String(values?.state || ""),
      txtcity:
        values?.city && typeof values.city === "object"
          ? String(values?.city?.value)
          : String(values?.city || ""),
      txtadddress: values?.address || "",
      chkactive: String(values?.isActive),
      LoginId:(values?.LoginId),
      Password:(values?.Password)
    };

    try {
      const response = await smartReportUpdateCentre(payload);
      if (response?.status) {
        notify(response?.message, "success");
        setIsEdit(false);
        getReportCentreGetData();
        handleCencel();
      } else {
        notify(response?.message, "error");
      }
    } catch (error) {
      console.log(error, "Some Thing Went Wrong");
    }
  };
  const handleCencel = () => {
    setValues((prev) => ({
      ...prev,
      centreName: "",
      state: null,
      LoginId:"",
      Password:"",
      city: null,
      address: "",
      isActive: null,
    }));
    setIsEdit(false);
  };

 // Handle file selection
//  const handleFileChange = (e) => {
//   const file = e.target.files[0];

//   if (file && file.type.startsWith("image/")) {
//     setImage(file);
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result); // Create image preview
//     };
//     reader.readAsDataURL(file);
//   } else {
//     // alert("Please select a valid image file!");
//     notify("Please select a valid image file!","error")
//   }
// };
const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file && file.type.startsWith("image/")) {
    setImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result); // Set preview
      setValues((prev) => ({ ...prev, imageBase64: reader.result.split(",")[1] })); // Save Base64 data
    };

    reader.readAsDataURL(file);
  } else {
    notify("Please select a valid image file!", "error");
  }
};

  useEffect(() => {
    bindCity(values?.state?.value || values?.state);
  }, [values?.state]);

  useEffect(() => {
    getState();
    getReportCentreGetData();
  }, []);

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            <Input
              type="text"
              className="form-control"
              id="centreName"
              lable={t("Centre name")}
              placeholder=" "
              required={true}
              value={values?.centreName}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="centreName"
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control"
              id="LoginId"
              lable={t("LoginId")}
              placeholder=" "
              required={true}
              value={values?.LoginId}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="LoginId"
              onChange={handleChange}
            /><Input
            type="text"
            className="form-control"
            id="Password"
            lable={t("Password")}
            placeholder=" "
            required={true}
            value={values?.Password}
            respclass="col-xl-3 col-md-4 col-sm-6 col-12"
            name="Password"
            onChange={handleChange}
          />
            <ReactSelect
              placeholderName={t("Select state")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"state"}
              name={"state"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={dropDownData?.GetBindState}
              // requiredClassName="required-fields"
              value={values?.state}
            />
            <ReactSelect
              placeholderName={t("Select city")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"city"}
              name={"city"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={dropDownData?.GetBindSCity}
              // requiredClassName="required-fields"
              value={values?.city}
            />
            <TextAreaInput
              type="text"
              name="address"
              rows={2}
              value={values?.address}
              onChange={handleChange}
              lable={t("Address")}
              placeholder=" "
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              className="form-control"
            />
            {/* <ReactSelect
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
            {/* <div className="d-flex">
              <Input
                type="checkbox"
                className="mt-2"
                name="isActive"
                onChange={handleChange}
                checked={values.isActive} // Proper boolean conversion
                respclass="col-md-1 col-1"
              />
              <label className="mt-2 ml-3">{t("IsActive")}</label>
            </div> */}
             <div className="d-flex">
              <label className="mt-2 ml-3">{"IsActive :"}</label>
              <input
                type="checkbox"
                className="mt-2 ml-3"
                name="isActive"
                onChange={handleChange}
                checked={values.isActive === 1}  // Ensure correct boolean conversion
              />
            </div>
            <div className="d-flex" style={{marginLeft: "25px"}}>
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
      <ReportCentreDetails tableData={tableData} onEdit={handleEdit} />
    </>
  );
};

export default ReportCenter;
