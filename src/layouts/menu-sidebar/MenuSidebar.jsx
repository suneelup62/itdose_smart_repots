import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import MenuItem from "@app/layouts/menu-sidebar/MenuItem.jsx";
import { Image } from "@profabric/react-components";
import styled from "styled-components";
import i18n from "@app/utils/i18n";
import ReactSelectHead from "../../components/formComponent/ReactSelectHead";
import logo from "@app/assets/image/logo.png";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import { useTranslation } from "react-i18next";
import DesktopMenuItem from "./DesktopMenuItem";
import { GetBindMenu } from "../../store/reducers/common/CommonExportFunction";
// import { GetRoleListByEmployeeIDAndCentreID } from "../../store/reducers/common/getRoleListSlice";

const Version = import.meta.env.VITE_APP_VERSION;

export const MENU = {
  commonComponent: [
    {
      menuName: i18n.t("menusidebar.label.dashboard"),
      icon: "fas fa-tachometer-alt nav-icon",
      children: [
        {
          childrenName: i18n.t("menusidebar.label.dashboard"),
          icon: "fas fa-regular fa-user",
          url: "/dashboard",
          breadcrumb: "Dashboard",
        },
      ],
    },
  ],
  frontOffice: [
    {
      name: i18n.t("RateMaster"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "RateList",
          icon: "fas fa-regular fa-user",
          path: "/ratelist",
          breadcrumb: "Rate Master / Rate List",
        },
        {
          name: "TestMaster",
          icon: "fas fa-regular fa-user",
          path: "/testList",
          breadcrumb: "Test Master / Test List",
        },
      ],
    },
    {
      name: i18n.t("Reprint"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "Reprint",
          icon: "fas fa-regular fa-user",
          path: "/ReceiptReprint",
          breadcrumb: "Reprint/ Receipt Reprint",
        },
      ],
    },
    {
      name: i18n.t("Report"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "Report Dispatch",
          icon: "fas fa-regular fa-user",
          path: "/ReportDispatch",
          breadcrumb: "Report/Report Dispatch",
        },
        {
          name: "Dynamic Search",
          icon: "fas fa-regular fa-user",
          path: "/dynamicsearch",
          breadcrumb: "Report/Dynamic Search",
        },
      ],
    },
  ],
};

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const localData = useLocalStorage("userData", "get"); // get Data from localStorage
  const dispatch = useDispatch();
  const sidebarSkin = useSelector((state) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state) => state.ui.menuChildIndent);
  const screenSize = useSelector((state) => state.ui.screenSize);
  const { GetMenuList } = useSelector((state) => state.CommonSlice);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [GetRoleList, setGetRoleList] = useState([]);

  useEffect(() => {
    let data = useLocalStorage("Role", "get");
    setGetRoleList(data);
  }, []);
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    if (value) {
      const filtered = [...MENU["commonComponent"], ...GetMenuList]
        .map((category) => {
          const filteredChildren = category.children.filter((child) =>
            child.childrenName.toLowerCase().includes(value)
          );

          if (filteredChildren.length > 0) {
            return {
              ...category,
              children: filteredChildren,
            };
          }
          return null;
        })
        .filter((category) => category !== null);

      setFilteredData(filtered);
    } else {
      setFilteredData([...MENU["commonComponent"], ...GetMenuList]);
    }
  };

  // role bind
  const handleChangeRole = async (e) => {
    const { value } = e;
    useLocalStorage("userData", "set", { ...localData, defaultRole: value });
    try {
      await dispatch(
        GetBindMenu({
          RoleID: value,
        })
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    if (GetMenuList?.length > 0) {
      setFilteredData([...MENU["commonComponent"], ...GetMenuList]);
    }
  }, [GetMenuList]);

  return ["lg", "md"].includes(screenSize) ? (
    <DesktopMenuItem filteredData={filteredData} />
  ) : (
    <aside className={`main-sidebar sidebar_border ${sidebarSkin}`}>
      <Link to="#" className="brand-link">
        <StyledBrandImage
          className="logoStyle"
          src={logo}
          alt="AdminLTE Logo"
          width={33}
          height={30}
          rounded
        />
        <span className="brand-text font-weight-bold">Mantis</span>
      </Link>
      <div className="sidebar">
        <div className="row mt-3  bindrole">
          <ReactSelectHead
            placeholderName="Select Role"
            dynamicOptions={GetRoleList?.map((ele) => {
              return {
                label: ele?.RoleName,
                value: ele?.RoleID,
              };
            })}
            searchable={true}
            respclass="col-12"
            value={Number(localData?.defaultRole)}
            handleChange={handleChangeRole}
          />
        </div>
        <div className="row bindrole">
          <div className="col-12">
            <input
              type="text"
              className="form-control search_Items"
              id="search"
              name="search"
              label=""
              value={query}
              onChange={handleSearch}
              placeholder="Search"
              respclass="col-12"
            />
            <i className="fa fa-search search_icon" aria-hidden="true"></i>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className={`nav  nav-sidebar flex-column${
              menuItemFlat ? " nav-flat" : ""
            }${menuChildIndent ? " nav-child-indent" : ""}`}
            role="menu"
          >
            {filteredData?.map((menuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
                isSearched={Boolean(query)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
