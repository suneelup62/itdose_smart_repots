export const ROUNDOFF_VALUE = 2;
export const MOBILE_NUMBER_VALIDATION_REGX = /^\d{0,10}$/;
export const NUMBER_VALIDATION_REGX = /^\d+$/;
export const number = (e, sliceValue, valueGreater) => {
  if (handleCheckDot(e)) {
    return (e.target.value = e.target.value.replace(".", ""));
  } else {
    if (valueGreater) {
      return e.target.value > valueGreater
        ? (e.target.value = e.target.value.slice(0, e.target.value.length - 1))
        : (e.target.value = e.target.value.slice(0, sliceValue));
    } else {
      return (e.target.value = e.target.value.slice(0, sliceValue));
    }
  }
};
export const AMOUNT_REGX = (validDigit) => {
  const patern = new RegExp(
    `^\\d{0,${validDigit}}(\\.\\d{0,${ROUNDOFF_VALUE}})?$`
  );
  return patern;
};
export const VARCHAR_REGX = (validDigit) => {
  const patern = new RegExp(`^[a-zA-Z0-9]{0,${validDigit}}$`);
  return patern;
};
export const PATIENT_DETAILS = {
  ADMISSIONTYPE: "",
  roomType: "",
  BillingCategory: "",
  RoomBed: "",
};

export const Report_Type = [
  { label: "As it is", value: "original" },
  { label: "With Multiplier", value: "multiplier" },
];
