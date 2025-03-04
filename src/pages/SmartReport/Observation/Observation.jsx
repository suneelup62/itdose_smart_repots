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

const StateName = [
  { label: "Andhra Pradesh", value: "AP" },
  { label: "Arunachal Pradesh", value: "AR" },
  { label: "Assam", value: "AS" },
  { label: "Bihar", value: "BR" },
  { label: "Chhattisgarh", value: "CT" },
  { label: "Goa", value: "GA" },
  { label: "Gujarat", value: "GJ" },
  { label: "Haryana", value: "HR" },
  { label: "Himachal Pradesh", value: "HP" },
  { label: "Jharkhand", value: "JH" },
  { label: "Karnataka", value: "KA" },
  { label: "Kerala", value: "KL" },
  { label: "Madhya Pradesh", value: "MP" },
  { label: "Maharashtra", value: "MH" },
  { label: "Manipur", value: "MN" },
  { label: "Meghalaya", value: "ML" },
  { label: "Mizoram", value: "MZ" },
  { label: "Nagaland", value: "NL" },
  { label: "Odisha", value: "OD" },
  { label: "Punjab", value: "PB" },
  { label: "Rajasthan", value: "RJ" },
  { label: "Sikkim", value: "SK" },
  { label: "Tamil Nadu", value: "TN" },
  { label: "Telangana", value: "TG" },
  { label: "Tripura", value: "TR" },
  { label: "Uttar Pradesh", value: "UP" },
  { label: "Uttarakhand", value: "UK" },
  { label: "West Bengal", value: "WB" },
];

const CityName = [
  { label: "Mumbai", value: "MUM" },
  { label: "Delhi", value: "DEL" },
  { label: "Bangalore", value: "BLR" },
  { label: "Hyderabad", value: "HYD" },
  { label: "Ahmedabad", value: "AMD" },
  { label: "Chennai", value: "MAA" },
  { label: "Kolkata", value: "CCU" },
  { label: "Surat", value: "STV" },
  { label: "Pune", value: "PNQ" },
  { label: "Jaipur", value: "JAI" },
  { label: "Lucknow", value: "LKO" },
  { label: "Kanpur", value: "KNU" },
  { label: "Nagpur", value: "NAG" },
  { label: "Indore", value: "IDR" },
  { label: "Thane", value: "THA" },
  { label: "Bhopal", value: "BHO" },
  { label: "Visakhapatnam", value: "VTZ" },
  { label: "Patna", value: "PAT" },
  { label: "Vadodara", value: "BDQ" },
  { label: "Ghaziabad", value: "GZB" },
  { label: "Ludhiana", value: "LUH" },
  { label: "Agra", value: "AGR" },
  { label: "Nashik", value: "ISK" },
  { label: "Faridabad", value: "FDB" },
  { label: "Meerut", value: "MEER" },
  { label: "Rajkot", value: "RAJ" },
  { label: "Varanasi", value: "VNS" },
  { label: "Srinagar", value: "SXR" },
  { label: "Aurangabad", value: "IXU" },
  { label: "Dhanbad", value: "DHN" },
];

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

const ReportCenter = () => {
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");
  const [dropDownData, setDropDownState] = useState({
    BindRoom: [],
    BindRack: [],
  });

  const [payload, setPayload] = useState({
    centerName: "",
    centerInvestigation: "",
    observationName: "",
    observationCode: "",
  });

  const handleMRDBindRoom = async () => {
    try {
      const response = await MRDBindRoom();
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const renderAPI = async () => {
    try {
      const [BindRoom] = await Promise.all([handleMRDBindRoom()]);
      setDropDownState({
        ...dropDownData,
        BindRoom: handleReactSelectDropDownOptions(BindRoom, "NAME", "RMID"),
      });
    } catch (error) {
      console.log(error, "SomeThing Went Wrong");
    }
  };

  const handleMRDBindMRDRack = async (roomID) => {
    try {
      const response = await MRDBindMRDRack(roomID);
      setDropDownState({
        ...dropDownData,
        BindRack: handleReactSelectDropDownOptions(
          response?.data,
          "Name",
          "AlmID"
        ),
      });
    } catch (error) {
      console.log(error, "SomeThing Went Wrong");
    }
      };

  const handleMRDBindRackDetail = async (RackID) => {
    try {
      const response = await MRDBindRackDetail(RackID);
      return response?.data;
    } catch (error) {
      console.log(error, "SomeThing Went Wrong");
    }
  };

  const handleReactChange = (name, e) => {
    const obj = { ...payload };

    if (name === "rackID") {
    }

    obj[name] = e?.value;
    setPayload(obj);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleMRDSaveNewRack = async () => {
    if (
      !payload?.centerName ||
      !payload.centerInvestigation ||
      !payload.observationName ||
      !payload.observationCode 
    ) {
      notify("Please fill all required fields.", "error");
      return;
    }
    try {
      const response = await MRDSaveNewRack({
        ...payload,
        ipAddress: String(ip),
      });
      notify(response?.message, response?.success ? "success" : "error");

      if (response?.success)
        setPayload({
          roomID: "",
          centerName: "",
          address: "",
          noOfShelf: "",
          isActive: "1",
          saveType: "Save",
          noOfMaximumfile: "",
          rackID: "",
        });
    } catch (error) {
      console.log(error, "Some Thing Went Wrong");
    }
  };

  useEffect(() => {
    renderAPI();
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
              id="centerName"
              lable={t("Center Name")}
              placeholder=" "
              required={true}
              value={payload?.centerName}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="centerName"
              onChange={handleChange}
            />
            <ReactSelect
              placeholderName={t("Center Investigation")}
              searchable={true}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              id={"centerInvestigation"}
              name={"centerInvestigation"}
              removeIsClearable={true}
              handleChange={(name, e) => handleReactChange(name, e)}
              dynamicOptions={StateName}
              // requiredClassName="required-fields"
              value={payload?.centerInvestigation}
            />
            <Input
              type="text"
              className="form-control"
              id="observationName"
              lable={t("Observation Name")}
              placeholder=" "
              required={true}
              value={payload?.observationName}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
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
              value={payload?.observationCode}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="observationCode"
              onChange={handleChange}
            />
            <div className="col-xl-2 col-md-4 col-sm-6 col-12">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleMRDSaveNewRack}
              >
                {payload?.rackID ? t("Update") : t("Submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReportObservation />
    </>
  );
};

export default ReportCenter;
