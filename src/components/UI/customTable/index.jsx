import React, { useRef, useState } from "react";
import Table from "react-bootstrap/Table";

function Tables({
  thead,
  tbody,
  fs,
  getRowClass,
  style,
  tableHeight,
  scrollView,
  getRowClick,
  WWW,
  handleClassOnRow,
  handleDoubleClick,
}) {
  const isMobile = window.innerWidth <= 768;
  const activeRowRef = useRef(null);

  // Function to handle row click
  const handleRowClick = (rowRef, ele, index) => {
    getRowClick && getRowClick(ele, index);

    // Reset the previous active row style if it exists
    if (activeRowRef.current) {
      // Reset the previous active row to its original color
      const originalColor = activeRowRef.current.getAttribute(
        "data-original-color"
      );
      activeRowRef.current.style.backgroundColor = originalColor;
    }

    // Set the new active row style
    if (rowRef) {
      // Store the original color of the new active row
      rowRef.setAttribute("data-original-color", rowRef.style.backgroundColor);
      rowRef.style.backgroundColor = "lightblue";
      activeRowRef.current = rowRef;
    }
  };

  return (
    tbody?.length > 0 && (
      <div
        id="no-more-tables"
        style={style}
        className={`${tableHeight} ${scrollView} custom-scrollbar TabScroll`}
      >
        <div className="row">
          <div className="col-12  px-0">
            <Table className="mainTable pt-2 pl-2 pr-2" bordered>
              <thead style={{ zIndex: 1 }}>
                <tr>
                  {thead?.map((headData, index) => (
                    <th
                      key={index}
                      style={{
                        width: headData?.width ? headData?.width : "",
                        textAlign: headData?.textAlign
                          ? headData?.textAlign
                          : "",
                      }}
                      className={`${headData?.className ? headData?.className : ""}`}
                    >
                      <span className="px-2">
                        {headData?.name ? headData?.name : headData}
                      </span>
                      &nbsp;
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>
                {tbody?.map((ele, index) => {
                  const keys = Object.keys(ele).filter(
                    (key) => key !== "colorcode"
                  ); // Exclude colorcode
                  const rowColor = ele.colorcode || ""; // Use colorcode if present
                  return (
                    <tr
                      key={index}
                      className={getRowClass ? getRowClass(ele, index) : ""}
                      style={{ backgroundColor: rowColor }}
                      onClick={(e) =>
                        handleRowClick(e.currentTarget, ele, index)
                      }
                      onDoubleClick={(e) =>
                        handleDoubleClick && handleDoubleClick(ele, index)
                      }
                      // onDoubleClick={(e) =>
                      //   handledoubleClick(e.currentTarget, ele, index)
                      // }
                    >
                      {keys?.map((bodyData, inx) => (
                        <td
                          key={inx}
                          data-title={
                            thead[inx]?.name ? thead[inx]?.name : thead[inx]
                          }
                          style={{ width: WWW }}
                          className={
                            handleClassOnRow
                              ? handleClassOnRow(
                                  ele,
                                  thead[inx]?.name
                                    ? thead[inx]?.name
                                    : thead[inx]
                                )
                              : "px-2"
                          }
                        >
                          {ele[bodyData]?.label ? (
                            ele[bodyData]?.label
                          ) : ele[bodyData] ? (
                            ele[bodyData]
                          ) : (
                            <>&nbsp;</>
                          )}
                          {isMobile && <>&nbsp;</>}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  );
}

export default Tables;
