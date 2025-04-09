import React, {
  StrictMode,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import Input from "../../../components/formComponent/Input";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";
import FullTextEditor from "../Description/TextEditor";
import DescriptionDetails from "./DescriptionDetails";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropImage/cropImage"; // helper to crop
import imageCompression from "browser-image-compression";
import {
  addInvestigationSubmit,
  BindGetDescription,
  BindInvestigationTestCode,
  bindState,
  CenterMasterBindclient,
  InvestigationMasterBindTestgrid,
  InvestigationMasterUpdatetest,
  MasterInvestigationDescription,
  ReportCentreGetData,
} from "../../../networkServices/smartReport";
import Editor from "quill/core/editor";
import { TextEditor } from "rc-easyui";

const Description = () => {
  const [tableData, setTableData] = useState([]);
  const [t] = useTranslation();
  const [dropDownData, setDropDownData] = useState({
    getBindCentreName: [],
    getBindTestCode: [],
  });

  const [Editor, setEditor] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [setChildData, setSetChildData] = useState({});
  // const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [values, setValues] = useState({
    centreName: {},
    testCode: null,
    Image: null,
    Description: "",
    centreid:"",
    testCodeName:""
  });


  const [preview, setPreview] = useState(null); // Base64 string with prefix
  const [base64Data, setBase64Data] = useState(null); // Raw Base64 without prefix
  const [error, setError] = useState(null);

