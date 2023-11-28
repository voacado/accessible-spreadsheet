import React, { useState } from 'react';
import './App.css';

import { Spreadsheet } from "./model/Spreadsheet";

import {
  CellGrid,
  FileHeader,
  FormulaBar,
  OptionsPane,
  ThemeModal,
  ScreenReader
} from "./components";

function App() {

  // Instantiate Spreadsheet model
  const spreadsheet = Spreadsheet.getInstance();

  // const [openSavePopUp, setOpenSavePopUp] = useState(false);
  // const HandleRemoveSavePopUp = () => setOpenSavePopUp(true);

  return (
    <div>
      <div className='sticky top-0'>
        <FileHeader/>
        <OptionsPane/>
        <FormulaBar/>
      </div>
      <CellGrid/>
    </div>
  );
}

export default App;
