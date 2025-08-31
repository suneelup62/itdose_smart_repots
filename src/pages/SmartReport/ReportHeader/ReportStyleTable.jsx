import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Input from "../../../components/formComponent/Input";
import { Colors } from "chart.js";
function ReportStyleTable() {

  const [values, setValues] = useState({
    tableRowId: "",
    centreName: {},
    testName: "",
    testCode: "",
    department: "",
    departmentCode: "",
    isActive: {},
    format:null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Table responsive>
      <thead>
        {/* <tr>
          <th>S.No</th>
          <th>Report Column</th>
        </tr> */}
      </thead>
      <tbody>
        <tr>
          <td><b>Report Header Heigh :</b></td>
          <td><Input
              type="text"
              className="form-control"
              id="testName"
            //   lable={t("Test name")}
              placeholder=" "
              required={true}
              value={values?.testName}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="testName"
              onChange={handleChange}
            /></td>
            <td>
                <div style={{color:"red"}}>*Range 180-350</div>
            </td>
        </tr>
        <tr>
          <td><b>Report Header X Position :</b></td>
          <td><Input
              type="text"
              className="form-control"
              id="testName"
              placeholder=" "
              required={true}
              value={values?.testName}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="testName"
              onChange={handleChange}
            /></td>
            <td>
                <div style={{color:"red"}}>*Range 20-25</div>
            </td>
        </tr>
        <tr>
          <td><b>Report Header Y Position :</b></td>
          <td><Input
              type="text"
              className="form-control"
              id="testName"
              placeholder=" "
              required={true}
              value={values?.testName}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="testName"
              onChange={handleChange}
            /></td>
            <td>
                <div style={{color:"red"}}>*Range 50-130</div>
            </td>
        </tr>
        <tr>
          <td><b>Report Footer Height :</b></td>
          <td><Input
              type="text"
              className="form-control"
              id="testName"
              placeholder=" "
              required={true}
              value={values?.testName}
              respclass="col-xl-3 col-md-4 col-sm-6 col-12"
              name="testName"
              onChange={handleChange}
            /></td>
            <td>
                <div style={{color:"red"}}>*Range 80-110</div>
            </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ReportStyleTable;