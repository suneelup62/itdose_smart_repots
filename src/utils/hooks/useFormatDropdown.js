import { useEffect, useState } from "react";
import { handleReactSelectDropDownOptions } from "../utils";
import { BindReportDrop } from "../../networkServices/smartReport";

export const useFormatDropdown = () => {
    const [formatOptions, setFormatOptions] = useState([]);
  
    useEffect(() => {
      const fetchFormatOptions = async () => {
        try {
          const response = await BindReportDrop();
          if (response?.status) {
            const data = Array.isArray(response.data) ? response.data : [];
            setFormatOptions(handleReactSelectDropDownOptions(data, "FORMAT", "Id"));
          }
        } catch (error) {
          console.error("Error fetching format options", error);
        }
      };
  
      fetchFormatOptions();
    }, []);
  
    return formatOptions;
  };
  