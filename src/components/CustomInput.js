import React from "react";

const CustomInput = ({ labelText, id, type, placeholder, required }) => {
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default CustomInput;
