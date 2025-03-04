// import React, { Fragment, Suspense, lazy, useEffect, useState } from "react";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Loading from "@app/components/loader/Loading";
// import ErrorBoundary from "../layouts/error-Boundary";
// import Layout from "@app/layouts";
// import { useDispatch, useSelector } from "react-redux";

// import { useLocalStorage } from "../utils/hooks/useLocalStorage";
// import {
//   GetBindMenu,
//   GetBindResourceList,
//   GetRoleListByEmployeeIDAndCentreID,
// } from "../store/reducers/common/CommonExportFunction";

// function RenderRoute() {
//   const { GetMenuList } = useSelector((state) => state?.CommonSlice);
//   const localData = useLocalStorage("userData", "get");
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [waitForRoute, setWaitForRoute] = useState(true);

//   const fetchData = async () => {
//     try {
//       await dispatch(
//         GetRoleListByEmployeeIDAndCentreID({
//           employeeID: localData?.employeeID,
//           centreID: localData?.centreID,
//         })
//       );

//       await dispatch(
//         GetBindMenu({
//           RoleID: localData?.defaultRole,
//         })
//       );

//       await dispatch(GetBindResourceList());

//       setWaitForRoute(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setWaitForRoute(false);
//     }
//   };

//   useEffect(() => {
//     if (localData && GetMenuList?.length === 0) {
//       fetchData();
//     } else {
//       setWaitForRoute(false);
//     }
//   }, [location]);

//   if (waitForRoute) {
//     return <Loading />;
//   }

//   const getAllUrls = [];
//   GetMenuList?.forEach((menu) => {
//     menu?.children?.forEach((child) => {
//       if (child?.url) {
//         getAllUrls.push(child.url.toLowerCase());
//       }
//     });
//   });

//   const bindroutes = (allRoutes["roleRoutes"] || []).reduce((acc, current) => {
//     if (getAllUrls.includes(current?.path?.toLowerCase())) {
//       acc.push(current);
//     }
//     return acc;
//   }, []);

//   return (
//     <ErrorBoundary>
//       <Suspense fallback={<Loading />}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               localData ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
//             }
//           />

//           {[...allRoutes["commonRoutes"], ...bindroutes]?.map(
//             (route, index) => {
//               const Component = route?.component;
//               const Layout = route?.layout || Fragment;
//               const Guard = route?.Guard || Fragment;
//               return (
//                 <Route
//                   path={route?.path}
//                   exact={route?.exact}
//                   key={index}
//                   element={
//                     <Guard>
//                       <Layout>
//                         <Component />
//                       </Layout>
//                     </Guard>
//                   }
//                 />
//               );
//             }
//           )}
//           {/* Catch-all route */}
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </Suspense>
//     </ErrorBoundary>
//   );
// }

// export default RenderRoute;

// const allRoutes = {
//   commonRoutes: [
//     {
//       // Login page route
//       path: "/login",
//       component: lazy(() => import("@app/modules/login/Login.jsx")), // Add your login component here
//       exact: true,
//     },
//     {
//       layout: Layout,
//       path: "/dashboard",
//       component: lazy(() => import("@app/pages/Dashboard.jsx")),
//       exact: true,
//     },
//     {
//       layout: Layout,
//       path: "/RateList",
//       component: lazy(() => import("@app/pages/Master/RateMaster/RateList.jsx")),
//       exact: true,
//     },
//   ],
// };

import React, { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "@app/components/loader/Loading";
import ErrorBoundary from "../layouts/error-Boundary";
import Layout from "@app/layouts";
import Authenticated from "@app/Guard/Authenticated.jsx";
import Guest from "@app/Guard/Guest.jsx";
import { useDispatch, useSelector } from "react-redux";


import {
  GetBindMenu,
  GetBindResourceList,
  GetRoleListByEmployeeIDAndCentreID,
} from "../store/reducers/common/CommonExportFunction";
import { ToastContainer } from "react-toastify";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

function RenderRoute() {
  const { GetMenuList } = useSelector((state) => state?.CommonSlice);
  const localData = useLocalStorage("userData", "get");
  const location = useLocation();
  const dispatch = useDispatch();
  const [waitForRoute, setWaitForRoute] = useState(true);

  const fetchData = async () => {
    try {
      await dispatch(
        GetRoleListByEmployeeIDAndCentreID({
          employeeID: localData?.employeeID,
          centreID: localData?.centreID,
        })
      );

      await dispatch(
        GetBindMenu({
          RoleID: localData?.defaultRole,
        })
      );

      await dispatch(GetBindResourceList());

      setWaitForRoute(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setWaitForRoute(false);
    }
  };

  useEffect(() => {
    if (localData && GetMenuList?.length === 0) {
      fetchData();
    } else {
      setWaitForRoute(false);
    }
  }, [location]);

  if (waitForRoute) {
    return <Loading />;
  }

  const getAllUrls = [];

  [...GetMenuList]?.forEach((menu) => {
    menu?.children?.forEach((child) => {
      if (child?.url) {
        getAllUrls.push(child.url.toLowerCase());
      }
    });
  });

  // Filter and bind routes to getAllUrls
  const bindroutes = allRoutes["roleRoutes"].reduce((acc, current) => {
    if (getAllUrls.includes(current?.path?.toLowerCase())) {
      acc.push(current);
    }
    return acc;
  }, []);
  return (
    <>
      <ToastContainer
        autoClose={1000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            {[...allRoutes["commonRoutes"], ...bindroutes]?.map(
              (route, index) => {
                const Component = route?.component;
                const Layout = route?.layout || Fragment;
                const Guard = route?.Guard || Fragment;
                return (
                  <Route
                    path={route?.path}
                    exact={route?.exact}
                    key={index}
                    element={
                      <Guard>
                        <Layout>
                          <Component />
                        </Layout>
                      </Guard>
                    }
                  />
                );
              }
            )}
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default RenderRoute;

const allRoutes = {
  commonRoutes: [
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/dashboard",
      component: lazy(() => import("@app/pages/Dashboard.jsx")),
      exact: true,
    },
    {
      Guard: Guest,
      path: "/login",
      component: lazy(() => import("../modules/login/Login")),
      exact: true,
    },
    {
      path: "/ForgetPassword",
      component: lazy(() => import("@app/modules/login/ForgetPassword.jsx")),
      exact: true,
    },
  ],
  roleRoutes: [
    {
      layout: Layout,
      path: "/ratelist",
      component: lazy(
        () => import("@app/pages/Master/RateMaster/RateList.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/testList",
      component: lazy(
        () => import("@app/pages/Master/TestMaster/TestList.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/ReceiptReprint",
      component: lazy(
        () => import("@app/pages/Reprint/ReceiptReprint.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/ReportDispatch",
      component: lazy(
        () => import("@app/pages/Report/ReportDispatch.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/dynamicsearch",
      component: lazy(
        () => import("@app/pages/Report/DynamicSearch.jsx")
      ),
      exact: true,
    },
    // Smart Report
    {
      layout: Layout,
      path: "/report-Center",
      component: lazy(
        () => import("@app/pages/SmartReport/ReportCenter/ReportCenter.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/investigation",
      component: lazy(
        () => import("@app/pages/SmartReport/Investigation/Investigation.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/observation",
      component: lazy(
        () => import("@app/pages/SmartReport/Observation/Observation.jsx")
      ),
      exact: true,
    },
  ],
};
