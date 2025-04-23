
// import React, { useState, useMemo } from "react";
// import Input from "../../components/formComponent/Input";

// const Tables = ({
//   thead = [],
//   tbody = [],
//   scroll = {},
//   pagination = { pageSize: 10 },
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);

//   const pageSize = pagination.pageSize || 10;

//   // Filter logic (search by S.No or Test)
//   const filteredData = useMemo(() => {
//     return tbody.filter((row) => {
//       const sNo = row.SNo?.props?.children?.toString()?.toLowerCase();
//       const test = row.Test?.toString()?.toLowerCase();
//       const search = searchTerm.toLowerCase();
//       return sNo?.includes(search) || test?.includes(search);
//     });
//   }, [tbody, searchTerm]);

//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div>
//       {/* 🔍 Search input */}
//       <div className="mb-2">
//         <Input
//           type="text"
//           className="form-control"
//           id="test"
//           lable="Search by Test"
//           placeholder=" "
//           required={true}
//           value={searchTerm}
//           respclass="col-xl-3 col-md-4 col-sm-6 col-12"
//           name="test"
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1); // Reset to first page on new search
//           }}
//         />
//       </div>

//       {/* 📋 Scrollable + Responsive Table */}
//       <div
//         className="table-responsive"
//         style={{ maxHeight: scroll?.y || "auto" }}
//       >
//         <table className="table table-bordered table-hover">
//           <thead style={{ position: "sticky", top: 0, background: "#f9f9f9", zIndex: 1 }}>
//             <tr className="coutomTableThead">
//               {thead.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => {
//                 const isSelected = selectedRowIndex === index;
//                 return (
//                   <tr
//                     key={index}
//                     className={isSelected ? "table-active" : ""}
//                     onClick={() => setSelectedRowIndex(index)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {Object.values(row).map((cell, idx) => (
//                       <td key={idx}>{cell}</td>
//                     ))}
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={thead.length} className="text-center">
//                   No Data Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔄 Pagination Controls - Centered */}
//       <div className="d-flex justify-content-center align-items-center gap-3 p-2">
//         <button
//           className="btn btn-sm btn-primary"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>

//         <span>
//           Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
//         </span>

//         <button
//           className="btn btn-sm btn-primary"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages || totalPages === 0}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Tables;


import React, { useState, useMemo } from "react";
import Input from "../../components/formComponent/Input";
import Table from "react-bootstrap/Table"; 

const Tables = ({
  thead = [],
  tbody = [],
  scroll = {},
  pagination = { pageSize: 10 },
  isSearchInput,
  isSearchInputlable
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const pageSize = pagination.pageSize || 10;
  // 🔍 Filter logic
  const filteredData = useMemo(() => {
    return tbody.filter((row) => {
      const sNo = row.SNo?.props?.children?.toString()?.toLowerCase();
      const test = row.Test?.toString()?.toLowerCase();
      const search = searchTerm.toLowerCase();
      return sNo?.includes(search) || test?.includes(search);
    });
  }, [tbody, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      {/* 🔍 Search Input */}
         {  isSearchInput===true? (  <div className="mb-2">
        <Input
          type="text"
          className="form-control"
          id="test"
          lable={isSearchInputlable}
          placeholder={isSearchInputlable}
          required={true}
          value={searchTerm}
          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
          name="test"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />
      </div>):null}

      {/* 📋 Scrollable + Bootstrap Table */}
      <div
        className="table-responsive"
        style={{ maxHeight: scroll?.y || "auto", overflowY: "auto" }}
      >
        <Table bordered className="mainTable pt-2">
          <thead style={{ zIndex: 1 }}>
            <tr>
              {thead.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => {
                const isSelected = selectedRowIndex === index;
                return (
                  <tr
                    key={index}
                    className={isSelected ? "table-active" : ""}
                    onClick={() => setSelectedRowIndex(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {Object.values(row).map((cell, idx) => (
                      <td key={idx}>{cell}</td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={thead.length}>
                 <div className="noDataFoun"> No Data Found</div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* 🔄 Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center gap-3 p-2">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tables;
