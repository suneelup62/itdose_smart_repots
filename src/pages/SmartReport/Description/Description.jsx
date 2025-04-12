import React, { useState,useRef} from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useEffect } from "react";
import { handleReactSelectDropDownOptions, handleReactSelectDropDownOptionsTest, notify } from "../../../utils/utils";
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
    centreid: "",
    testCodeName: "",
    imageBase64: null,
  });

   const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null); // ⬅️ Ref for the file input
  console.log("values", values);


  const GetCentreName = async () => {
    try {
      const response = await CenterMasterBindclient();
      if (response?.status && Array.isArray(response?.data)) { //Added Array check
        console.log("Response data:", response.data); // Log the data for debugging
        setDropDownData((prev) => ({
          ...prev,
          getBindCentreName: handleReactSelectDropDownOptions(response?.data, "CentreName", "Centreid"),
        }));
      } else {
        console.error("Invalid response data from CenterMasterBindclient:", response);
        //Handle the case where response is not as expected, maybe set an empty array?
        setDropDownData((prev) => ({
          ...prev,
          getBindCentreName: [], //or some default value.
        }));
      }
    } catch (error) {
      console.error(error, "Something went wrong in GetCentreName");
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
        console.log("Test code response",response?.data)
        const testCodeOptions = handleReactSelectDropDownOptionsTest(
          response.data,
          "Test",
          "ID",
          "TestCode",
          "TestName"
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
  // const fetchTestGrid = async (id) => {
  //   try {
  //     const response = await BindGetDescription({
  //       centreid: String(id),
  //     });
  //     if (response?.status) {
  //       setTableData(response?.data);
  //       handleCencel();
  //     }
  //     if (response?.data.length === 0) {
  //           notify(" Not Data Found", "error");
  //           }
  //   } catch (error) {
  //     console.error("Something went wrong:", error);
  //   }
  // };


  const fetchTestGrid = async (id) => {
    try {
      const response = await BindGetDescription({ centreid: String(id) });
  
      if (!response?.status || !response?.data || response?.data.length === 0) {
        notify("No Data Found", "error");
        return; // Stop execution if no data
      }
  
      setTableData(response.data); 
      // handleCencel(); // Removed - unnecessary
    } catch (error) {
      console.error("Something went wrong:", error);
      //Consider adding a notification here to inform the user about the general error.  e.g., notify("An error occurred", "error");
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
   // Validate image base64
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
    console.log("payload",payload)
    try {
      const response = await MasterInvestigationDescription(payload);
      if (response?.status) {
        notify(response.message, "success");
        await fetchTestGrid(payload?.Centreid);
        handleCencel();
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
      centreName: null,
      testCode: null,
      Description: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
    setImage(null);         
    setPreview(null);        
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
    console.log("Edit", val);
    setIsEdit(true);
    setValues({
      centreName: val?.Centre,
      testCode: val?.testid,
      Description: val?.Desription,
      centreid: val?.centreid,
      testCodeName: val?.TestCode,
      imageBase64:val?.Image
    });
    setPreview((prev) => {
      return val?.Image ? `data:image/png;base64,${val?.Image}` : null;
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

  //   // ✅ Show original image in preview
  //   setPreview(URL.createObjectURL(file));

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
  //       const rawBase64 = base64.split(",")[1];
  //       setBase64Data(rawBase64); // ✅ Save raw Base64 string for API
  //     };
  //     reader.readAsDataURL(compressedBlob);
  //   } catch (err) {
  //     console.error("Compression failed", err);
  //     notify("Image compression failed.", "error");
  //   }
  // };


    const handleFileChange = (e) => {
      const file = e.target.files[0];
  
      if (file && file.type.startsWith("image/")) {
        setImage(file);
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setPreview(reader.result); // Set preview
          setValues((prev) => ({
            ...prev,
            imageBase64: reader.result.split(",")[1],
          })); // Save Base64 data
        };
  
        reader.readAsDataURL(file);
      } else {
        notify("Please select a valid image file!", "error");
      }
    };
  const handleUpdate = async () => {
    const requiredFields = [
      { key: "centreName", message: "Centre Name is required" },
      { key: "testCode", message: "Test Code is required" },
      { key: "Description", message: "Description is required" },
      // { key: "base64Data", message: "Please upload a valid image file." },
    ];
    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return false;
      }
    }
   // Validate image base64
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
        await fetchTestGrid(payload?.Centreid);
        handleCencel();
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
              isDisabled={isEdit}
              dynamicOptions={dropDownData?.getBindCentreName}
              // requiredClassName="required-fields"
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
               </div>
          

          {/* <div className="row p-2">
            <label className="mt-2 ml-3">Upload Image</label>
            <input
              className="mt-2 ml-3"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {preview && (
              <img
                className="zoomUploadImage"
                src={preview}
                alt="Preview"
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
            )}
          </div> */}
           
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
                  {/* <h4>Image Preview:</h4> */}
                  <img  className="zoomUploadImage" src={preview} alt="Preview" style={{ width: "50px" }} />
                </div>
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
