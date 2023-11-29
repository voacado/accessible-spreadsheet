import React from "react";
import { ReactComponent as SaveFileSvg } from "../../graphics/SaveFileButton.svg";
import { ReactComponent as LoadFileSvg } from "../../graphics/LoadFileButton.svg";
import { ReactComponent as FormulaSvg } from "../../graphics/FormulaButton.svg";
import { ReactComponent as InsertRowSvg } from "../../graphics/InsertRowButton.svg";
import { ReactComponent as DeleteRowSvg } from "../../graphics/DeleteRowButton.svg";
import { ReactComponent as InsertColSvg } from "../../graphics/InsertColButton.svg";
import { ReactComponent as DeleteColSvg } from "../../graphics/DeleteColButton.svg";
import { ReactComponent as ClearRowSvg } from "../../graphics/ClearRowButton.svg";
import { ReactComponent as ClearColSvg } from "../../graphics/ClearColumnButton.svg";
import { ReactComponent as ThemeSvg } from "../../graphics/ThemeButtonButton.svg";
import { ReactComponent as ScreenReaderSvg } from "../../graphics/ScreenReaderButton.svg";

import { Spreadsheet } from "../../model/Spreadsheet";

// TODO: move this interface to separate file
interface UserProps {
  activeCell: string;
  setActiveCell?: (cell: string) => void;
  activeEditCell?: string;
  setActiveEditCell?: (cell: string) => void;
  editValue?: string | number;
  setEditValue: (value: string | number) => void;
  fileName: string;
  setFileName: (name: string) => void;
}

export const OptionsPane: React.FC<UserProps> = ({activeCell, setEditValue, fileName, setFileName}) => {

    // Singleton Design Pattern - access created instance
    const spreadsheet = Spreadsheet.getInstance();

  // States to handle Formula and Screen Reader buttons
  const [formulaActive, setFormulaActive] = React.useState(false);
  const [screenReaderActive, setScreenReaderActive] = React.useState(false);
  // Handler for the Formula button
  const toggleFormula = () => {
    setFormulaActive(!formulaActive);
  };
  // Handler for the Screen Reader button
  const toggleScreenReader = () => {
    setScreenReaderActive(!screenReaderActive);
  };

  // State to handle button press animation
  const [pressedButton, setPressedButton] = React.useState<string | null>(null);
  const handleButtonClick = (buttonId: string) => {
    setPressedButton(buttonId);
  };

  return (
    <div className="bg-options-light text-black stroke-2 font-google-sans min-w-full w-fit">

      {/* Function Cluster 1: Save/Load */}
      <header className="flex justify-left gap-1 p-1.5">
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "save-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("save-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => spreadsheet.saveSpreadsheet(fileName)}
        >
          <SaveFileSvg style={{ height: "4em", width: "4em" }} />
          Save
        </button>

        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "load-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("load-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => spreadsheet.loadSpreadsheet()}
        >
          <LoadFileSvg style={{ height: "4em", width: "4em" }} />
          Load
        </button>

        {/* Divider between clusters */}
        <div className="flex h-auto p-2">
          <div className="bg-options-stroke-light w-0.5"></div>
        </div>

        {/* Function Cluster 2: Formula */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            formulaActive
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onClick={() => {
            toggleFormula();
            setEditValue("=");
          }}
        >
          <FormulaSvg style={{ height: "4em", width: "4em" }} />
          Formula
        </button>

        <div className="flex h-auto p-2">
          <div className="bg-options-stroke-light w-0.5"></div>
        </div>

        {/* Function Cluster 3: Insert/Delete */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "insert-row-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("insert-row-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const curPos = spreadsheet.getRowAndColFromKey(activeCell);
            const activeCellIdx = spreadsheet.getIndexFromRowAndCol(curPos[0], curPos[1]);
            spreadsheet.addRow(activeCellIdx[0]);
          }}
        >
          <InsertRowSvg
            style={{
              height: "4em",
              width: "4em",
              transform: "translateX(-7%) translateY(5%)",
            }}
          />
          Insert Row
        </button>

        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "delete-row-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("delete-row-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const curPos = spreadsheet.getRowAndColFromKey(activeCell);
            const activeCellIdx = spreadsheet.getIndexFromRowAndCol(curPos[0], curPos[1]);
            spreadsheet.removeRow(activeCellIdx[0]);
          }}
        >
          <DeleteRowSvg
            style={{
              height: "4em",
              width: "4em",
              transform: "translateX(-5%) translateY(5%)",
            }}
          />
          Delete Row
        </button>

        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "clear-row-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("clear-row-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const curPos = spreadsheet.getRowAndColFromKey(activeCell);
            const activeCellIdx = spreadsheet.getIndexFromRowAndCol(curPos[0], curPos[1]);
            spreadsheet.clearRow(activeCellIdx[0]);
          }}
        >
          <ClearRowSvg
            style={{
              height: "4em",
              width: "4em",
              transform: "translateX(-7%) translateY(5%)",
            }}
          />
          Clear Row
        </button>

        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "insert-col-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("insert-col-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const curPos = spreadsheet.getRowAndColFromKey(activeCell);
            const activeCellIdx = spreadsheet.getIndexFromRowAndCol(curPos[0], curPos[1]);
            spreadsheet.addColumn(activeCellIdx[1]);
          }}
        >
          <InsertColSvg
            style={{
              height: "4em",
              width: "4em",
              // transform: "translateY(-13%)",
              transform: "translateY(-8%)",
            }}
          />
          Insert Column
        </button>

        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "delete-col-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("delete-col-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const curPos = spreadsheet.getRowAndColFromKey(activeCell);
            const activeCellIdx = spreadsheet.getIndexFromRowAndCol(curPos[0], curPos[1]);
            spreadsheet.removeColumn(activeCellIdx[1]);
          }}
        >
          <DeleteColSvg
            style={{
              height: "4em",
              width: "4em",
              transform: "translateY(-9%)",
            }}
          />
          Delete Column
        </button>

        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "clear-col-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("clear-col-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const curPos = spreadsheet.getRowAndColFromKey(activeCell);
            const activeCellIdx = spreadsheet.getIndexFromRowAndCol(curPos[0], curPos[1]);
            spreadsheet.clearColumn(activeCellIdx[1]);
          }}
        >
          <ClearColSvg
            style={{
              height: "4em",
              width: "4em",
              transform: "translateY(-9%)",
            }}
          />
          Clear Column
        </button>

        <div className="flex h-auto p-2">
          <div className="bg-options-stroke-light w-0.5"></div>
        </div>

        {/* Function Cluster 4: Theme/Screen Reader */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "theme-button"
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onMouseDown={() => handleButtonClick("theme-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
        >
          <ThemeSvg style={{ height: "4em", width: "4em" }} />
          Theme
        </button>

        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            screenReaderActive
              ? "bg-options-active-light shadow-lg"
              : "hover:bg-gray-200"
          }`}
          onClick={toggleScreenReader}
        >
          <ScreenReaderSvg style={{ height: "4em", width: "4em" }} />
          Screen{"\n"}Reader
        </button>
        
      </header>
    </div>
  );
};

export default OptionsPane;
