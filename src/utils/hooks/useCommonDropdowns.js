// // useCommonDropdowns CentreNameAndTest
// import { useState } from "react";
// import {
//   BindInvestigationTestCode,
//   GetCentreNameAPI,
// } from "../../networkServices/smartReport";
// import {
//   handleReactSelectDropDownOptions,
//   handleReactSelectDropDownOptionsTest,
// } from "../utils";
// import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
// import { useSelector } from "react-redux";

// export const useCommonDropdowns = () => {
//   const localData = useLocalStorage("userDetails", "get");
//   const { centres, loading, error } = useSelector((state) => state.CentreName);

//   const [dropDownData, setDropDownData] = useState({
//     getBindCentreName: [],
//     getBindTestCode: [],
//   });

//   const GetCentreName = async () => {
//     try {
//       const response = await GetCentreNameAPI();
//       if (response?.status) {
//         const data = handleReactSelectDropDownOptions(
//           response?.data,
//           "CentreName",
//           "Centreid"
//         );
//         if(localData?.flag==1){
//            const allCenterName=data
//            const cenenterNameFlagOne=allCenterName.filter((e)=>{
//             return e.Centreid == localData?.centreId
//            })
//           setDropDownData((prev) => ({
//             ...prev,
//             getBindCentreName: cenenterNameFlagOne,
//           }));
//         }
//         else{
//           setDropDownData((prev) => ({
//             ...prev,
//             getBindCentreName: data,
//           }));
//         }
       
//         return data;
//       }
//     } catch (error) {
//       console.log(error, "GetCentreName Error");
//     }
//   };

//   const BindTestCode = async (clientId) => {
//     try {
//       const response = await BindInvestigationTestCode({
//         clientid: String(clientId),
//       });

//       if (response?.data) {
//         const testCodeOptions = handleReactSelectDropDownOptionsTest(
//           response.data,
//           "Test",
//           "ID",
//           "TestCode",
//           "TestName"
//         );

//         setDropDownData((prev) => ({
//           ...prev,
//           getBindTestCode: testCodeOptions,
//         }));
//         return testCodeOptions;
//       }
//     } catch (error) {
//       console.log(error, "BindTestCode Error");
//     }
//   };

//   return {
//     dropDownData,
//     GetCentreName,
//     BindTestCode,
//     centres
//   };
// };




// useCommonDropdowns CentreNameAndTest
// import { useEffect, useLayoutEffect, useState } from "react";
// import {
//   BindInvestigationTestCode,
//   GetCentreNameAPI,
// } from "../../networkServices/smartReport";
// import {
//   handleReactSelectDropDownOptions,
//   handleReactSelectDropDownOptionsTest,
// } from "../utils";
// import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { getCentreNameAction } from "../../store/reducers/CentreName/getCentreName";

// export const useCommonDropdowns = () => {
//   const localData = useLocalStorage("userDetails", "get");
//   const { centres, loading, error } = useSelector((state) => state.CentreName);
//   const dispatch = useDispatch();
//   const [dropDownData, setDropDownData] = useState({
//     getBindCentreName: [],
//     getBindTestCode: [],
//   });
//   // const GetCentreName = async () => {
//   //   try {
//   //     const response = await GetCentreNameAPI();
//   //     if (response?.status) {
//   //       const data = handleReactSelectDropDownOptions(
//   //         response?.data,
//   //         "CentreName",
//   //         "Centreid"
//   //       );
//   //       if(localData?.flag==1){
//   //          const allCenterName=data
//   //          const cenenterNameFlagOne=allCenterName.filter((e)=>{
//   //           return e.Centreid == localData?.centreId
//   //          })
//   //         setDropDownData((prev) => ({
//   //           ...prev,
//   //           getBindCentreName: cenenterNameFlagOne,
//   //         }));
//   //       }
//   //       else{
//   //         setDropDownData((prev) => ({
//   //           ...prev,
//   //           getBindCentreName: data,
//   //         }));
//   //       }
       
//   //       return data;
//   //     }
//   //   } catch (error) {
//   //     console.log(error, "GetCentreName Error");
//   //   }
//   // };


//   const GetCentreName = async () => {
//     try {
//       // const response = await GetCentreNameAPI();
//       if (!loading) {
//         const data = await handleReactSelectDropDownOptions(
//            centres,
//           "CentreName",
//           "Centreid"
//         );
//         if(localData?.flag==1){
//            const allCenterName=data
//            const cenenterNameFlagOne=allCenterName.filter((e)=>{
//             return e.Centreid == localData?.centreId
//            })
//           setDropDownData((prev) => ({
//             ...prev,
//             getBindCentreName: cenenterNameFlagOne,
//           }));
//         }
//         else{
//           setDropDownData((prev) => ({
//             ...prev,
//             getBindCentreName: data,
//           }));
//         }
       
//         return data;
//       }
//     } catch (error) {
//       console.log(error, "GetCentreName Error");
//     }
//   };
//   const BindTestCode = async (clientId) => {
//     try {
//       const response = await BindInvestigationTestCode({
//         clientid: String(clientId),
//       });

//       if (response?.data) {
//         const testCodeOptions = handleReactSelectDropDownOptionsTest(
//           response.data,
//           "Test",
//           "ID",
//           "TestCode",
//           "TestName"
//         );

//         setDropDownData((prev) => ({
//           ...prev,
//           getBindTestCode: testCodeOptions,
//         }));
//         return testCodeOptions;
//       }
//     } catch (error) {
//       console.log(error, "BindTestCode Error");
//     }
//   };
//   useLayoutEffect(() => {
//     dispatch(getCentreNameAction());
//   }, [dispatch]);
//   return {
//     dropDownData,
//     GetCentreName,
//     BindTestCode,
//     centres
//   };
// };