console.log("values",values)

  // console.log("preview",base64Data)
  const GetCentreName = async () => {
    try {
      const response = await CenterMasterBindclient();
      if (response?.status) {
        setDropDownData((prev) => ({
          ...prev,
          getBindCentreName: handleReactSelectDropDownOptions(
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
  const BindTestCode = async (stateID) => {
  
    if (!stateID) {
      setDropDownData((prev) => ({ ...prev, getBindTestCode: [] }));
      return [];
    }

    try {
      const response = await BindInvestigationTestCode({
        clientid: String(stateID),
      });
      if (response?.data) {
        const testCodeOptions = handleReactSelectDropDownOptions(
          response.data,
          "TestCode",
          "ID"
        );
        setDropDownData((prev) => ({
          ...prev,
          getBindTestCode: testCodeOptions,
        }));
        return testCodeOptions; // Return the city options for immediate use
      }
      return [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };
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
  // Separate function to fetch and update test grid data
  const fetchTestGrid = async (id) => {
    try {
      const response = await BindGetDescription({
        centreid: String(id),
      });
      if (response?.status) {
        setTableData(response?.data);
        val.BindTestgrid();
        handleCencel();
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const handleSubmit = async () => {
    debugger 
    const requiredFields = [
      { key: "centreName", message: "Centre Name is required" },
      { key: "testCode", message: "Test Code is required" },
      { key: "Description", message: "Description is required" },
    ];
    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return false;
      }
    }
    if (!base64Data) {
      notify("Please upload a valid image file.", "error");
      return;
    }
    const payload = {
      Centreid: String(values?.centreName?.Centreid),
      Testcode: String(values?.testCode?.label),
      Test_id: String(values?.testCode?.value),
      Description: values?.Description,
      Image: base64Data, // Only the Base64 string (without prefix)
    };
    try {
      const response = await MasterInvestigationDescription(payload);
      if (response?.status) {
        notify(response.message, "success");
        await  fetchTestGrid(payload?.Centreid);
        handleCencel()
      } else {
        notify(response.message, "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };
  const handleCencel = () => {
    setValues((prev) => ({
      ...prev,
    centreName: {},
    testCode: null,
    Description: "",
    }));
    setIsEdit(false);
  };

  useEffect(() => {
    GetCentreName();
  }, []);

  useEffect(() => {
    if (values?.centreName?.Centreid) {
      BindTestCode(values?.centreName?.Centreid);
      fetchTestGrid(values?.centreName?.Centreid);
    }
  }, [values?.centreName]);

  useEffect(() => {
    setValues({ ...values, Template: Editor });
  }, [Editor]);

  const handelTesting = () => {
    setEditable(true);
    console.log("Testing");
  };

  const handleEdit = (val) => {
    console.log("Edit",val)
    setIsEdit(true);
    setValues({
      centreName:val?.Centre,
      testCode:val?.testid,
      Description:val?.Desription,
      centreid:val?.centreid,
      testCodeName:val?.TestCode
    });
    // setPreview(val?.Image)
  };

 
  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   setError(null);

  //   if (!file || !file.type.startsWith("image/")) {
  //     notify("Please upload a valid image file.", "error");
  //     return;
  //   }

  //   try {
  //     const compressedBlob = await imageCompression(file, {
  //       maxSizeMB: 0.05,
  //       maxWidthOrHeight: 300,
  //       useWebWorker: true,
  //     });

  //     if (compressedBlob.size > 51200) {
  //       notify("Compressed image is too large. Try a smaller image.", "error");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64 = reader.result;
  //       setPreview(base64); // Preview image
  //       setBase64Data(base64.split(",")[1]); // Extract only base64 part
  //     };
  //     reader.readAsDataURL(compressedBlob);
  //   } catch (err) {
  //     console.error("Image compression failed:", err);
  //     notify("Image compression failed.", "error");
  //   }
  // };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setError(null);

    if (!file || !file.type.startsWith("image/")) {
      notify("Please upload a valid image file.", "error");
      return;
    }

    // ✅ Show original image in preview
    setPreview(URL.createObjectURL(file));

    try {
      const compressedBlob = await imageCompression(file, {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 300,
        useWebWorker: true,
      });

      if (compressedBlob.size > 51200) {
        notify("Compressed image is too large. Try a smaller image.", "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        const rawBase64 = base64.split(",")[1];
        setBase64Data(rawBase64); // ✅ Save raw Base64 string for API
      };
      reader.readAsDataURL(compressedBlob);
    } catch (err) {
      console.error("Compression failed", err);
      notify("Image compression failed.", "error");
    }
  };
    // const handleUpdate = async (val) => {
    //   debugger
    //   const requiredFields = {
    //     centreName: "Centre name is Required",
    //     testName: "Test name is Required",
    //     testCode: "Test code is Required",
    //     department: "Department is Required",
    //     departmentCode: "Department code is Required",
    //     isActive: "Status code is Required",
    //   };
  
    //   for (const field in requiredFields) {
    //     if (!values?.[field]) {
    //       notify(requiredFields[field], "error");
    //       return;
    //     }
    //   }
  
    //   const payload = {
    //     idd: String(values.tableRowId),
    //     Centreid: String(values.centreName),
    //     TestName: String(values.testName),
    //     Testcode: String(values.testCode),
    //     Department: values?.department,
    //     departcode: values?.departmentCode,
    //     ReportFormat: String(values?.ReportType?.value||values?.ReportType),
    //     chkactive: String(values.isActive?.value),
    //   };
    //   console.log("InvestigationMasterUpdatetest",payload)
    //   try {
    //     const response = await InvestigationMasterUpdatetest();
    //     if (response?.status) {
    //       notify(response?.message, "success");
    //       setIsEdit(false);
    //       await fetchTestGrid(values.centreName);
    //       if (setChildData.isSearchActive) {
    //         const payload1 = {
    //           searchtype: setChildData?.serchVluses?.searchtype,
    //           txtsearchInv: setChildData?.serchVluses?.txtsearchInv,
    //           clientid: String(setChildData?.serchVluses?.clientid),
    //         };
    //         await setChildData.Bindsearchgrid(payload1);
    //       }
    //       handleCencel();
    //     } else {
    //       notify(response.message || "Updation failed", "error");
    //     }
    //   } catch (error) {
    //     console.error("Something went wrong:", error);
    //   }
    // };

    const handleUpdate = async () => {
      debugger 
      const requiredFields = [
        { key: "centreName", message: "Centre Name is required" },
        { key: "testCode", message: "Test Code is required" },
        { key: "Description", message: "Description is required" },
      ];
      for (let field of requiredFields) {
        if (!values[field.key]) {
          notify(field.message, "error");
          return false;
        }
      }
      if (!base64Data) {
        notify("Please upload a valid image file.", "error");
        return;
      }
      const payload = {
        Centreid: String(values?.centreName?.Centreid||values?.centreid),
        Testcode: String(values?.testCode?.label||values?.testCodeName),
        Test_id: String(values?.testCode?.value||values?.testCode),
        Description: values?.Description,
        Image: base64Data, // Only the Base64 string (without prefix)
      };
      try {
        const response = await MasterInvestigationDescription(payload);
        if (response?.status) {
          notify(response.message, "success");
          await  fetchTestGrid(payload?.Centreid);
          handleCencel()
        } else {
          notify(response.message, "error");
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };
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
              dynamicOptions={dropDownData?.getBindCentreName}
              // requiredClassName="required-fields"
              value={values?.centreName}
            />
            <ReactSelect
              placeholderName={t("Select test code")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"testCode"}
              name={"testCode"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={dropDownData?.getBindTestCode}
              // requiredClassName="required-fields"
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

            {/* <div>
              <h3>Upload Image</h3>
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {preview && (
                <div>
                  <h4>Image Preview:</h4>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "200px", marginTop: "10px" }}
                  />
                </div>
              )}
            </div> */}
            {/* <ReactSelect
              placeholderName={t("Centre Name")}
              searchable={true}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              id={"centreName"}
              name={"centreName"}
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={dropDownData?.getBindCentreName}
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
            /> */}
          </div>
          {/* <div className="row p-2">
            <div className="d-flex" style={{}}>
            <label className="mt-2 ml-3">{"Upload Image"}</label>
              <input type="file" 
              accept="image/*"
              className="mt-2 ml-3"
               onChange={handleFileChange} />
              {preview && (
                <div>
                  <h4>Image Preview:</h4>
                  <img className="zoomUploadImage"
                    src={preview}
                    alt="Preview"
                    style={{ width: "50px"}}
                  />
                </div>
              )}
            </div>
            </div> */}
          {/* <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {image && (
        <div style={{ position: "relative", width: 300, height: 300 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      <button onClick={showCroppedImage}>Crop & Compress</button>

      {preview && (
        <div>
          <h4>Preview:</h4>
          <img src={preview} style={{ width: 100 }} alt="Preview" />
        </div>
      )}
    </div> */}

          <div className="row p-2">
            <label className="mt-2 ml-3">Upload Image</label>
            <input
              className="mt-2 ml-3"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* {preview && (
              <div>
                <h4>Auto-Cropped Preview (≤ 50KB):</h4>
                <img
                  className="zoomUploadImage"
                  src={preview}
                  alt="Cropped Preview"
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )} */}
            {preview && (
              <img
                className="zoomUploadImage"
                src={preview}
                alt="Preview"
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
            )}
          </div>
          <div className="FullTextEditor">
            {/* <FullTextEditor
              value={values?.Template}
              setValue={setEditor}
              editable={Editable}
              setEditTable={setEditable}
            /> */}
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
      <DescriptionDetails tableData={tableData} onEdit={handleEdit} />
    </>
  );
};

export default Description;
