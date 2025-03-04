import React from "react";
import Breadcrumb from "../Breadcrumb";
import { useLocation } from "react-router-dom";

function Heading({ title, onClick, secondTitle, isBreadcrumb,ReactSelectPageWise,ReactSelectPageWise1,removeSecondHeadAlignClass }) {
  const location = useLocation();
  return (
    <div className="card card_background">
      <div className="card-header" onClick={onClick}>
        <h4 className="card-title w-100 d-md-flex align-items-center justify-content-between">
          {isBreadcrumb ? (
            <Breadcrumb path={location?.pathname} />
          ) : (
            <>
              <div className=""><label className="text-nowrap m-0"> {title}</label> </div>
            </>
          )}
          {/* {secondTitle && <div className="p-1 mr-3 d-flex align-items-center  justify-content-end">{secondTitle}  </div>} */}
          {secondTitle && 
          <div className={`mr-3 d-flex color-code-search-resp align-items-center  justify-content-start ${!removeSecondHeadAlignClass&&"justify-content-md-end"} overflow-auto w-md-50  w-100`}>{ReactSelectPageWise && 
          <div className=" mr-3 w" style={{width:"1%"}}>{ReactSelectPageWise}</div>}
          {/* {ReactSelectPageWise1 && 
            <div className=" mr-3 w" style={{width:"30%"}}>{ReactSelectPageWise}</div>} */}
          {secondTitle}  </div>}
         
        </h4>
      </div>
      
    </div>
  );
}

export default Heading;
