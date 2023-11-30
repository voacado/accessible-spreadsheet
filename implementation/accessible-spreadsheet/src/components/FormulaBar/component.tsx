// TODO: connect to model, implement functionality

import React from "react";
import { ReactComponent as FxSvg } from "graphics/fxIcon.svg";
import { Spreadsheet } from "model/Spreadsheet";
import { ScreenReader } from "model/ScreenReader";

// TODO: move this interface to separate file
interface UserProps {
  activeCell?: string;
  setActiveCell?: (cell: string) => void;
  activeEditCell: string;
  setActiveEditCell?: (cell: string) => void;
  editValue: string | number;
  setEditValue: (value: string | number) => void;
  fileName?: string;
  setFileName?: (name: string) => void;
  theme?: string;
  setTheme?: (theme: string) => void;
}

export const FormulaBar: React.FC<UserProps> = ({activeEditCell, editValue, setEditValue}) => {

  // Singleton Design Pattern - access created spreadsheet instance
  const spreadsheet = Spreadsheet.getInstance();

    // TODO: duplicate funcs b/t here and CellGrid
    // Handle editing cell value
    const handleEditCellValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(event.target.value);
      // console.log(editValue)
      // spreadsheet.setCellAtKeyGivenInput(activeEditCell, editValue.toString());
  };

    // Handle sending edit value to Spreadsheet
    const handleSendEditValue = () => {
      // TODO: editValue shouldn't just be a string or something
      spreadsheet.setCellAtKeyGivenInput(activeEditCell, editValue.toString());
      console.log(spreadsheet.getCellAtKeyValue(activeEditCell));
      ScreenReader.getInstance().speak(spreadsheet.getCellAtKeyValue(activeEditCell).toString());
      // setActiveEditCell(""); // TODO: check if this works here
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
        // onChange={handleChange}
        onBlur={handleSendEditValue}
        // onBlur={handleSendEditValue}
        className="flex-grow bg-transparent outline-none text-formula-bar-font-color"
        placeholder="Enter formula or data..."
      />
    </div>
  );
};

export default FormulaBar;
