import React, { useState, useRef } from "react";
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
    LoginId: "",
    Password: "",
    logoImageBase64: null,
    letterHeadImageBase64: null,
    frontPage: {},
    historic: {},
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

  const FRONT_PAGE_OPTION = [
    {
      label: "Yes",
      value: "1",
    },
    {
      label: "No",
      value: "0",
    },
  ];

  const HISTORIC_REPRESENT = [
    {
      label: "Yes",
      value: "1",
    },
    {
      label: "No",
      value: "0",
    },
  ];
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewLetterHead, setpreviewLetterHead] = useState(null);
  const letterHeadInputRef = useRef(null); // ⬅️ New ref for letterhead
  const fileInputRef = useRef(null); // ⬅️ Ref for the file input
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      { key: "LoginId", message: "LoginId is required" },
      { key: "Password", message: "Password is required" },
      { key: "state", message: "State is required" },
      { key: "city", message: "City is required" },
      { key: "address", message: "Address is required" },
      { key: "frontPage", message: "Front page selection is required." },
      { key: "historic", message: "Historic report selection is required." },
      { key: "logoImageBase64", message: "Please upload a logo image." },
      { key: "letterHeadImageBase64", message: "Please upload a letterhead image." },    
    ];
    for (let field of requiredFields) {
      const val = values[field.key];
      const isObject = typeof val === "object" && val !== null && Object.keys(val).length === 0;
      if (
        val === null ||
        val === undefined ||
        (typeof val === "string" && val.trim() === "") ||
        isObject
      ) {
        notify(field.message, "error");
        return;
      }
    }
    // if (!values?.logoImageBase64) {
    //   notify("Please upload a logo.", "error");
    //   return;
    // }
    // if (!values?.letterHeadImageBase64) {
    //   notify("Please upload a letter Head.", "error");
    //   return;
    // }
    setIsSubmitted(true);
    const payload = {
      txtcentrename: values?.centreName,
      txtstate: String(values?.state?.value),
      txtcity: String(values?.city?.value),
      txtadddress: values?.address,
      chkactive: String(values?.isActive),
      LoginId: values?.LoginId,
      Password: values?.Password,
      Logo_Img: values?.logoImageBase64,
      Letterhead: values?.letterHeadImageBase64,
      Frontpage: String(values?.frontPage?.value),
      HistoricRepresent: String(values?.historic?.value),
    };

    try {
      const response = await smartReportNewAddCentre(payload);
      if (response?.status) {
        notify(response?.message, "success");
        setIsEdit(false);
        setIsSubmitted(false);
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
    console.log("handelEdit", val);
    setIsEdit(true);
    try {
      setValues((prev) => ({
        ...prev,
        centreName: val?.CentreName,
        state: val?.stateid,
        LoginId: val?.LoginId,
        Password: val?.Password,
        city: val?.cityid,
        address: val.Address,
        isActive: val.Isactive === "Active" ? 1 : 0,
        id: 1,
        centreid: val?.Centreid,
        logoImageBase64: val?.Logo_Img,
        letterHeadImageBase64: val?.Letterhead,
        frontPage:
          val?.Frontpage === "Yes"
            ? FRONT_PAGE_OPTION[0]
            : FRONT_PAGE_OPTION[1],
        historic:
          val?.Historicrepresnt === "Yes"
            ? HISTORIC_REPRESENT[0]
            : HISTORIC_REPRESENT[1],
      }));
      setPreview((prev) => {
        return val?.Logo_Img ? `data:image/png;base64,${val?.Logo_Img}` : null;
      });
      setpreviewLetterHead(() => {
        return val?.Letterhead
          ? `data:image/png;base64,${val?.Letterhead}`
          : null;
      });
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

    if (!values.logoImageBase64) {
      notify("Please upload a valid image file.", "error");
      return;
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
      LoginId: values?.LoginId,
      Password: values?.Password,
      Logo_Img: values?.logoImageBase64,
      Letterhead: values?.letterHeadImageBase64,
      Frontpage: String(values?.frontPage?.value),
      HistoricRepresent: String(values?.historic?.value),
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
      LoginId: "",
      Password: "",
      city: null,
      address: "",
      isActive: null,
      logologoImageBase64: null,
      letterHeadImageBase64: null,
      frontPage: null,
      historic: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (letterHeadInputRef.current) letterHeadInputRef.current.value = "";
    setImage(null);
    setPreview(null);
    setpreviewLetterHead(null);
    setIsEdit(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result); // Set preview
        setValues((prev) => ({
          ...prev,
          logoImageBase64: reader.result.split(",")[1],
        })); // Save Base64 data
      };

      reader.readAsDataURL(file);
    } else {
      notify("Please select a valid image file!", "error");
    }
  };

  const handleLetterHeadChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setpreviewLetterHead(reader.result);
        setValues((prev) => ({
          ...prev,
          letterHeadImageBase64: reader.result.split(",")[1],
        }));
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
            />
            <Input
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
              value={values?.isActive}
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
            <ReactSelect
              placeholderName={t("Front page")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"frontPage"}
              name={"frontPage"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={FRONT_PAGE_OPTION}
              // requiredClassName="required-fields"
              value={values?.frontPage?.value}
            />
            <ReactSelect
              placeholderName={t("Health analysis")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"historic"}
              name={"historic"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={HISTORIC_REPRESENT}
              // requiredClassName="required-fields"
              value={values?.historic?.value}
            />

            <div className="d-flex">
              <label className="mt-2 ml-3">{"IsActive :"}</label>
              <input
                type="checkbox"
                className="mt-2 ml-3"
                name="isActive"
                onChange={handleChange}
                checked={values.isActive === 1} // Ensure correct boolean conversion
              />
            </div>
            <div className="d-flex" style={{ marginLeft: "25px" }}>
              <label className="mt-2 ml-3">{"Upload logo"}</label>
              <input
                type="file"
                accept="image/*"
                className="mt-2 ml-3"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              {preview && (
                <div>
                  {/* <h4>Image Preview:</h4> */}
                  <img
                    className="zoomUploadImage"
                    src={preview}
                    alt="Preview"
                    style={{ width: "50px" }}
                  />
                </div>
              )}
            </div>
            <div className="d-flex" style={{ marginLeft: "25px" }}>
              <label className="mt-2 ml-3">{"Upload letter head"}</label>
              <input
                type="file"
                accept="image/*"
                className="mt-2 ml-3"
                onChange={handleLetterHeadChange}
                ref={letterHeadInputRef}
              />
              {previewLetterHead && (
                <div>
                  <img
                    className="zoomUploadImage"
                    src={previewLetterHead}
                    alt="previewLetterHead"
                    style={{ width: "50px" }}
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
              <button
                className="btn btn-sm btn-primary "
                disabled={isSubmitted}
                onClick={handleSubmit}
              >
                {isSubmitted ? "Submitting..." : "Submit"}
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
