import React, { useState } from "react";
import { ReactComponent as SaveFileSvg } from "graphics/SaveFileButton.svg";
import { ReactComponent as LoadFileSvg } from "graphics/LoadFileButton.svg";
import { ReactComponent as InsertRowSvg } from "graphics/InsertRowButton.svg";
import { ReactComponent as DeleteRowSvg } from "graphics/DeleteRowButton.svg";
import { ReactComponent as InsertColSvg } from "graphics/InsertColButton.svg";
import { ReactComponent as DeleteColSvg } from "graphics/DeleteColButton.svg";
import { ReactComponent as ClearRowSvg } from "graphics/ClearRowButton.svg";
import { ReactComponent as ClearColSvg } from "graphics/ClearColumnButton.svg";
import { ReactComponent as ClearCellSvg } from "graphics/ClearCellButton.svg";
import { ReactComponent as ThemeSvg } from "graphics/ThemeButtonButton.svg";
import { ReactComponent as ScreenReaderSvg } from "graphics/ScreenReaderButton.svg";

import { Spreadsheet } from "model/Spreadsheet";
import { ScreenReader } from "model/ScreenReader";

import { UserContext } from "contexts/UserPropsContext";
import { useContext } from "react";
import { KeyHelper } from "model/KeyHelper";

/**
 * OptionsPane React component
 * Handles displaying and handling of buttons for interacting with the spreadsheet
 */
