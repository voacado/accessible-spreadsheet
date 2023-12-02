import React from "react";
import { ReactComponent as FxSvg } from "graphics/fxIcon.svg";
import { Spreadsheet } from "model/Spreadsheet";
import { ScreenReader } from "model/ScreenReader";

import { UserContext } from "contexts/UserPropsContext";
import { useContext } from "react";

/**
 * FormulaBar React component
 * Handles input of cell data externally from the cell grid
 */
export const FormulaBar: React.FC = () => {
  const { activeCell, activeEditCell, editValue, setEditValue } = useContext(UserContext);

  // Singleton Design Pattern - access created spreadsheet instance
  const spreadsheet = Spreadsheet.getInstance();

    // Handle editing cell value
    const handleEditCellValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(event.target.value);
  };

    // Handle sending edit value to Spreadsheet
    const handleSendEditValue = () => {
      spreadsheet.setCellAtKeyGivenInput(activeCell, editValue.toString());
      ScreenReader.getInstance().speak(spreadsheet.getCellAtKeyDisplay(activeEditCell).toString());
  };

    // Handle enter or escape key to exit edit mode on cell
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
        (event.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="bg-formula-bar-bg-color p-1.5 gap-2 flex items-center border-2 border-x-0 border-formula-bar-border-color">
      {/* "fx" button - onClick begins formula (appends "=") */}
      <button className="h-6 w-10 flex items-center justify-center">
        <FxSvg className="text-fx-button-color fill-current" style={{ height: "1.5em", width: "1.5em" }} />
      </button>

      {/* Divider between "fx" and input */}
      <div className="flex h-6 w-2.5">
        <div className="bg-options-stroke-color w-0.5"></div>
      </div>

      {/* Input box */}
      <input
        type="text"
        value={editValue}
        onChange={handleEditCellValue}
        onBlur={handleSendEditValue}
        onKeyDown={handleKeyDown}
        className="flex-grow bg-transparent outline-none text-formula-bar-font-color"
        placeholder="Enter formula or data..."
      />
    </div>
  );
};

export default FormulaBar;
