import React, { useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";
import ReportObservation from "./ReportObservation";
import {
  ObservationMasterUpdateObservation,
  ObservationMasterBindObservgrid,
  ReportCentreGetData,
  ObservationMasterAddObservation,
  ObservationMasterRemoveObservation,
} from "../../../networkServices/smartReport";
import { useLayoutEffect } from "react";

const Observation = ({ ObservationRow }) => {

  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");
  const [isEdit, setIsEdit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [dropDownData, setDropDownData] = useState({
    GetBindCentreName: [],
    Getinvid: [],
  });

  const [values, setValues] = useState({
    centreName: null,
    observationName: "",
    observationCode: "",
    invid: null,
    ObservId: "",
  });

  const BindObservgrid = async (payload) => {
    try {
      const response = await ObservationMasterBindObservgrid(payload);
      if (response?.status) {
        setTableData(response?.data);
      }
    } catch (error) {
      console.error("Error in BindObservgrid:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const requiredFields = {
      observationName: "Observation Name is required",
      observationCode: "Observation Code is required",
    };
    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }
    const payload = {
      centreid: String(values?.centreName?.Centreid),
      invid: String(values?.invid?.id),
      ObserName: values?.observationName,
      Obsercode: values?.observationCode,
    };
    try {
      const response = await ObservationMasterAddObservation(payload);
      if (response?.status) {
        notify(response?.message, "success");
        BindObservgrid(payload);
        handleCancel();
      } else {
        notify(response?.message, "error");
      }
    } catch (error) {
      console.error(error, "Some Thing Went Wrong");
    }
  };

  const handleEdit = (val) => {
    setIsEdit(true);
    setValues((prev) => ({
      ...prev,
      ObservId: val?.ObservId,
      observationName: val?.Observname,
      observationCode: val?.observcode,
    }));
  };

  const handleUpdate = async () => {
    const requiredFields = {
      observationName: "Observation Name is required",
      observationCode: "Observation Code is required",
    };

    for (const field in requiredFields) {
      if (!values?.[field]) {
        notify(requiredFields[field], "error");
        return;
      }
    }

    const payload = {
      centreid: values?.centreName?.Centreid
        ? String(values?.centreName?.Centreid)
        : "",
      idd: String(values?.ObservId),
      ObserName: String(values?.observationName),
      Obsercode: String(values?.observationCode),
    };

    try {
      const response = await ObservationMasterUpdateObservation(payload);
      if (response?.status) {
        notify(response?.message, "success");
        setIsEdit(false);

        // Ensure payload is passed correctly for refreshing the grid
        const gridPayload = {
          centreid: values?.centreName?.Centreid
            ? String(values?.centreName?.Centreid)
            : "",
          invid: values?.invid?.id ? String(values?.invid?.id) : "",
        };

        await BindObservgrid(gridPayload);
        handleCancel();
      } else {
        notify(response?.message, "error");
      }
    } catch (error) {
      console.error("Error in handleUpdate:", error);
    }
  };

  const handleDelete = async (val) => {
    const payload = {
      idd: String(val.ObservId),
    };

    try {
      const response = await ObservationMasterRemoveObservation(payload);
      if (response?.status) {
        notify(response?.message, "success");
        const gridPayload = {
          centreid: values?.centreName?.Centreid
            ? String(values?.centreName?.Centreid)
            : "",
          invid: values?.invid?.id ? String(values?.invid?.id) : "",
        };

        await BindObservgrid(gridPayload);
      } else {
        notify(response.message, "error");
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };
  const handleCancel = () => {
    setValues((prev) => ({
      ...prev,
      observationName: "",
      observationCode: "",
    }));
    setIsEdit(false);
  };

  useEffect(() => {
    if (ObservationRow) {
      const payload = {
        centreid: ObservationRow?.Centreid
          ? String(ObservationRow?.Centreid)
          : "",
        invid: ObservationRow?.id ? String(ObservationRow?.id) : "",
      };

      BindObservgrid(payload);
      setValues((prev) => ({
        ...prev,
        centreName: {
          Centreid: ObservationRow?.Centreid || "",
          centre: ObservationRow?.centre || "",
        },
        invid: {
          id: ObservationRow?.id || "",
          TestName: ObservationRow?.TestName || "",
        },
      }));
    }
  }, [ObservationRow]);

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-2">
            {/* <ReactSelect
              placeholderName={values?.centreName?.centre}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"centreName"}
              name={"centreName"}
              isDisabled={true}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={dropDownData?.GetBindCentreName}
              requiredClassName="required-fields"
              value={values?.centreName}
            /> */}
            <Input
              type="text"
              className="form-control"
              id="centreName"
              lable={"Centre Name"}
              placeholder=" "
              required={true}
              disabled={true}
              value={values?.centreName?.centre}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="centreName"
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control"
              id="investigationName"
              lable={"investigation Name"}
              placeholder=" "
              required={true}
              disabled={true}
              value={values?.invid?.TestName}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="investigationName"
              onChange={handleChange}
            />

            <Input
              type="text"
              className="form-control"
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
              className="form-control"
              id="observationCode"
              lable={t("Observation Code")}
              placeholder=" "
              required={true}
              value={values?.observationCode}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="observationCode"
              onChange={handleChange}
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
                  onClick={handleCancel}
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
      <ReportObservation
        tableData={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Observation;
