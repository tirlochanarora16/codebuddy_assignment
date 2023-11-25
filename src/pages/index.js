import { useState } from "react";
import FormOne from "@/components/FormOne";
import FormTwo from "@/components/FormTwo";
import FormThree from "@/components/FormThree";
import CustomButton from "@/components/CustomButton";

export default function Home() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
  });
  const [formValidationError, setFormValidationError] = useState({});

  let componentToRender = null;

  const formOneOnChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const saveFormData = () => {
    if (formStep === 0) {
      const { email, password } = formData;
      // checking valid email
      const checkValidEmail =
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      if (!checkValidEmail) {
        setFormValidationError((prev) => ({
          ...prev,
          email: "Please enter a valid email",
        }));
      } else {
        setFormValidationError((prev) => ({ ...prev, email: "" }));
      }

      // checking valid pasword
      const isPasswordValid =
        /^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*\d){2})(?=(?:.*[!@#$%^&*()_-]){2}).{8,}$/.test(
          password
        );

      if (!isPasswordValid) {
        setFormValidationError((prev) => ({
          ...prev,
          password:
            "Please enter a valid password. Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.",
        }));
      } else {
        setFormValidationError((prev) => ({ ...prev, password: "" }));
      }

      if (checkValidEmail && isPasswordValid) {
        localStorage.setItem("formData", JSON.stringify(formData));
        setFormStep((prev) => (prev += 1));
      }
    } else if (formStep === 1) {
      const { firstName, lastName, address } = formData;

      // validate first name
      const validFirstName = /^[a-zA-Z]{2,50}$/.test(firstName);

      if (!validFirstName) {
        setFormValidationError((prev) => ({
          ...prev,
          firstName:
            "Please enter valid first name. nly alphabets. Minimum of 2 character and maximum 50.",
        }));
      } else {
        setFormValidationError((prev) => ({ ...prev, firstName: "" }));
      }

      // validate last name if present
      const validLastName = /^[a-zA-Z]*$/.test(lastName);

      if (!validLastName) {
        setFormValidationError((prev) => ({
          ...prev,
          lastName: "Only alphabets are allowed",
        }));
      } else {
        setFormValidationError((prev) => ({ ...prev, lastName: "" }));
      }

      // validate address
      const validAddress = /^.{10,}$/.test(address);

      if (!validAddress) {
        setFormValidationError((prev) => ({
          ...prev,
          address: "Please enter a valid address. Minimum length 10.",
        }));
      } else {
        setFormValidationError((prev) => ({ ...prev, address: "" }));
      }

      // updating local storage
      if (validFirstName && validLastName && validAddress) {
        localStorage.setItem("formData", JSON.stringify(formData));
        setFormStep((prev) => (prev += 1));
      }
    } else {
    }
  };

  console.log("formData", formData);

  if (formStep === 0) {
    componentToRender = (
      <FormOne
        formData={formData}
        onChange={formOneOnChange}
        formValidationError={formValidationError}
      />
    );
  } else if (formStep === 1) {
    componentToRender = (
      <FormTwo
        formData={formData}
        onChange={formOneOnChange}
        formValidationError={formValidationError}
      />
    );
  } else {
    componentToRender = (
      <FormThree formData={formData} setFormData={setFormData} />
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-1/2 p-4 rounded-md">
        {componentToRender}
        <div className="grid grid-cols-3 mt-10 gap-3">
          <CustomButton
            type="button"
            btnText={"Back"}
            classes={""}
            disabled={formStep === 0}
            onClick={() => setFormStep((prev) => (prev -= 1))}
          />
          <CustomButton
            type="button"
            btnText={"Save"}
            classes={"bg-blue-900"}
            disabled={formStep === 2}
            onClick={saveFormData}
          />
          <CustomButton
            type="button"
            btnText={"Next"}
            classes={""}
            disabled={formStep === 2}
            onClick={() => {
              if (formStep === 0 || formStep === 1) {
                saveFormData();
              } else {
                setFormStep((prev) => (prev += 1));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
