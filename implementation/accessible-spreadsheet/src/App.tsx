import React, { useState } from 'react';
import { UserContext } from 'contexts/UserPropsContext';
import IUserProps from "interfaces/IUserProps";
import './App.css';

import {
  CellGrid,
  FileHeader,
  FormulaBar,
  OptionsPane,
  ScreenReaderLog
} from "./components";

function App() {

  // User states: selected cell, cell being edited, and edit value
  const [activeCell, setActiveCell] = React.useState<string>("A1"); // Active cell
  const [activeEditCell, setActiveEditCell] = React.useState<string>(""); // Active cell being edited
  const [editValue, setEditValue] = React.useState<number|string>(""); // Value of the cell being edited
  const [fileName, setFileName] = useState<string>("Untitled Spreadsheet"); // Name of the file when saving and loading
  const [theme, setTheme] = useState<string>("defaultTheme"); // Theme of the app
  const [screenReaderUIActive, setScreenReaderUIActive] = useState<boolean>(false); // Whether screen reader is active

  const userProps: IUserProps = {
    activeCell,
    setActiveCell,
    activeEditCell,
    setActiveEditCell,
    editValue,
    setEditValue,
    fileName,
    setFileName,
    theme,
    setTheme,
    screenReaderUIActive,
    setScreenReaderUIActive
  };

  return (
    <UserContext.Provider value={userProps}>
      <div className={`flex flex-col h-screen ${theme}`}>
          <div className="sticky top-0 z-10">
              <FileHeader />
              <OptionsPane />
              <FormulaBar />
          </div>
          <div className="flex-grow overflow-auto">
              <CellGrid />
          </div>
          {screenReaderUIActive && <ScreenReaderLog />}
      </div>
    </UserContext.Provider>
  );
}

export default App;