export const OptionsPane: React.FC = () => {
  const { activeCell, fileName, theme, setTheme, screenReaderUIActive, setScreenReaderUIActive } = useContext(UserContext);

  // Singleton Design Pattern - access created instance
  const spreadsheet = Spreadsheet.getInstance();

  /**
   * Handler for the Screen Reader button
   */
  const toggleScreenReader = () => {
    setScreenReaderUIActive(!screenReaderUIActive);
    ScreenReader.getInstance().toggleScreenReader();
  };

  // State to handle button press animation
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  /**
   * Handler for button press animation
   * @param buttonId The id of the button that was pressed
   */
  const handleButtonClick = (buttonId: string) => {
    setPressedButton(buttonId);
  };

  // State to handle Theme dropdown
  const [themeDropdown, setThemeDropdown] = useState(false);
  /**
   * Handler for Theme dropdown
   * @returns Handler for Theme dropdown
   */
  const toggleThemeDropdown = () => setThemeDropdown(!themeDropdown);

  /**
   * Handler for changing themes
   * @param theme The theme to change to
   */
  const handleThemeChange = (theme: string) => {
    setTheme(theme);  // Update the global theme
    setThemeDropdown(false);  // Close the dropdown
  };

  return (
    <div className="bg-options-bg-color text-options-font-color stroke-2 font-google-sans min-w-full w-fit">

      {/* Function Cluster 1: Save/Load */}
      {/* Save Button */}
      <header className="flex justify-left gap-1 p-1.5">
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "save-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("save-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            spreadsheet.saveSpreadsheet(fileName)
            ScreenReader.getInstance().speak("Save");
          }}
        >
          <SaveFileSvg style={{ height: "4em", width: "4em" }} />
          Save
        </button>

        {/* Load Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "load-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("load-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            spreadsheet.loadSpreadsheet()
            ScreenReader.getInstance().speak("Load");
          }}
        >
          <LoadFileSvg style={{ height: "4em", width: "4em" }} />
          Load
        </button>

        {/* Divider between clusters */}
        <div className="flex h-auto p-2">
          <div className="bg-options-stroke-color w-0.5"></div>
        </div>

        {/* Function Cluster 2: Insert/Delete */}
        {/* Insert Row Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "insert-row-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("insert-row-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const activeCellIdx = KeyHelper.getIndexOfRowFromKey(activeCell);
            spreadsheet.addRow(activeCellIdx);
            ScreenReader.getInstance().speak("Insert Row");
          }}
        >
          <InsertRowSvg
            className="text-options-btn-icon-border-color fill-current"
            style={{
              height: "4em",
              width: "4em",
              transform: "translateX(-7%) translateY(5%)",
            }}
          />
          Insert Row
        </button>

        {/* Delete Row Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "delete-row-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("delete-row-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const activeCellIdx = KeyHelper.getIndexOfRowFromKey(activeCell);
            spreadsheet.removeRow(activeCellIdx);
            ScreenReader.getInstance().speak("Delete Row");
          }}
        >
          <DeleteRowSvg
            className="text-options-btn-icon-border-color fill-current"
            style={{
              height: "4em",
              width: "4em",
              transform: "translateX(-5%) translateY(5%)",
            }}
          />
          Delete Row
        </button>

        {/* Clear Row Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "clear-row-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("clear-row-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const activeCellIdx = KeyHelper.getIndexOfRowFromKey(activeCell);
            spreadsheet.clearRow(activeCellIdx);
            ScreenReader.getInstance().speak("Clear Row");
          }}
        >
          <ClearRowSvg
            className="text-options-btn-icon-border-color fill-current"
            style={{
              height: "4em",
              width: "4em",
              transform: "translateX(-7%) translateY(5%)",
            }}
          />
          Clear Row
        </button>

        {/* Insert Column Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "insert-col-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("insert-col-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const activeCellIdx = KeyHelper.getIndexOfColFromKey(activeCell);
            spreadsheet.addColumn(activeCellIdx);
            ScreenReader.getInstance().speak("Insert Column");
          }}
        >
          <InsertColSvg
            className="text-options-btn-icon-border-color fill-current"
            style={{
              height: "4em",
              width: "4em",
              // transform: "translateY(-13%)",
              transform: "translateY(-8%)",
            }}
          />
          Insert Column
        </button>

        {/* Delete Column Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "delete-col-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("delete-col-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const activeCellIdx = KeyHelper.getIndexOfColFromKey(activeCell);
            spreadsheet.removeColumn(activeCellIdx);
            ScreenReader.getInstance().speak("Delete Column");
          }}
        >
          <DeleteColSvg
            className="text-options-btn-icon-border-color fill-current"
            style={{
              height: "4em",
              width: "4em",
              transform: "translateY(-9%)",
            }}
          />
          Delete Column
        </button>

        {/* Clear Column Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "clear-col-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("clear-col-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            const activeCellIdx = KeyHelper.getIndexOfColFromKey(activeCell);
            spreadsheet.clearColumn(activeCellIdx);
            ScreenReader.getInstance().speak("Clear Column");
          }}
        >
          <ClearColSvg
            className="text-options-btn-icon-border-color fill-current"
            style={{
              height: "4em",
              width: "4em",
              transform: "translateY(-9%)",
            }}
          />
          Clear Column
        </button>

        {/* Clear Cell Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            pressedButton === "clear-cell-button"
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onMouseDown={() => handleButtonClick("clear-cell-button")}
          onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
          onClick={() => {
            spreadsheet.clearCell(activeCell);
            ScreenReader.getInstance().speak("Clear Cell");
          }}
        >
          <ClearCellSvg
            className="text-options-btn-icon-border-color fill-current"
            style={{
              height: "4em",
              width: "4em",
              transform: "translateX(-7%) translateY(5%)",
            }}
          />
          Clear Cell
        </button>

        <div className="flex h-auto p-2">
          <div className="bg-options-stroke-color w-0.5"></div>
        </div>

        {/* Function Cluster 4: Theme/Screen Reader */}
        {/* Theme Button */}
        <div className="relative inline-block text-left">
          <button
            className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
            ${
              pressedButton === "theme-button"
                ? "bg-options-btn-active-color shadow-lg"
                : "hover:bg-options-btn-hover-color"
            }`}
            onMouseDown={() => handleButtonClick("theme-button")}
            onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
            onClick={() => {
              toggleThemeDropdown();
              ScreenReader.getInstance().speak("Theme");
            }}
          >
            <ThemeSvg style={{ height: "4em", width: "4em" }} />
            Theme
          </button>
          {themeDropdown && (
          <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button onClick={() => {
                handleThemeChange('defaultTheme');
                ScreenReader.getInstance().speak("Light Mode");
            }} className={`block px-4 py-2 text-sm ${theme === 'defaultTheme' ? 'bg-gray-300' : 'hover:bg-gray-100'} text-gray-700 w-full text-left`}>Light Mode (Default)</button>
              <button onClick={() => {
                handleThemeChange('darkTheme');
                ScreenReader.getInstance().speak("Dark Mode");
                }} className={`block px-4 py-2 text-sm ${theme === 'darkTheme' ? 'bg-gray-300' : 'hover:bg-gray-100'} text-gray-700 w-full text-left`}>Dark Mode</button>
              <button onClick={() => {
                handleThemeChange('highContrastTheme');
                ScreenReader.getInstance().speak("High Contrast Mode");
            }} className={`block px-4 py-2 text-sm ${theme === 'highContrastTheme' ? 'bg-gray-300' : 'hover:bg-gray-100'} text-gray-700 w-full text-left`}>High Contrast Mode</button>
            </div>
          </div>
        )}
      </div>

        {/* Screen Reader Button */}
        <button
          className={`flex flex-col items-center justify-between focus:outline-none font-sans px-4 py-2 rounded transition duration-200 ease-in-out 
          ${
            screenReaderUIActive
              ? "bg-options-btn-active-color shadow-lg"
              : "hover:bg-options-btn-hover-color"
          }`}
          onClick={() => {
            toggleScreenReader();
            ScreenReader.getInstance().speak("Screen Reader Active");
          }}
        >
          <ScreenReaderSvg style={{ height: "4em", width: "4em" }} />
          Screen{"\n"}Reader
        </button>
        
      </header>
    </div>
  );
};

export default OptionsPane;
