import React, { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import { MRDBindRoom, MRDSaveNewRoom } from "../../../networkServices/MRDApi";
import Tables from "../../../components/UI/customTable";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import Input from "../../../components/formComponent/Input";
import { notify } from "../../../utils/utils";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { useTransition } from "react";



const ReportObservation = () => {
//--------------------------------- Static Data Table Data ------------------
  const dataTable = [
    {
      SNo: 1,
      CenterName: "Room1",
      State: "Maharashtra",
      City: "Mumbai",
      Address: "123 Main Street",
      Status: "Active"
    },
    {
      SNo: 2,
      CenterName: "Sahil Testing",
      State: "Delhi",
      City: "New Delhi",
      Address: "456 Test Avenue",
      Status: "Inactive"
    },
    {
      SNo: 3,
      CenterName: "Test1",
      State: "Karnataka",
      City: "Bangalore",
      Address: "789 Code Street",
      Status: "Active"
    },
    {
      SNo: 4,
      CenterName: "Room999",
      State: "Gujarat",
      City: "Ahmedabad",
      Address: "101 Dev Lane",
      Status: "Inactive"
    },
    {
      SNo: 5,
      CenterName: "Anand's Room",
      State: "Tamil Nadu",
      City: "Chennai",
      Address: "555 Anand Street",
      Status: "Active"
    }
  ];
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");
  const [tableData, setTableData] = useState([]);

  const [payload, setPayload] = useState({
    roomName: "",
    savetype: "Save",
    isActive: "1",
    roomID: "",
  });

  const THEAD = [
    t("S.No"),
    t("Center Name"),
    t("Investigation"),
    t("Observation Name"),
    t("Observation Code"),
    t("Modify"),
    t("Remove"),
  ];
  
  const IS_ACTIVE_OPTION = [
    {
      label: "Yes",
      value: "1",
    },
  
    {
      label: "No",
      value: "0",
    },
  ];

  const handleMRDBindRoom = async () => {
    try {
      const response = await MRDBindRoom();
     // console.log('response',response.data);
      
       //setTableData(response?.data);
       setTableData(dataTable);
    } catch (error) {
      console.log(error, "SomeThing Went Wrong");
    }
  };

  const handleEdit = (row) => {
    setPayload({
      roomName: row?.NAME,
      isActive: row?.IsActive,
      roomID: row?.RMID,
      savetype: "Update",
    });
  };

  const handleTableData = (tableData) => { 
    return tableData?.map((row, index) => {
      const { CenterName, State, City, Address,Status } = row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        CenterName:CenterName,
        State: State,
        City: City,
        Address: Address,
        Edit: <i className="fa fa-edit" style={{ color: "#1873c9", }}onClick={() => handleEdit(row)}></i>,
        Deletet: <i className="fa fa-trash text-danger" style={{ color: "#1873c9", }}onClick={() => handleEdit(row)}></i>,
    //     Edit:  <button className="btn btn-sm btn-primary"
    //     onClick={() => handleEdit(row)}>{"Edit"}
    //   </button>,
      };
    });
  };

  const handleMRDSaveNewRoom = async () => {
    try {
      const response = await MRDSaveNewRoom({
        ...payload,
        ipAddress: String(ip),
      });
      // notify(response?.message, response?.success ? "success" : "error");
      if (response?.success) {
        handleMRDBindRoom();
        setPayload({
          roomName: "",
          savetype: "Save",
          isActive: "1",
          roomID: "",
        });
      }
    } catch (error) {
      console.log(error, "SomeThing Went Wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleReactChange = (name, e) => {
    setPayload({
      ...payload,
      [name]: e?.value,
    });
  };
  
  useEffect(() => {
    handleMRDBindRoom();
  }, []);
  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading title={t("Records")} isBreadcrumb={false} />
          <div className="row p-2">
            {/* <Input
              type="text"
              className="form-control"
              id="roomName"
              lable={t("Search Entity")}
              placeholder=" "
              required={true}
              value={payload?.roomName}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="roomName"
              onChange={handleChange}
            /> */}

            {/* <ReactSelect
              placeholderName={t("IsActive")}
              searchable={true}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              id={"isActive"}
              name={"isActive"}
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={IS_ACTIVE_OPTION}
              value={payload?.isActive}
            /> */}

            {/* <div className="col-xl-2 col-md-4 col-sm-6 col-12">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleMRDSaveNewRoom}
              >
                {payload?.roomID ? t("Update"): t("Save")}
              </button>
            </div> */}
          </div>
          <div className="row p-2">
            <div className="col-12">
              <Tables thead={THEAD} tbody={handleTableData(tableData?.length ? tableData : [])} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportObservation;