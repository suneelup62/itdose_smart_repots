import React from "react";

const RadioInput = ({ label,id, className, inputType="radio" }) => {
  return (
    <div className={`${className}`}>
      <input id={id} type={inputType} className="mx-2" />
      <label htmlFor={id} className="m-0">{label}</label>
    </div>
  );
};

export default RadioInput;
