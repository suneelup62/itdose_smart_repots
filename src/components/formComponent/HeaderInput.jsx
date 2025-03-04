import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "primereact/tooltip";

function HeaderInput({
  type,
  name,
  className,
  respclass,
  id,
  placeholder,
  lable,
  value,
  onKeyDown,
  required,
  display,
  onChange,
  disabled,
  readOnly,
  defaultValue,
  isUpperCase,
  onBlur,
  inputRef,
  removeFormGroupClass,
  onInput,
  max,
  min,
  key,
  showTooltipCount,
  maxLength,
  tabIndex,
  placeholderLabel,
  onKeyPress
}) {
  const [t] = useTranslation();

  const handleInput = (e) => {
    if (onInput) {
      onInput(e);
    }
    const inputValue = e.target.value;
    e.target.value = inputValue
      .replace(/^\s+/g, "")
      .replace(/(\d)\s+(\d)/g, "$1$2");
  };

  return (
    <>
      <Tooltip
        target={`#${id}`}
        position="top"
        content={
          t(lable) +
          ` ${
            showTooltipCount
              ? "Count : " + (value?.length ? value?.length : "0")
              : ""
          }`
        }
        event="focus"
        className="ToolTipCustom"
      />

      <div className={`${respclass} custominputbox`}>
        <div className={removeFormGroupClass ? "" : "form-group"}>
          <input
            type={type}
            className={className}
            id={id}
            name={name}
            placeholder={placeholder}
            value={isUpperCase ? value?.toUpperCase() : value}
            onKeyDown={onKeyDown}
            key={key}
            onChange={onChange}
            autoComplete="off"
            step={type === "number" ? "0.01" : ""}
            required={required}
            ref={inputRef}
            onBlur={onBlur}
            max={max}
            min={min}
            style={{ textAlign: display ?? "left" }}
            onInput={handleInput}
            disabled={disabled ? disabled : false}
            readOnly={readOnly}
            maxLength={maxLength}
            onKeyPress={onKeyPress}
          />
          {/* {lable && (
            <label htmlFor={id} className="lable truncate">
              {lable}
            </label>
          )} */}
          {/* <span className="placeholderLabel">{placeholderLabel}</span> */}
        </div>
      </div>
    </>
  );
}

export default HeaderInput;
