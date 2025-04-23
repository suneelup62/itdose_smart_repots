// useCommonDropdownsCenter

import { useEffect, useState } from "react";
import {
  BindInvestigationTestCode,
} from "../../networkServices/smartReport";
import {
  handleReactSelectDropDownOptions,
  handleReactSelectDropDownOptionsTest,
} from "../utils";

import { useDispatch, useSelector } from "react-redux";
import { getCentreNameAction } from "../../store/reducers/CentreName/getCentreName";

export const useCommonDropdownsCenter = () => {
  const dispatch = useDispatch();
  const { centres, loading, error } = useSelector((state) => state.CentreName);

  const [dropDownData, setDropDownData] = useState({
    getBindCentreName: [],
    getBindTestCode: [],
  });

  // Bind Test Code dropdown
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
      console.error("BindTestCode Error", error);
    }
  };

  // Fetch centres if not already fetched
  useEffect(() => {
    if (!centres || centres.length === 0) {
      dispatch(getCentreNameAction());
    }
  }, [centres, dispatch]);

  // Set getBindCentreName dropdown when centres change
  useEffect(() => {
    if (centres && centres.length > 0) {
      const centreOptions = handleReactSelectDropDownOptions(
         centres,
        "CentreName",
        "Centreid",
      );

      setDropDownData((prev) => ({
        ...prev,
        getBindCentreName: centreOptions,
      }));
    }
  }, [centres]);

  return {
    dropDownData,
    BindTestCode,
    loadingCentres: loading,
    errorCentres: error,
  };
};
