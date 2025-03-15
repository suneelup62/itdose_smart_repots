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
import { InvestigationMasterBindTestgrid } from "../../../networkServices/smartReport";
import Modal from "../../../components/modalComponent/Modal";
import Observation from "../Observation/Observation";

const InvestigationDetails = ({ tableData, onEdit }) => {
  const [t] = useTranslation();
  const ip = useLocalStorage("ip", "get");

  const [handleModelData, setHandleModelData] = useState({});

  const [tableVluses, setTableVluses] = useState({
    roomName: "",
    savetype: "Save",
    isActive: "1",
    roomID: "",
  });

  const THEAD = [
    t("S.No"),
    t("Center Name"),
    t("Test Name"),
    t("Test Code"),
    t("Department"),
    t("Status"),
    t("Modify"),
    t("Acction"),
  ];

  // const BindTestgrid = async () => {
  //   const tableVluses ={
  //     clientid:String(1)
  //   }
  //   try {
  //     const response = await InvestigationMasterBindTestgrid(tableVluses);
  //     console.log('response',response.data);

  //     setTableData(response?.data);
  //     // setTableData(dataTable);
  //   } catch (error) {
  //     console.log(error, "SomeThing Went Wrong");
  //   }
  // };

  // const handleEdit = (row) => {
  //   settableVluses({
  //     roomName: row?.NAME,
  //     isActive: row?.IsActive,
  //     roomID: row?.RMID,
  //     savetype: "Update",
  //   });
  // };

  const handleClose = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

  const handleObservation = () => {
    setHandleModelData({
      isOpen: true,
      width: "40vw",
      label: "Observation Master",
      Component: <Observation />,
      // RejectPurchaseRequest: RejectPurchaseRequest
    });
  };
  function handleInterpretation(row) {
    console.log(row);
  }

  const handleTableData = (tableData) => {
    return tableData?.map((row, index) => {
      const { centre, TestName, Testcode, Department, status } = row;
      return {
        SNo: <div className="p-1">{index + 1}</div>,
        centre: centre,
        TestName: TestName,
        Testcode: Testcode,
        Department: Department,
        status: (
          <span
            style={{
              color: status === "Active" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {status}
          </span>
        ),
        Modify: (
          <i
            className="fa fa-edit"
            style={{ color: "#1873c9" }}
            onClick={() => onEdit(row)}
          ></i>
        ),
        // Action: (
        //   <button
        //     className="btn btn-sm btn-primary"
        //     onClick={() => handleEdit(row)}
        //   >
        //     {"Observetion"}
        //   </button>,
        //   <button
        //     className="btn btn-sm btn-primary"
        //     onClick={() => handleEdit(row)}
        //   >
        //     {"Interpretation"}
        //   </button>
        // ),

        Action: (
          <div>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => handleObservation(row)}
              style={{ margin: "2px" }}
            >
              Observation
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleInterpretation(row)}
            >
              Interpretation
            </button>
          </div>
        ),
      };
    });
  };

  const handleChangeTable = (e) => {
    const { name, value } = e.target;
    setTableVluses({ ...tableVluses, [name]: value });
  };

  // const handleReactChange = (name, e) => {
  //   settableVluses({
  //     ...tableVluses,
  //     [name]: e?.value,
  //   });
  // };

  return (
    <>
      <div className="mt-2 spatient_registration_card">
        <div className="patient_registration card">
          <Heading title={t("Records")} isBreadcrumb={false} />
          <div className="row p-2">
            {/* <ReactSelect
              placeholderName={t("Search By")}
              searchable={true}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              id={"isActive"}
              name={"isActive"}
              removeIsClearable={true}
              handleChange={handleReactChange}
              dynamicOptions={IS_ACTIVE_OPTION}
              value={tableVluses?.isActive}
            /> */}
            {/* <Input
              type="text"
              className="form-control"
              id="roomName"
              lable={t(" Search")}
              placeholder=" "
              required={true}
              value={tableVluses?.roomName}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="roomName"
              onChange={handleChangeTable}
            /> */}
            {/* 
            <div className="col-xl-2 col-md-4 col-sm-6 col-12">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleMRDSaveNewRoom}
              >
                {tableVluses?.roomID ? t("Update"): t("Save")}
              </button>
            </div> */}
          </div>
          <div className="row p-2">
            <div className="col-12">
              <Tables
                isSearch={true}
                thead={THEAD}
                tbody={handleTableData(tableData?.length ? tableData : [])}
                style={{ maxHeight: "60vh" }}
              />
            </div>
          </div>
        </div>

        {handleModelData?.isOpen && (
          <Modal
            visible={handleModelData?.isOpen}
            setVisible={handleClose}
            modalWidth={handleModelData?.width}
            Header={t(handleModelData?.label)}
            buttonType={"button"}
            // modalData={handleModelData?.modalData}
            // buttons={handleModelData?.extrabutton}
            // buttonName={handleModelData?.buttonName}

            footer={<></>}
            // handleAPI={handleModelData?.RejectPurchaseRequest}
          >
            {handleModelData?.Component}
          </Modal>
        )}
      </div>
    </>
  );
};

export default InvestigationDetails;
