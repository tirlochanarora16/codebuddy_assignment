import { useState } from "react";
import FormOne from "@/components/FormOne";
import FormTwo from "@/components/FormTwo";
import FormThree from "@/components/FormThree";
import CustomButton from "@/components/CustomButton";

export default function Home() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(false);

  let componentToRender = null;

  const formOneOnChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  console.log("formData", formData);

  if (formStep === 0) {
    componentToRender = (
      <FormOne
        formData={formData}
        setFormData={setFormData}
        onChange={formOneOnChange}
      />
    );
  } else if (formStep === 1) {
    componentToRender = (
      <FormTwo formData={formData} setFormData={setFormData} />
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
          />
          <CustomButton
            type="button"
            btnText={"Next"}
            classes={""}
            disabled={formStep === 2}
            onClick={() => setFormStep((prev) => (prev += 1))}
          />
        </div>
      </div>
    </div>
  );
}
