// // hooks/useCentreDropdown.js
// import { useEffect, useState } from "react";
// import { CenterMasterBindclient } from "../../networkServices/smartReport";
// import { handleReactSelectDropDownOptions } from "../../utils/utils";
// import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
// export const useCentreDropdown = () => {
//   const [centreOptions, setCentreOptions] = useState([]);
//   const [selectedCentre, setSelectedCentre] = useState(null);
//   const [showCentreDropdown, setShowCentreDropdown] = useState(true);
//   const localData = useLocalStorage("userDetails", "get");

//   useEffect(() => {
//     const fetchCentres = async () => {
//       try {
//         const response = await CenterMasterBindclient();

//         if (localData?.userDetails?.flag === "1") {
//           const userCentre = {
//             label: localData.userDetails.centreName,
//             value: localData.userDetails.centreId,
//           };
//           setSelectedCentre(userCentre);
//           setShowCentreDropdown(false);
//         } else {
//           if (response?.status) {
//             const options = handleReactSelectDropDownOptions(
//               response?.data,
//               "CentreName",
//               "Centreid"
//             );
//             setCentreOptions(options);
//             setShowCentreDropdown(true);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching centres", err);
//       }
//     };

//     fetchCentres();
//   }, []);

//   return {
//     centreOptions,
//     selectedCentre,
//     setSelectedCentre,
//     showCentreDropdown,
//   };
// };


// useCentreDropdown.js
import { useState, useEffect } from "react";
import { CenterMasterBindclient, InvestigationMasterBindTestgrid } from "../../networkServices/smartReport";
import { handleReactSelectDropDownOptions } from "../../utils/utils";


export const useCentreDropdown = (userFlag, userCentreId, userCentreName) => {
  const [centreOptions, setCentreOptions] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [showDropdown, setShowDropdown] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await CenterMasterBindclient();
        if (response?.status) {
          const data = Array.isArray(response.data) ? response.data : [];

          if (userFlag === "1") {
            setSelectedCentre({
              label: userCentreName,
              value: userCentreId,
              Centreid: userCentreId,
            });
            setShowDropdown(false);
            await fetchTableData(userCentreId);
          } else {
            setCentreOptions(handleReactSelectDropDownOptions(data, "CentreName", "Centreid"));
          }
        }
      } catch (error) {
        console.error("Error in fetchCentres", error);
      }
    };

    fetchCentres();
  }, [userFlag, userCentreId, userCentreName]);

  const fetchTableData = async (centreId) => {
    try {
      const response = await InvestigationMasterBindTestgrid({ clientid: String(centreId) });
      if (response?.status) {
        setTableData(response.data);
      }
    } catch (error) {
      console.error("Error in fetchTableData", error);
    }
  };

  return {
    centreOptions,
    selectedCentre,
    setSelectedCentre,
    showDropdown,
    tableData,
    fetchTableData,
  };
};
