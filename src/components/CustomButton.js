import React from "react";

const CustomButton = ({ type, btnText, onClick, classes, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-400 p-3 rounded-md ${classes} disabled:bg-gray-500`}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};

export default CustomButton;
