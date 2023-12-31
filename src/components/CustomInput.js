import React from "react";

const CustomInput = ({
  labelText,
  id,
  type,
  placeholder,
  required,
  otherInputProps,
  onChange,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-3">
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        className="block border border-1 w-full p-2 rounded-md focus:outline-none"
        onChange={onChange}
        {...otherInputProps}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CustomInput;
