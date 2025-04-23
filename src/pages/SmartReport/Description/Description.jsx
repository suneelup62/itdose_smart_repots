import React, { useState, useRef, useEffect } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import {
  handleReactSelectDropDownOptions,
  handleReactSelectDropDownOptionsTest,
  notify,
} from "../../../utils/utils";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";
import DescriptionDetails from "./DescriptionDetails";
import {
  BindGetDescription,
  BindInvestigationTestCode,
  CenterMasterBindclient,
  MasterInvestigationDescription,
} from "../../../networkServices/smartReport";

import { useCommonDropdowns } from "../../../utils/hooks/useCommonDropdowns";
const Description = () => {
  const [t] = useTranslation();
  const { dropDownData, GetCentreName, BindTestCode } = useCommonDropdowns();
    const prevCentreId = useRef(null);
  const [tableData, setTableData] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    centreName: null,
    testCode: null,
    Description: "",
    imageBase64: null,
    centreid: "",
    testCodeName: "",
  });
  

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const testGridCacheRef = useRef({});

  const fetchTestGrid = async (id) => {
    if (testGridCacheRef.current[id]) {
      setTableData(testGridCacheRef.current[id]);
      return;
    }

    try {
      const response = await BindGetDescription({ centreid: String(id) });
      if (!response?.status || !response?.data?.length) {
        notify("No Data Found", "error");
        setTableData([]);
        return;
      }
      testGridCacheRef.current[id] = response.data;
      setTableData(response.data);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setValues((prev) => ({
          ...prev,
          imageBase64: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    } else {
      notify("Please select a valid image file!", "error");
    }
  };

  const handleSubmit = async () => {
 
    const requiredFields = [
      { key: "centreName", message: "Centre Name is required" },
      { key: "testCode", message: "Test Code is required" },
      { key: "Description", message: "Description is required" },
    ];

    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return;
      }
    }

    if (!values.imageBase64) {
      notify("Please upload a valid image file.", "error");
      return;
    }

    const payload = {
      Centreid: String(values?.centreName?.Centreid),
      Testcode: String(values?.testCode?.TestCode),
      Test_id: String(values?.testCode?.value),
      Description: values?.Description,
      Image: values?.imageBase64,
    };

    try {
      const response = await MasterInvestigationDescription(payload);
      if (response?.status) {
        notify(response.message, "success");
        testGridCacheRef.current[payload.Centreid] = null;

        await fetchTestGrid(payload.Centreid);
        handleCancel();
      } else {
        notify(response.message, "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleUpdate = async () => {
    const requiredFields = [
      { key: "centreName", message: "Centre Name is required" },
      { key: "testCode", message: "Test Code is required" },
      { key: "Description", message: "Description is required" },
    ];

    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return;
      }
    }

    if (!values.imageBase64) {
      notify("Please upload a valid image file.", "error");
      return;
    }

    const payload = {
      Centreid: String(values?.centreName?.Centreid || values?.centreid),
      Testcode: String(values?.testCode?.label || values?.testCodeName),
      Test_id: String(values?.testCode?.value || values?.testCode),
      Description: values?.Description,
      Image: values?.imageBase64,
    };

    try {
      const response = await MasterInvestigationDescription(payload);
      if (response?.status) {
        notify(response.message, "success");

        // 💡 Invalidate testGrid cache before fetching new
        testGridCacheRef.current[payload.Centreid] = null;

        await fetchTestGrid(payload.Centreid);
        handleCancel();
      } else {
        notify(response.message, "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleEdit = (val) => {
    setIsEdit(true);
    setValues({
      centreName: val?.Centre,
      testCode: val?.testid,
      Description: val?.Desription,
      imageBase64: val?.Image,
      centreid: val?.centreid,
      testCodeName: val?.TestCode,
    });
    setPreview(val?.Image ? `data:image/png;base64,${val?.Image}` : null);
  };

  const handleCancel = () => {
    setValues(prev => ({
      ...prev,
      testCode: null,
      Description: "",
      imageBase64: null,
      centreid: "",
      testCodeName: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreview(null);
    setImage(null);
    setIsEdit(false);
  };

  useEffect(() => {
    GetCentreName();
  }, []);


  useEffect(() => {
    const currentCentreId = values?.centreName?.Centreid;
    if (currentCentreId && currentCentreId !== prevCentreId.current) {
      setValues((prev) => ({ ...prev, testCode: null }));
      BindTestCode(currentCentreId);
      fetchTestGrid(currentCentreId);
      prevCentreId.current = currentCentreId;
    }
  }, [values?.centreName]);

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
              handleChange={handleReactChange}
              isDisabled={isEdit}
              dynamicOptions={dropDownData?.getBindCentreName}
              value={values?.centreName}
            />
            <ReactSelect
              placeholderName={t("Select test")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"testCode"}
              name={"testCode"}
              removeIsClearable={true}
              isDisabled={isEdit}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={dropDownData?.getBindTestCode}
              value={values?.testCode}
            />
            <TextAreaInput
              type="text"
              name="Description"
              rows={2}
              value={values?.Description}
              onChange={handleChange}
              lable={t("Description")}
              placeholder=" "
              respclass="col-xl-6 col-md-4 col-sm-6 col-12"
              className="form-control"
            />
          </div>

          <div className="d-flex" style={{ marginLeft: "25px" }}>
            <label className="mt-2 ml-3">{"Upload Image"}</label>
            <input
              type="file"
              accept="image/*"
              className="mt-2 ml-3"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {preview && (
              <div>
                <img
                  className="zoomUploadImage"
                  src={preview}
                  alt="Preview"
                  style={{ width: "50px" }}
                />
              </div>
            )}
          </div>

          <div className="button-container-center mt-3">
            {isEdit ? (
              <>
                <button className="btn btn-sm btn-primary" onClick={handleUpdate}>
                  {t("Update")}
                </button>
                <button className="btn btn-sm btn-secondary ml-2" onClick={handleCancel}>
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
      <DescriptionDetails tableData={tableData} onEdit={handleEdit}/>
    </>
  );
};

export default Description;
