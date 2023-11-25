import React from "react";
import CustomInput from "./CustomInput";

const FormThree = ({ formData, onChange, formValidationError }) => {
  return (
    <div className="outline outline-1 outline-white text-black flex flex-col gap-6">
      <div>
        <label htmlFor="country" className="block mb-3">
          Country
        </label>
        <select
          name="country"
          id="country"
          className="p-3 rounded-md block w-full"
          onChange={onChange}
          value={formData.country}
          required
        >
          <option value="+91">IN 🇮🇳</option>
          <option value="+1">USA 🇺🇸</option>
        </select>
      </div>
      <CustomInput
        id={"phone"}
        labelText={"Phone number"}
        placeholder={"Enter Phone Number"}
        required={true}
        type={"tel"}
        onChange={onChange}
        otherInputProps={{ value: formData.phone }}
        error={formValidationError.phone}
      />

      <div className="flex flex-col gap-2 items-center justify-start">
        <div className="flex gap-1 items-center justify-start w-full">
          <input
            type="checkbox"
            required
            id="termsAndCondition"
            onChange={onChange}
            className="cursor-pointer"
            checked={formData.termsAndCondition}
          />
          <label htmlFor="termsAndCondition" className="text-md cursor-pointer">
            Please accept terms & conditions
          </label>
        </div>
        {formValidationError.termsAndCondition && (
          <p className="text-red-500 text-sm mt-2 w-full">
            Please accept terms & condition.
          </p>
        )}
      </div>
    </div>
  );
};

export default FormThree;
