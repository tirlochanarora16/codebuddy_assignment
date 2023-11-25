import { useState } from "react";
import FormOne from "@/components/FormOne";
import FormTwo from "@/components/FormTwo";
import FormThree from "@/components/FormThree";

export default function Home() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({});

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
      <div className="bg-white w-1/2 p-4 rounded-md">{componentToRender}</div>
    </div>
  );
}
