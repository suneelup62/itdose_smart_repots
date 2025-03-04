import React from "react";
import { Calendar } from "primereact/calendar";

function DatePicker({
  name,
  className,
  respclass,
  id,
  placeholder,
  lable,
  value,
  handleChange,
  tabIndex,
  inputClassName,
  removeFormGroupClass,
  maxDate,
  minDate,
  disable
}) {
  return (
    <>
      <div className={respclass} style={{ position: "relative" }}>
        {/* <FloatLabel>  */}
        <div className={removeFormGroupClass ? "" : "form-group"}>
          <Calendar
            inputId={id}
            // id={id}
            showIcon
            placeholder={placeholder}
            className={className}
            dateFormat="dd-M-yy"
            value={value?value:null}
            name={name}
            maxDate={maxDate}
            minDate={minDate}
            disabled={disable}
            onChange={handleChange}
            // onChange={(e) => handleChange(name, e.target.value)}
            wrapperclassname="datepicker"
            inputClassName={inputClassName}
            tabIndex={tabIndex ? tabIndex : "-1"}
            // disabledDates={}
            // disabledDays={}
          />
          {/* <label htmlFor="birth_date">Birt h Date</label> */}
          {lable && (
            <label
              htmlFor={id}
              className="label lable truncate "
              style={{ fontSize: "5px !important" }}
            >
              {lable}
            </label>
          )}
        </div>
        {/* </FloatLabel> */}
      </div>
    </>
  );
}

export default DatePicker;
