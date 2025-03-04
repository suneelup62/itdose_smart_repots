import React, { useState } from "react";
import ReactSelect from "../../../formComponent/ReactSelect";
import { Report_Type } from "../../../../utils/constant";

const RateDownloadModal = () => {
  const [payload, setPayload] = useState({ type: "original" });
  const handleReactSelect = (name, e) => {
    setPayload({
      ...payload,
      [name]: e.value,
    });
  };
  return (
    <>
      <ReactSelect
        placeholderName={"All Centre"}
        id="type"
        name="type"
        removeIsClearable={true}
        value={payload?.type}
        dynamicOptions={Report_Type}
        handleChange={handleReactSelect}
        searchable={true}
        respclass={"col-12"}
      />
    </>
  );
};

export default RateDownloadModal;
