import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import { Link } from "react-router-dom";

const ProductList = ({ selectitem }) => {
  const [t] = useTranslation();
  console.log(selectitem);
  const [activeClass, setActiveClass] = useState("DS");
  const [showCalculator, setShowCalculator] = useState(true);

  const handleCheckboxChange = (e) => {
    setShowCalculator(e.target.checked);
  };
  const handleClickShiftChange = (classes) => {
    setActiveClass(classes);
    if (classes === "CU") {
    }
  };
  const HandleShiftPage = () => {
    return (
      <>
        <span
          className={`pointer-cursor ${activeClass === "DS" ? "Active-Shift" : ""}`}
          onClick={() => {
            handleClickShiftChange("DS");
          }}
        >
          {t("Description")}
        </span>
        <span
          className={`pointer-cursor ml-2 ${activeClass === "CU" ? "Active-Shift" : ""}`}
          onClick={() => {
            handleClickShiftChange("CU");
          }}
        >
          {t("Contact Us")}
        </span>
      </>
    );
  };
  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row p-2">
          <div className="custom-container">
            <div className="col-sm-4">
              <div className="d-flex align-items-center">
                <i className="fa fa-flask mr-3 labIcon" aria-hidden="true"></i>
                <div>
                  <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {selectitem?.TestName}
                  </label>
                  <p
                    style={{
                      margin: -2,
                      padding: 0,
                      fontSize: "9px",
                      color: "#333",
                    }}
                  >
                    {selectitem?.testCode}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className=" d-flex justify-content-between">
                <div className="calculator-item">
                  <label className="calculator-label">B2C</label>
                  <p className="calculator-value">₹{selectitem?.mrp}</p>
                </div>
                {(
                  <div  className={`calculator-container ${showCalculator ? "" : "hidden"}`}>
                    <div className="calculator-header">
                      <div className="calculator-item">
                        <label className="calculator-label">B2C</label>
                        <p className="calculator-values">₹{selectitem?.rate}</p>
                      </div>
                      <div
                        style={{
                          borderRight: "1px solid #cfcdcd",
                          margin: "5px",
                        }}
                      ></div>
                      <div className="calculator-item">
                        <label className="calculator-label">Earnings</label>
                        <p className="calculator-values">
                          ₹{selectitem?.mrp - selectitem?.rate}
                        </p>
                      </div>
                      <div
                        style={{
                          borderRight: "1px solid #cfcdcd",
                          margin: "5px",
                        }}
                      ></div>
                      <div className="calculator-item">
                        <label className="calculator-label">Margin</label>
                        <p className="calculator-values">
                          {selectitem?.mrp && selectitem?.rate
                            ? `${(((selectitem.mrp - selectitem.rate) / selectitem.mrp) * 100).toFixed(2)}%`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="search-col" style={{ marginLeft: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label className="switch" style={{ marginTop: "7px" }}>
                      <input
                        type="checkbox"
                        name="EmailStatus"
                        checked={showCalculator}
                        onChange={handleCheckboxChange}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-success my-2">
                  START WORK ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Heading title={<HandleShiftPage />}> </Heading>

      {activeClass === "DS" ? (
        <div className="card">
          <div className="row p-2">
            <div className="col-sm-8">
              <div className="custom-block-container">
                <p className="d-flex justify-content-between">
                  <span>
                    <i
                      className="fa fa-edit text-center mr-2"
                      aria-hidden="true"
                    ></i>
                    <label>OverView</label>
                  </span>

                  <Link>
                    {" "}
                    Read more{" "}
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                </p>
                <p className="">
                  Aarogyam 1.6 with UTSH is a profile that consists of 112
                  parameters to help keep a person’s health in check. Key
                  differentiator is the inclusion of Arthrtitis profile along
                  with the other vital tests ...
                </p>
                <p className="d-flex justify-content-left align-items-center">
                  <i class="fa fa-medkit mr-2" aria-hidden="true"></i>
                  <label>Fasting Required</label>
                  <div className="Dyte">No</div>
                </p>
                <p className="d-flex justify-content-left align-items-center">
                  <i class="fa fa-medkit mr-2" aria-hidden="true"></i>
                  <label>Sample Type</label>
                  <div className="Dyte">Yes</div>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "asdsjk"
      )}
    </>
  );
};

export default ProductList;
