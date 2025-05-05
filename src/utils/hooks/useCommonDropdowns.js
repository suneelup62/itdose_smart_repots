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
import { useEffect, useLayoutEffect, useState } from "react";
import {
  BindInvestigationTestCode,
  GetCentreNameAPI,
} from "../../networkServices/smartReport";
import {
  handleReactSelectDropDownOptions,
  handleReactSelectDropDownOptionsTest,
} from "../utils";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCentreNameAction } from "../../store/reducers/CentreName/getCentreName";

export const useCommonDropdowns = () => {
  const localData = useLocalStorage("userDetails", "get");
  const { centres, loading, error } = useSelector((state) => state.CentreName);
  const dispatch = useDispatch();
  const [dropDownData, setDropDownData] = useState({
    getBindCentreName: [],
    getBindTestCode: [],
  });
  // const GetCentreName = async () => {
  //   try {
  //     const response = await GetCentreNameAPI();
  //     if (response?.status) {
  //       const data = handleReactSelectDropDownOptions(
  //         response?.data,
  //         "CentreName",
  //         "Centreid"
  //       );
  //       if(localData?.flag==1){
  //          const allCenterName=data
  //          const cenenterNameFlagOne=allCenterName.filter((e)=>{
  //           return e.Centreid == localData?.centreId
  //          })
  //         setDropDownData((prev) => ({
  //           ...prev,
  //           getBindCentreName: cenenterNameFlagOne,
  //         }));
  //       }
  //       else{
  //         setDropDownData((prev) => ({
  //           ...prev,
  //           getBindCentreName: data,
  //         }));
  //       }
       
  //       return data;
  //     }
  //   } catch (error) {
  //     console.log(error, "GetCentreName Error");
  //   }
  // };


  const GetCentreName = async () => {
    try {
      // const response = await GetCentreNameAPI();
      if (!loading) {
        const data = await handleReactSelectDropDownOptions(
           centres,
          "CentreName",
          "Centreid"
        );
        if(localData?.flag==1){
           const allCenterName=data
           const cenenterNameFlagOne=allCenterName.filter((e)=>{
            return e.Centreid == localData?.centreId
           })
          setDropDownData((prev) => ({
            ...prev,
            getBindCentreName: cenenterNameFlagOne,
          }));
        }
        else{
          setDropDownData((prev) => ({
            ...prev,
            getBindCentreName: data,
          }));
        }
       
        return data;
      }
    } catch (error) {
      console.log(error, "GetCentreName Error");
    }
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
      console.log(error, "BindTestCode Error");
    }
  };
  useLayoutEffect(() => {
    dispatch(getCentreNameAction());
  }, [dispatch]);
  return {
    dropDownData,
    GetCentreName,
    BindTestCode,
    centres
  };
};
