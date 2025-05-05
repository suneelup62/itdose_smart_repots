import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Line, Bar, Pie, PolarArea } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  CommonAPIGetEmpBirthDay,
  DashboardMISUserWiseGraphSetting,
  getDashboardDataTYPEID,
} from "../networkServices/dashboardAPI";
import Welcome from "../components/WelComeCard/Welcome";
import moment from "moment";
import DashboardTable from "../components/UI/customTable/DashboardTable/DashboardTable";
import Modal from "../components/modalComponent/Modal";
import BussinessDashboard from "./BussinessDashboard";
import ScrollComponent from "../components/ScrollComponent";
import {
  useCookiesStorage,
  useLocalStorage,
} from "../utils/hooks/useLocalStorage";
import CardSection from "../components/DashboardUI/CardSection";
import ReactSelect from "../components/formComponent/ReactSelect";
import { notify } from "../utils/utils";
import Marque from "../components/UI/Marque";
import NewsDataDashboard from "../components/modalComponent/Utils/NewsDataDashboard";
import { useCommonDropdownsCenter } from "../utils/hooks/useCommonDropdownsCenter";
import { useDispatch } from "react-redux";
import { useCommonDropdowns } from "../utils/hooks/useCommonDropdowns";
import { useTranslation } from "react-i18next";
import DashboardData from "./DashboardData";
import {
  DashboardGetreportcount,
  DashboardInsertReportcount,
} from "../networkServices/smartReport";
import Input from "../components/formComponent/Input";
import { getCentreNameAction } from "../store/reducers/CentreName/getCentreName";
Chart.register(...registerables);

const Dashboard = () => {
  const localData = useLocalStorage("userDetails", "get");
  const [values, setValues] = useState({
    centreName: null,
    Reportcount: "",
  });
  const [t] = useTranslation();
  const { dropDownData, GetCentreName, BindTestCode } = useCommonDropdowns();
  const [isEdit, setIsEdit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handleReactChange = (name, selectedOption) => {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  };
  const dispatch = useDispatch();
  const [isInsertReportcount, setInsertReportcount] = useState(true);
  const prevCentreId = useRef(null);
  const testGridCacheRef = useRef({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Getreportcount = async (id) => {
    if (testGridCacheRef.current[id]) {
      setTableData(testGridCacheRef.current[id] || "");
      return;
    }

    try {
      const response = await DashboardGetreportcount({ centreid: String(id) });
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

  const handleSubmit = async () => {
    const requiredFields = [
      ...(String(localData?.flag) === "1"
        ? []
        : [{ key: "centreName", message: "Centre Name is required" }]),
      { key: "Reportcount", message: "Reportcount is required" },
    ];

    for (let field of requiredFields) {
      if (!values[field.key]) {
        notify(field.message, "error");
        return;
      }
    }

    const centreId = String(
      values?.centreName?.Centreid || localData?.centreId
    );
    const payload = {
      Centreid: centreId,
      Totalreportcount: String(values.Reportcount),
    };
    try {
      const response = await DashboardInsertReportcount(payload);
      if (response?.status) {
        notify(response.message, "success");
        testGridCacheRef.current[payload.Centreid] = null;
        await Getreportcount(payload?.Centreid);
        handleCancel();
      } else {
        notify(response.message, "error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleCancel = () => {
    setValues((prev) => ({
      ...prev,
      Reportcount: "",
    }));
    setIsEdit(false);
  };

  const ShowAllCentre = async (id) => {
    if (testGridCacheRef.current[id]) {
      setTableData(testGridCacheRef.current[id] || "");
      return;
    }

    try {
      const response = await DashboardGetreportcount({ centreid: String("") });
      if (!response?.status || !response?.data?.length) {
        notify("No Data Found", "error");
        setTableData([]);
        return;
      }
      // testGridCacheRef.current[id] = response.data;
      setTableData(response.data);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };
  useEffect(() => {
    GetCentreName();
    if (localData?.flag == 1) {
      Getreportcount(localData?.centreId);
    }
  }, []);

  useEffect(() => {
    const currentCentreId = values?.centreName?.Centreid;
    if (currentCentreId && currentCentreId !== prevCentreId.current) {
      setValues((prev) => ({ ...prev, testCode: null }));
      Getreportcount(currentCentreId);
      prevCentreId.current = currentCentreId;
    }
  }, [values?.centreName]);

  useLayoutEffect(() => {
    dispatch(getCentreNameAction());
  }, [dispatch]);
  return (
    <div>
      <div className="mainDashboardwrp">
        <div className="card patient_registration border">
          {/* start this code */}
          <div className="row g-4 m-2">
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
            {/* <ReactSelect
                placeholderName={("Select centre name")}
                searchable={true}
                respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                id={"centreName"}
                name={"centreName"}
                removeIsClearable={true}
                handleChange={handleReactChange}
                isDisabled={isEdit}
                dynamicOptions={dropDownData?.getBindCentreName}
                value={values?.centreName}
              /> */}
            {isInsertReportcount ? (
              <>
                <Input
                  type="text"
                  className="form-control"
                  id="Reportcount"
                  lable={t("Insert Reportcount")}
                  placeholder=" "
                  required={true}
                  value={values?.Reportcount}
                  respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                  name="Reportcount"
                  onChange={handleChange}
                />
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleSubmit}
                  style={{ marginRight: "2px" }}
                >
                  {t("Add")}
                </button>
                {localData?.flag == 1 ? (
                  <></>
                ) : (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={ShowAllCentre}
                  >
                    {t("Show all centre")}
                  </button>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <DashboardData tableData={tableData} />
        {/* <div className="button-container-center mt-3">
            {isEdit ? (
              <>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleUpdate}
                >
                  {t("Update")}
                </button>
                <button
                  className="btn btn-sm btn-secondary ml-2"
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
          </div> */}
        {/* <ScrollComponent viewPort={0.7}>
          {handleRenderDashboard(selectedButton)}
        </ScrollComponent> */}
      </div>

      {/* {registerModal.isShow && (
        <Modal
          visible={registerModal?.isShow}
          setVisible={() => {
            setRegisterModal({
              isShow: false,
              App_ID: "",
              ApiData: [],
              Header: "",
              TimeDuration: null,
              component: null,
            });
          }}
          modalWidth={registerModal?.modalWidth}
          Header={registerModal?.Header}
          footer={<></>}
        >
          {registerModal?.component}
        </Modal>
      )} */}
    </div>
  );
};

export default Dashboard;