// import { useEffect, useRef, useState } from "react";
// import {
//   BindInvestigationTestCode,
// } from "../../networkServices/smartReport";
// import {
//   handleReactSelectDropDownOptions,
//   handleReactSelectDropDownOptionsTest,
// } from "../utils";
// import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
// import { useSelector, useDispatch } from "react-redux";
// import { getCentreNameAction } from "../../store/reducers/CentreName/getCentreName";

// export const useCommonDropdowns = () => {
//   const localData = useLocalStorage("userDetails", "get");
//   const dispatch = useDispatch();

//   const { centres, loading } = useSelector((state) => state.CentreName);

//   const [dropDownData, setDropDownData] = useState({
//     getBindCentreName: [],
//     getBindTestCode: [],
//   });

//   const hasFetchedCentreName = useRef(false);

//   // Fetch centres on mount
//   useEffect(() => {
//     dispatch(getCentreNameAction());
//   }, [dispatch]);

//   // Populate dropdown once centres are loaded
//   useEffect(() => {
//     const populateCentreName = async () => {
//       if (!loading && centres.length > 0 && !hasFetchedCentreName.current) {
//         hasFetchedCentreName.current = true;

//         const data = await handleReactSelectDropDownOptions(
//           centres,
//           "CentreName",
//           "Centreid"
//         );

//         const filteredData =
//           localData?.flag === 1
//             ? data.filter((e) => e.Centreid === localData?.centreId)
//             : data;

//         setDropDownData((prev) => ({
//           ...prev,
//           getBindCentreName: filteredData,
//         }));
//       }
//     };

//     populateCentreName();
//   }, [centres, loading, localData]);

//   // Manual trigger for re-fetching centre dropdown
//   const GetCentreName = async () => {
//     if (!loading && centres.length > 0) {
//       const data = await handleReactSelectDropDownOptions(
//         centres,
//         "CentreName",
//         "Centreid"
//       );

//       const filteredData =
//         localData?.flag === 1
//           ? data.filter((e) => e.Centreid === localData?.centreId)
//           : data;

//       setDropDownData((prev) => ({
//         ...prev,
//         getBindCentreName: filteredData,
//       }));

//       return filteredData;
//     }
//   };

//   const BindTestCode = async (clientId) => {
//     try {
//       const response = await BindInvestigationTestCode({
//         clientid: String(clientId),
//       });

//       if (response?.data) {
//         const testCodeOptions = handleReactSelectDropDownOptionsTest(
//           response.data,
//           "Test",
//           "ID",
//           "TestCode",
//           "TestName"
//         );

//         setDropDownData((prev) => ({
//           ...prev,
//           getBindTestCode: testCodeOptions,
//         }));

//         return testCodeOptions;
//       }
//     } catch (error) {
//       console.log(error, "BindTestCode Error");
//     }
//   };

//   return {
//     dropDownData,
//     GetCentreName,
//     BindTestCode,
//     centres,
//   };
// };


import { useEffect, useRef, useState } from "react";
import {
  BindInvestigationTestCode,
} from "../../networkServices/smartReport";
import {
  handleReactSelectDropDownOptions,
  handleReactSelectDropDownOptionsTest,
} from "../utils";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { getCentreNameAction } from "../../store/reducers/CentreName/getCentreName";

export const useCommonDropdowns = () => {
  const localData = useLocalStorage("userDetails", "get");
  const dispatch = useDispatch();

  const { centres, loading } = useSelector((state) => state.CentreName);

  const [dropDownData, setDropDownData] = useState({
    getBindCentreName: [],
    getBindTestCode: [],
  });

  // Flag to block re-processing dropdown from Redux data
  const isCentreDropdownLoaded = useRef(false);

  // Dispatch only once to fetch centres
  useEffect(() => {
    if (!centres.length) {
      dispatch(getCentreNameAction());
    }
  }, [dispatch, centres.length]);

  // Process dropdown once centres are available
  useEffect(() => {
    const populateCentreDropdown = async () => {
      if (!loading && centres.length && !isCentreDropdownLoaded.current) {
        isCentreDropdownLoaded.current = true;

        const allData = await handleReactSelectDropDownOptions(
          centres,
          "CentreName",
          "Centreid"
        );

        const filteredData =
          localData?.flag === 1
            ? allData.filter((e) => e.Centreid === localData?.centreId)
            : allData;

        setDropDownData((prev) => ({
          ...prev,
          getBindCentreName: filteredData,
        }));
      }
    };

    populateCentreDropdown();
  }, [centres, loading, localData]);

  // Manual fetcher if needed externally
  const GetCentreName = async () => {
    if (!dropDownData.getBindCentreName.length && centres.length > 0) {
      const allData = await handleReactSelectDropDownOptions(
        centres,
        "CentreName",
        "Centreid"
      );

      const filteredData =
        localData?.flag === 1
          ? allData.filter((e) => e.Centreid === localData?.centreId)
          : allData;

      setDropDownData((prev) => ({
        ...prev,
        getBindCentreName: filteredData,
      }));

      return filteredData;
    }

    return dropDownData.getBindCentreName;
  };

  const BindTestCode = async (clientId) => {
    try {
      const response = await BindInvestigationTestCode({
        clientid: String(clientId),
      });

      if (response?.data) {
        const testCodeOptions = handleReactSelectDropDownOptionsTest(
          response.data,
          "Test",
          "ID",
          "TestCode",
          "TestName"
        );

        setDropDownData((prev) => ({
          ...prev,
          getBindTestCode: testCodeOptions,
        }));

        return testCodeOptions;
      }
    } catch (error) {
      console.error("BindTestCode Error:", error);
    }
  };

  return {
    dropDownData,
    GetCentreName,
    BindTestCode,
    centres,
  };
};
