import React, { useState } from 'react';
import './App.css';

// import { Spreadsheet } from "./model/Spreadsheet";
// import { ScreenReader } from './model/ScreenReader';

import {
  CellGrid,
  FileHeader,
  FormulaBar,
  OptionsPane,
  ScreenReaderLog
} from "./components";

function App() {

  // Instantiate Spreadsheet model (Singleton Design Pattern)
  // const spreadsheet = Spreadsheet.getInstance();
  // const screenReader = new ScreenReader();

  // User states: selected cell, cell being edited, and edit value
  const [activeCell, setActiveCell] = React.useState<string>("A1"); // Active cell
  const [activeEditCell, setActiveEditCell] = React.useState<string>(""); // Active cell being edited
  const [editValue, setEditValue] = React.useState<number|string>(""); // Value of the cell being edited
  const [fileName, setFileName] = useState<string>("Untitled Spreadsheet"); // Name of the file when saving and loading
  const [theme, setTheme] = useState<string>("defaultTheme"); // Theme of the app
  const [screenReaderUIActive, setScreenReaderUIActive] = useState<boolean>(false); // Whether screen reader is active

  return (
    <div className={`flex flex-col h-screen ${theme}`}>
        <div className="sticky top-0 z-10">
            <FileHeader fileName={fileName} setFileName={setFileName} />
            <OptionsPane activeCell={activeCell} setEditValue={setEditValue} fileName={fileName} setFileName={setFileName} theme={theme} setTheme={setTheme} screenReaderUIActive={screenReaderUIActive} setScreenReaderUIActive={setScreenReaderUIActive}/>
            <FormulaBar activeCell={activeCell} activeEditCell={activeEditCell} editValue={editValue} setEditValue={setEditValue} />
        </div>
        <div className="flex-grow overflow-auto">
            <CellGrid activeCell={activeCell} setActiveCell={setActiveCell} activeEditCell={activeEditCell} setActiveEditCell={setActiveEditCell} editValue={editValue} setEditValue={setEditValue} />
        </div>
        {screenReaderUIActive && <ScreenReaderLog />}
    </div>
  );
}

export default App;
