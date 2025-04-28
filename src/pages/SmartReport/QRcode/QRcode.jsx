import React, { StrictMode, useLayoutEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";

import {
  CenterMasterBindclient,
  CentreQRCode,
  fetchQRcodeDetailsAPI,
} from "../../../networkServices/smartReport";
import QRcodeDetails from "./QRcodeDetails";
import { number } from "../../../utils/constant";
import { useCommonDropdownsCenter } from "../../../utils/hooks/useCommonDropdownsCenter";
import { useCommonDropdowns } from "../../../utils/hooks/useCommonDropdowns";

const QRcode = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const localData = useLocalStorage("userDetails", "get");
  const { dropDownData, GetCentreName } = useCommonDropdowns();
  const [isEdit, setIsEdit] = useState(false);
  const [setChildData, setSetChildData] = useState({});
  const ALIGNMENT_OPTION = [
    {
      label: "Right",
      value: "right",
    },

    {
      label: "Left",
      value: "left",
    },
  ];
  const [values, setValues] = useState({
    centreName: null,
    height: null,
    alignment: null,
    centreid: null,
  });

  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = {
      // centreName: "Centre name is Required",
      height: "Height is Required",
      alignment: "Alignment is Required",
    };

    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }

    const payload = {
      Centreid: String(values?.centreName?.Centreid || localData?.centreId),
      Height: `${values?.height}px`,
      Alignment: String(values?.alignment?.value || ""),
    };

    try {
      const response = await CentreQRCode(payload);
      if (response?.status) {
        notify(response.message, "success");
        fetchQRcodeDetails(payload?.Centreid);
        setIsEdit(false);
        handleCencel();
      } else {
        notify(response.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleUpdate = async () => {
    const requiredFields = {
      // centreName: "Centre name is Required",
      height: "Height is Required",
      alignment: "Alignment is Required",
    };

    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }

    const payload = {
      Centreid: String(values?.centreid || localData?.centreId),
      Height:
        typeof values?.height === "string"
          ? `${values.height}`
          : `${values.height}px`,
      Alignment: values?.alignment?.value || "",
    };

    try {
      const response = await CentreQRCode(payload);
      if (response?.status) {
        notify(response.message, "success");
        fetchQRcodeDetails(payload?.Centreid);
        setIsEdit(false);
        handleCencel();
      } else {
        notify(response.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  function handleCencel() {
    setValues((prev) => ({
      ...prev,
      height: "",
      alignment: null,
    }));
    setIsEdit(false);
  }

  const fetchQRcodeDetails = async (id) => {
    const payload = {
      centreid: String(id||localData?.centreId),
    };
    try {
      const response = await fetchQRcodeDetailsAPI(payload);
      if (response?.status) {
        setTableData(response?.data);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleEdit = (val) => {
    setIsEdit(true);
    setValues({
      centreName: val?.Centre,
      centreid: val?.centreid,
      height: val?.Height,
      alignment: val?.Alignment,
    });
  };

  useEffect(() => {
    if (values?.centreName?.Centreid) {
      fetchQRcodeDetails(values?.centreName?.Centreid);
    }
    if(localData?.flag == 1){
      fetchQRcodeDetails(localData?.centreId) 
    }
    GetCentreName()
  }, [values?.centreName]);

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            {/* <ReactSelect
              placeholderName={t("Select centre name")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"centreName"}
              name={"centreName"}
              removeIsClearable={true}
              isDisabled={isEdit}
              handleChange={(name, e) => handleReactChange(name, e)}
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
            <Input
              type="text"
              className="form-control"
              id="height"
              lable={t("Height pixel")}
              placeholder=" "
              required={true}
              value={values?.height}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="height"
              max="2"
              onChange={handleChange}
            />
            <ReactSelect
              placeholderName={t("Select alignment")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"alignment"}
              name={"alignment"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={ALIGNMENT_OPTION}
              value={values?.alignment}
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
      <QRcodeDetails tableData={tableData} onEdit={handleEdit} />
    </>
  );
};

export default QRcode;
