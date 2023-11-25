import React from "react";
import CustomInput from "./CustomInput";

const FormTwo = ({ formData, onChange, formValidationError }) => {
  return (
    <div className="outline outline-1 outline-white text-black flex flex-col gap-6">
      <CustomInput
        id={"firstName"}
        labelText={"First name"}
        placeholder={"Enter first name"}
        required={true}
        type={"text"}
        onChange={onChange}
        otherInputProps={{ value: formData.firstName }}
        error={formValidationError.firstName}
      />
      <CustomInput
        id={"lastName"}
        labelText={"Last name"}
        placeholder={"Enter last name"}
        required={false}
        type={"text"}
        onChange={onChange}
        otherInputProps={{ value: formData.lastName }}
        error={formValidationError.lastName}
      />
      <CustomInput
        id={"address"}
        labelText={"Address"}
        placeholder={"Enter Address"}
        required={true}
        type={"text"}
        onChange={onChange}
        otherInputProps={{ value: formData.address }}
        error={formValidationError.address}
      />
    </div>
  );
};

export default FormTwo;
