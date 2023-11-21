import React from 'react';
import './App.css';

import {
  CellGrid,
  FileHeader,
  FormulaBar,
  OptionsPane
} from "./components";

function App() {
  return (
    <div>
      <FileHeader/>
      <OptionsPane/>
      <FormulaBar/>
      <CellGrid/>
    </div>
  );
}

export default App;
