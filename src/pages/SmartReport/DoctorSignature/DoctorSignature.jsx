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
  CentreDoctorSignature,
  fetchCentreDoctorSignatureAPI,
} from "../../../networkServices/smartReport";
import DoctorSignatureDetails from "./DoctorSignatureDetails";

const doctorSignature = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const [dropDownData, setDropDownData] = useState({
    GetBindCentreName: [],
  });

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
    alignment: null,
    centreid:null
  });

  const [isEdit, setIsEdit] = useState(false);
  const [setChildData, setSetChildData] = useState({});

  const GetCentreName = async () => {
    try {
      const response = await CenterMasterBindclient();
      if (response?.status) {
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

  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = {
      centreName: "Centre name is Required",
      alignment: "Alignment is Required",
    };

    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }

    const payload = {
      Centreid: String(values?.centreName?.Centreid || ""),
      Alignment: String(values.alignment?.value || ""),
    };

    try {
      const response = await CentreDoctorSignature(payload);

      if (response?.status) {
        notify(response.message, "success");
        await fetchCentreDoctorSignature(payload?.Centreid)
        setIsEdit(false);
        handleCencel();
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleUpdate  = async () => {
    const requiredFields = {
      centreName: "Centre name is Required",
      alignment: "Alignment is Required",
    };

    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }

    const payload = {
      Centreid: String(values?.centreid || ""),
      Alignment: String(values?.alignment?.value || ""),
    };

    try {
      const response = await CentreDoctorSignature(payload);

      if (response?.status) {
        notify(response.message, "success");
        await fetchCentreDoctorSignature(payload?.Centreid)
        setIsEdit(false);
        handleCencel();
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };


  function handleCencel() {
    setValues((prev) => ({
      ...prev,
      testName: null,
      alignment: null,
    }));
    setIsEdit(false);
  }
  const fetchCentreDoctorSignature = async (id) => {
    const payload={
      Centreid: String(id),
    }
    console.log("Payload QRcode",payload)
    try {
      const response = await fetchCentreDoctorSignatureAPI(payload);
      if (response?.status) {
        setTableData(response?.data);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

   useEffect(() => {
      if (values?.centreName?.Centreid) {
        fetchCentreDoctorSignature(values?.centreName?.Centreid);
      }
    }, [values?.centreName]);
  const handleEdit = (val) => {
    console.log("Edit", val);
    setIsEdit(true);
    setValues({
      centreName: val?.Centre,
      alignment:val?.Alignment,
      centreid:val?.centreid
    });
  };
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
              placeholderName={t("Select centre name")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"centreName"}
              name={"centreName"}
              removeIsClearable={true}
              isDisabled={isEdit}
              handleChange={handleReactChange}
              dynamicOptions={dropDownData?.GetBindCentreName}
              // requiredClassName="required-fields"
              value={values?.centreName}
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
      <DoctorSignatureDetails tableData={tableData} onEdit={handleEdit} />
    </>
  );
};

export default doctorSignature;
