import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebarMenu } from "@app/store/reducers/ui";
import NotificationsDropdown from "@app/layouts/header/notifications-dropdown/NotificationsDropdown";
import LanguagesDropdown from "@app/layouts/header/languages-dropdown/LanguagesDropdown";
import Themedropdown from "@app/layouts/header/Theme-dropdown";
import { toggleFullScreen } from "../../utils/helpers";
import SubMenuDropdown from "@app/layouts/header/submenu-dropdown/SubMenuDropdown";
import OverlayDropdown from "./overlay-dropdown";
import { useNavigate } from "react-router-dom";
import UserDropdown from "./user-dropdown/UserDropdown";
import logoitdose from "../../assets/image/logoitdose.png";
import SpeechToTextWithSpeechOutput from "../../components/SpeechToTextWithSpeechOutput";
import Cookies from "js-cookie";
import ReactSelectHead from "../../components/formComponent/ReactSelectHead";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { useFetchApi } from "../../networkServices/useFetch";
import { notify } from "../../utils/utils";
import HeaderInput from "../../components/formComponent/HeaderInput";
const Header = React.memo(() => {
  /**
   * Make an API request for MasterPage/EmployeeWiseCentreList.
   * @param {parametre} EmployeeID - The parametre for EmployeeID from localStorage
   * @param {API Implement Name} options - API for MasterPage/EmployeeWiseCentreList.
   */
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = JSON.parse(Cookies.get("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navbarVariant = useSelector((state) => state.ui.navbarVariant);
  const headerBorder = useSelector((state) => state.ui.headerBorder);
  const screenSize = useSelector((state) => state.ui.screenSize);
  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };
  const [rollID, setRollID] = useState([]);
  const [centerID, setCentreID] = useState([]);
  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  const logOut = () => {
    const token = Cookies.get("authToken");
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });
    Cookies.remove();
    Cookies.remove("authToken", { path: "" });
    Cookies.remove("user", { path: "" });
    localStorage.clear();
    navigate("/login");
  };

  const SetRoleData = async () => {
    try {
      const { response, error } = await useFetchApi(
        "get",
        apiUrls?.GetRoleData
      );

      if (response?.data) {
        setRollID(response?.data);
      } else {
        // notify(error?.response?.message || "Something went wrong.", "error");
      }
    } catch (err) {
      notify(err.message || "Unexpected error occurred.", "error");
    }
  };

  const SetCentreData = async () => {
    try {
      const { response, error } = await useFetchApi(
        "get",
        apiUrls?.GetCentreData
      );
      if (response?.data) {
        setCentreID(response?.data);
      } else {
        // notify(error?.response?.message || "Something went wrong.", "error");
      }
    } catch (err) {
      notify(err.message || "Unexpected error occurred.", "error");
    }
    // use;
  };

  useEffect(() => {
    SetRoleData();
    SetCentreData();
  }, []);
   
  const handleChangeVisit = (e) => {
    const [value, name] = e.target;

    // if (value) {
    //   navigate("/dynamicsearch", { state: { value: value } });
    // }
  };

  const handlePressKey = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      console.log("first",e.target?.value)
      navigate("/dynamicsearch", { state: { value: e.target?.value } });

    }
  };
  return (
    <>
      <nav className={getContainerClasses()} style={{ position: "relative" }}>
        <ul className="navbar-nav">
          {["lg", "md"].includes(screenSize) ? (
            <div className="img-conatiner">
              <div style={{ width: "70%", margin: "auto" }}>
                <img src={logoitdose} className="img-fluid" />
              </div>
            </div>
          ) : (
            <li className="nav-item">
              <button
                onClick={handleToggleMenuSidebar}
                type="button"
                className="nav-link mobilerespBars"
              >
                <i className="fas fa-bars" />
              </button>
            </li>
          )}
        </ul>
        {/* <ul className="navbar-nav ml-6">
        
        </ul> */}

        <ul className="navbar-nav ml-auto selectHRes">
          {/* <li className="nav-item savetheme">
            <div type="button" className=" headerboxsize">
              <ReactSelectHead
                placeholderName="Select Centre"
                dynamicOptions={centerID?.map((ele) => {
                  return { label: ele.Centre, value: ele.centreID };
                })}
                searchable={true}
                value={Number(userDetail?.CentreID)}
                respclass=" col-12 roll-off"
                // handleChange={handleChangeCentre}
                plcN="center"
              />
            </div>
          </li> */}

          {/* {["lg", "md"].includes(screenSize) && (
            <li className="nav-item savetheme">
              <div type="button" className=" headerboxsize">
                <ReactSelectHead
                  placeholderName="Select Role"
                  dynamicOptions={rollID?.map((ele) => {
                    return {
                      label: ele?.RoleName,
                      value: ele?.ID,
                    };
                  })}
                  searchable={true}
                  respclass="col-12 roll-off"
                  value={Number(userDetail?.RoleID)}
                  // handleChange={handleChangeRole}
                  //  respclass="roll-off"
                  plcN="center"
                />
              </div>
            </li>
          )} */}
          {/* <li className="nav-item">
            <HeaderInput
              type="text"
              className="form-control-header"
              id="visitNo "
              name="visitNo"
              // onChange={()=>e.target}
              // value={payload?.visitNo}
              lable={t("Test Name")}
              placeholder="Visit No. / BarCode No."
              respclass="col-12 mt-1"
              onKeyPress={handlePressKey}
            />
          </li> */}

          <li className="nav-item d-md-none">
            <div type="button">
              {/* <i className="fa fa-ellipsis-v" aria-hidden="true"></i> */}
              <SubMenuDropdown />
            </div>
          </li>
          <li className="nav-item position-relative d-none d-md-flex px-1">
            <Themedropdown />
          </li>
          {/* <li className="nav-item">
          <OverLay />
          </li> */}
          {/* <li className="nav-item">
            <button type="button" className="nav-link">
              <i className="fa fa-solid fa-star"></i>
            </button>
          </li> */}
          <li className="nav-item d-none d-md-flex px-1">
            <div type="button">
              <i
                className="fa fa-home text-white"
                aria-hidden="true"
                onClick={() => navigate("/dashboard")}
              ></i>
            </div>
          </li>
          {/* <li className="nav-item d-none d-md-flex px-1">
            <NotificationsDropdown />
          </li> */}

          <li className="nav-item d-none d-md-flex pr-2 ">
            <div>
              {/* <OverLay /> */}
              <OverlayDropdown />
            </div>
          </li>
          <li className="nav-item d-none d-md-flex px-2">
            <div onClick={toggleFullScreen}>
              <i className="fa fa-arrows-alt text-white" aria-hidden="true"></i>
            </div>
          </li>
          <li className="nav-item d-none d-md-flex">
            <button type="button" className="nav-link" onClick={logOut}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </li>

          {/* <li className="nav-item d-none d-md-flex">
            <button type="button" className="nav-link">
              <SpeechToTextWithSpeechOutput />
              <i class="fas fa-solid fa-microphone"></i>
            </button>
          </li> */}

          {/* <li className="nav-item d-none d-md-flex ">
            <LanguagesDropdown />
          </li> */}

          <li className="nav-item d-none d-md-flex">
            <button type="button" className="nav-link d-flex">
              <UserDropdown
                setDropdownOpen={setDropdownOpen}
                dropdownOpen={dropdownOpen}
              />
              <label className="control-label ml-1 d-none d-lg-block text-white">
                {/* {localData?.empName} */}
              </label>
            </button>
          </li>
          {/* <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            onClick={handleToggleControlSidebar}
          >
            <i className="fas fa-th-large" />
          </button>
        </li> */}
        </ul>
      </nav>
      {/* <Header1 /> */}
    </>
  );
});

export default Header;
