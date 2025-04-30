import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useWindowSize } from "@app/utils/hooks/useWindowSize";
import { calculateWindowSize } from "@app/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setWindowSize } from "@app/store/reducers/ui";
import ReactGA from "react-ga4";
import RenderRoute from "@app/routes/RenderRoute";
import Loading from "@app/components/loader/Loading";
// import { useLocalStorage } from "./utils/hooks/useLocalStorage";
import { getBindCategory } from "./store/reducers/TokenManagementSlice/CommonExportFunction";
import {
  GetBindAllDoctorConfirmation,
  getBindPanelList,
} from "./store/reducers/common/CommonExportFunction";
import { setMenuBasedOnRole } from "./store/reducers/common/CommonSlice";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";
import { getCentreNameAction } from "./store/reducers/CentreName/getCentreName";

const { VITE_NODE_ENV } = import.meta.env;

const App = () => {
  const localData = useLocalStorage("userDetails", "get");
  // console.log('localDataFlag:::', localData?.flag)

  const user = JSON.parse(localStorage.getItem("userDetails"));
const roleFlag = Number(user?.flag); // Or however you're getting the role

  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const screenSize = useSelector((state) => state.ui.screenSize);
  const loading = useSelector((state) => state.loadingSlice.loading);

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  // useEffect(() => {
  //   if (localData?.flag === 1) {
  //     dispatch(setMenuBasedOnRole({ roleFlag: localData.flag }));
  //   }
  // }, [localData?.flag]);

  useEffect(() => {
    dispatch(setMenuBasedOnRole({ roleFlag }));
  }, [dispatch, roleFlag]);
  
  useEffect(() => {
    if (location && location.pathname && VITE_NODE_ENV === "production") {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
      });
    }
  }, [location]);

  useEffect(() => {
    dispatch(getCentreNameAction());
  }, [dispatch]);
  return (
    <>
      {loading && <Loading />}
      <RenderRoute />
      {/* <ToastContainer
        autoClose={1000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      /> */}
    </>
  );
};

export default App;
