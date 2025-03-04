import React, { useState } from "react";
import Input from "../../../components/formComponent/Input";
import { useTranslation } from "react-i18next";
import { notify } from "../../../utils/utils";
import RateMasterTable from "./RateMasterTable";
import Heading from "../../../components/UI/Heading";
import ProductList from "./ProductList";
import Cookies from "js-cookie";
import RateDownloadModal from "../../../components/modalComponent/Utils/Ratelist/RateDownloadModal";
import Modal from "../../../components/modalComponent/Modal";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { useFetchApi } from "../../../networkServices/useFetch";

const RatesMaster = () => {
  const [t] = useTranslation();
  const [selectitem, setSelectItem] = useState({});

  const [tableData, setTableData] = useState([]);
  const initialPayload = {
    TestName: "",
  };

  const [payload, setPayload] = useState({ ...initialPayload });
  const [modalHandlerState, setModalHandlerState] = useState({
    header: null,
    show: false,
    size: null,
    component: null,
    footer: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
    // if (name === "TestName") {
    //   const filteredData = tableData?.filter((item) =>
    //     item.testname.toLowerCase().includes(value.toLowerCase())
    //   );
    //   setTableData(filteredData);
    // }
  };

  const handleSearch = async () => {
    try {
      const panelId = payload?.TestName;
      const { response, error } = await useFetchApi(
        "post",
        apiUrls?.GetRateListData,
        { panelId }
      );
      if (response?.success && response?.data?.length > 0) {
        setTableData(response?.data);
      } else {
        notify(response?.message, "error");
      }
    } catch (error) {
      notify("Something Went's Wrong", "error");
    }
  };

  const handleSelectPatient = (val, index) => {
    console.log(val);
    setSelectItem(val);
  };
  const thead = [
    { name: t("Sr. No."), width: "3%" },
    t("Test Code"),
    t("Test Name"),
    t("Rate"),
    t("MRP"),
  ];
  console.log(selectitem);
  const handleModalState = () => {
    setModalHandlerState({
      show: true,
      header: "Download Catalog Prices",
      size: "20vw",
      component: <RateDownloadModal />,
      footer: (
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <div></div>
            <div>
              <button className="btn btn-sm btn-success mx-1">
                <i className="fa fa-download " aria-hidden="true"></i>PDF
              </button>
              <button className="btn btn-sm btn-success mx-1">
                <i className="fa fa-download" aria-hidden="true"></i>Excel
              </button>
            </div>
          </div>
        </div>
      ),
    });
  };
  return (
    <>
      {selectitem?.length > 0 ? (
        <ProductList selectitem={selectitem} />
      ) : (
        <>
          <div className="card">
            <Heading isBreadcrumb={true} />
            <div className="row p-2">
              <Input
                type="text"
                className="form-control"
                id="TestName "
                name="TestName"
                onChange={handleChange}
                value={payload?.TestName}
                lable={t("Test Name")}
                placeholder=" "
                respclass="col-xl-2 col-md-3 col-sm-4 col-12"
              />
              <div className="col-sm-1 d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-success mx-1"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <div className="col-sm-9 d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-success mx-1"
                  onClick={() => handleModalState()}
                >
                  <i className="fa fa-download mx-2" aria-hidden="true"></i>
                  Download
                </button>
              </div>
            </div>
          </div>
          {tableData?.length > 0 && (
            <div className="card mt-2">
              <Heading title={"Test Details"} />
              <div className="row">
                <div className="col-sm-12">
                  <RateMasterTable
                    thead={thead}
                    tbody={tableData}
                    handleSelectPatient={handleSelectPatient}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {modalHandlerState?.show && (
        <Modal
          visible={modalHandlerState?.show}
          setVisible={() =>
            setModalHandlerState({
              show: false,
              component: null,
              size: null,
            })
          }
          modalWidth={modalHandlerState?.size}
          Header={modalHandlerState?.header}
          footer={modalHandlerState?.footer}
        >
          {modalHandlerState?.component}
        </Modal>
      )}
    </>
  );
};

export default RatesMaster;
