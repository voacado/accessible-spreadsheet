// TODO: connect to model, implement functionality

import React from "react";
import { ReactComponent as FxSvg } from "../../graphics/fxIcon.svg";

export const FormulaBar = () => {
  // Handle state of formula bar
  const [formula, setFormula] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
  };

  return (
    <div className="bg-options-light border-options-stroke-light p-1.5 gap-2 flex items-center border-2 border-x-0">
      {/* "fx" button - onClick begins formula (appends "=") */}
      <button className="h-6 w-10 flex items-center justify-center">
        <FxSvg style={{ height: "1.5em", width: "1.5em" }} />
      </button>

      {/* Divider between "fx" and input */}
      <div className="flex h-6 w-2.5">
        <div className="bg-options-stroke-light w-0.5"></div>
      </div>

      {/* Input box */}
      <input
        type="text"
        value={formula}
        onChange={handleChange}
        className="flex-grow bg-transparent outline-none text-gray-700"
        placeholder="Enter formula or data..."
      />
    </div>
  );
};

export default FormulaBar;
