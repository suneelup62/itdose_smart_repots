// useCommonDropdowns CentreNameAndTest
import { useState } from "react";
import {
  BindInvestigationTestCode,
  GetCentreNameAPI,
} from "../../networkServices/smartReport";
import {
  handleReactSelectDropDownOptions,
  handleReactSelectDropDownOptionsTest,
} from "../utils";

export const useCommonDropdowns = () => {
  const [dropDownData, setDropDownData] = useState({
    getBindCentreName: [],
    getBindTestCode: [],
  });

  const GetCentreName = async () => {
    try {
      const response = await GetCentreNameAPI();
      if (response?.status) {
        const data = handleReactSelectDropDownOptions(
          response?.data,
          "CentreName",
          "Centreid"
        );
        setDropDownData((prev) => ({
          ...prev,
          getBindCentreName: data,
        }));
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

  return {
    dropDownData,
    GetCentreName,
    BindTestCode,
  };
};
