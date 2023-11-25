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
    country: "+91",
    phone: "",
    termsAndCondition: true,
  });
  const [formValidationError, setFormValidationError] = useState({});

  let componentToRender = null;

  const formOnChange = (e) => {
    const { id, value } = e.target;

    if (id === "termsAndCondition") {
      setFormData((prev) => ({ ...prev, [id]: e.target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const saveFormData = async () => {
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
            "Please enter valid first name. Only alphabets. Minimum of 2 character and maximum 50.",
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
      // validate phone number
      const validPhoneNumber = /^[0-9]{10}$/.test(formData.phone);

      if (!validPhoneNumber) {
        setFormValidationError((prev) => ({
          ...prev,
          phone: "Please enter a valid phone number with 10 digits.",
        }));
      } else {
        setFormValidationError((prev) => ({
          ...prev,
          phone: "",
        }));
      }

      // validate terms and condition
      if (!formData.termsAndCondition) {
        setFormValidationError((prev) => ({
          ...prev,
          termsAndCondition: true,
        }));
      } else {
        setFormValidationError((prev) => ({
          ...prev,
          termsAndCondition: false,
        }));
      }

      if (formData.termsAndCondition && validPhoneNumber) {
        localStorage.setItem("formData", JSON.stringify(formData));

        const res = await fetch("https://codebuddy.review/submit", {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            emailId: formData.email,
            countryCode: formData.country,
            phoneNumber: formData.phone,
          }),
        });

        const data = await res.json();

        console.log("success", data);
      }
    }
  };

  console.log("formData", formData);

  if (formStep === 0) {
    componentToRender = (
      <FormOne
        formData={formData}
        onChange={formOnChange}
        formValidationError={formValidationError}
      />
    );
  } else if (formStep === 1) {
    componentToRender = (
      <FormTwo
        formData={formData}
        onChange={formOnChange}
        formValidationError={formValidationError}
      />
    );
  } else {
    componentToRender = (
      <FormThree
        formData={formData}
        onChange={formOnChange}
        formValidationError={formValidationError}
      />
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
            // disabled={formStep === 2}
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
