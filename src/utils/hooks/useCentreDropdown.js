// hooks/useCentreDropdown.js
import { useEffect, useState } from "react";
import { CenterMasterBindclient } from "../../networkServices/smartReport";
import { handleReactSelectDropDownOptions } from "../../utils/utils";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
export const useCentreDropdown = () => {
  const [centreOptions, setCentreOptions] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [showCentreDropdown, setShowCentreDropdown] = useState(true);
  const localData = useLocalStorage("userDetails", "get");

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await CenterMasterBindclient();

        if (localData?.userDetails?.flag === "1") {
          const userCentre = {
            label: localData.userDetails.centreName,
            value: localData.userDetails.centreId,
          };
          setSelectedCentre(userCentre);
          setShowCentreDropdown(false);
        } else {
          if (response?.status) {
            const options = handleReactSelectDropDownOptions(
              response?.data,
              "CentreName",
              "Centreid"
            );
            setCentreOptions(options);
            setShowCentreDropdown(true);
          }
        }
      } catch (err) {
        console.error("Error fetching centres", err);
      }
    };

    fetchCentres();
  }, []);

  return {
    centreOptions,
    selectedCentre,
    setSelectedCentre,
    showCentreDropdown,
  };
};
