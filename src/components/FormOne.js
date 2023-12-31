import React from "react";
import CustomInput from "./CustomInput";

const FormOne = ({ formData, onChange, formValidationError }) => {
  return (
    <div className="outline outline-1 outline-white text-black flex flex-col gap-6">
      <CustomInput
        id={"email"}
        labelText={"E-mail"}
        placeholder={"Enter e-mail"}
        required={true}
        type={"email"}
        onChange={onChange}
        otherInputProps={{ value: formData.email }}
        error={formValidationError.email}
      />
      <CustomInput
        id={"password"}
        labelText={"Password"}
        placeholder={"Enter password"}
        required={true}
        type={"password"}
        otherInputProps={{ minLength: 8, value: formData.password }}
        onChange={onChange}
        error={formValidationError.password}
      />
    </div>
  );
};

export default FormOne;
