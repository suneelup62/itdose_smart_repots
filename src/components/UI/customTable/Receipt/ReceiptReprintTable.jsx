import React from "react";
import Tables from "..";

const ReceiptReprintTable = ({ thead, tbody, handleSelectPatient }) => {
  return (
    <>
      <Tables
        thead={thead}
        tbody={tbody?.map((ele, index) => ({
          SrNo: (
            <span>
              <svg
              width={17}
              height={17}
              viewBox="0 0 64 64"
              fill={"black"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="12"
                y="8"
                width="40"
                height="48"
                rx="4"
                ry="4"
                fill="#fff"
                stroke="#000"
                strokeWidth="2"  
              />
              <rect
                x="24"
                y="4"
                width="16"
                height="8"
                rx="2"
                ry="2"
                fill="#f2c744"
                stroke="#000"
                strokeWidth="2"
              />
              <circle cx="18" cy="22" r="3" fill="#ff5f5f" />
              <rect x="26" y="20" width="20" height="2" rx="1" fill="#000" />
              <circle cx="18" cy="32" r="3" fill="#ff995f" />
              <rect x="26" y="30" width="20" height="2" rx="1" fill="#000" />
              <circle cx="18" cy="42" r="3" fill="#ffcf5f" />
              <rect x="26" y="40" width="20" height="2" rx="1" fill="#000" />
            </svg>
            </span>
          ),
          Date: ele?.Date,
          LedgerTransactionNo: ele?.LedgerTransactionNo,
          PatientCode: ele?.PatientCode,
          FirstName: ele?.FirstName,
          Remarks: ele?.Remarks,
          "Age/Gender": ele?.Age,
          Mobile: ele?.Mobile,
          GrossAmount: ele?.GrossAmount,
          dicAmt: ele?.GrossAmount,
          netAMT: ele?.Amount,
          DueAmount: ele?.DueAmount,
          NetAmount: ele?.NetAmount,
          Centre: ele?.Centre,
          RateType: ele?.RateType,
          DoctorName: ele?.DoctorName,
          User: ele?.CreatedByName,
          edit: <i className="fa fa-edit" aria-hidden="true"></i>,
          dis: <i class="fa fa-info-circle" aria-hidden="true"></i>,
        }))}
        style={{ maxHeight: "162px" }}
        getRowClick={handleSelectPatient}
      />
    </>
  );
};

export default ReceiptReprintTable;
