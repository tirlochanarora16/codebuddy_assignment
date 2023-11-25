import React from "react";
import CustomInput from "./CustomInput";

const FormOne = () => {
  return (
    <div className="outline outline-1 outline-white text-black">
      <CustomInput
        id={"email"}
        labelText={"E-mail"}
        placeholder={"Enter e-mail"}
        required={true}
        type={"email"}
      />
      <CustomInput
        id={"email2"}
        labelText={"E-mail"}
        placeholder={"Enter e-mail"}
        required={true}
        type={"email"}
      />
    </div>
  );
};

export default FormOne;
