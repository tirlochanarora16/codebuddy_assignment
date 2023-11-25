import { useState } from "react";
import FormOne from "@/components/FormOne";
import FormTwo from "@/components/FormTwo";
import FormThree from "@/components/FormThree";

export default function Home() {
  const [formStep, setFormStep] = useState(0);

  let componentToRender = null;

  if (formStep === 0) {
    componentToRender = <FormOne />;
  } else if (formStep === 1) {
    componentToRender = <FormTwo />;
  } else {
    componentToRender = <FormThree />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-1/2 p-4 rounded-md">{componentToRender}</div>
    </div>
  );
}
