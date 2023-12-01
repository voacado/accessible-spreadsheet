// TODO: tests

import React, { useState } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { CellGrid } from "components";
import { Spreadsheet } from 'model/Spreadsheet';
import { ScreenReader } from 'model/ScreenReader';


describe('CellGrid', () => {

  // Test: Component intializes properly
  it('renders the CellGrid component', () => {
    render(<CellGrid 
      activeCell="A1" 
      setActiveCell={() => {}} 
      activeEditCell="" 
      setActiveEditCell={() => {}} 
      editValue="" 
      setEditValue={() => {}} 
    />);
  
    expect(screen.getByText('A')).toBeInTheDocument(); // Check for column header
    expect(screen.getByText('1')).toBeInTheDocument(); // Check for row header
  });

  it('renders an input field when a cell is in editing mode', () => {

    const spreadsheetMock = Spreadsheet.getInstance();
    spreadsheetMock.setCellAtKeyGivenInput('A1', 'Test');
    spreadsheetMock.notifyObservers();

    // Mock the props
    const props = {
      activeCell: "A1",
      setActiveCell: jest.fn(),
      activeEditCell: "A1", // Set A1 as the active editing cell
      setActiveEditCell: jest.fn(),
      editValue: "Test",
      setEditValue: jest.fn(),
    };
  
    render(<CellGrid {...props} />);

    // Simulate a double click on cell A1 to enter editing mode
    const cellA1 = screen.getByDisplayValue("Test");
    fireEvent.doubleClick(cellA1);
    
    // Now, the input field should be present
    const inputFieldPost = screen.getByTestId("cell-A1");
    expect(inputFieldPost).toBeInTheDocument();
  });

  // it('handles single cell click', () => {
  //   const mockSetActiveCell = jest.fn();
  //   const spreadsheetMock = Spreadsheet.getInstance();
  //   spreadsheetMock.setCellAtKeyGivenInput('A1', '"Some Content"');
  //   spreadsheetMock.notifyObservers();
  //   console.log(spreadsheetMock.getCellAtKeyDisplay('A1'));

  //   // spreadsheetMock.getCellAtKeyDisplay.mockReturnValue('Some Content');
  
  //   const props = {
  //     activeCell: "",
  //     setActiveCell: mockSetActiveCell,
  //     activeEditCell: "",
  //     setActiveEditCell: jest.fn(),
  //     editValue: "",
  //     setEditValue: jest.fn(),
  //   };
  
  //   render(<CellGrid {...props} />);
  
  //   // Simulate single click on the cell
  //   const cell = screen.getByDisplayValue('"Some Content"');
  //   fireEvent.click(cell);
  
  //   // Verify setActiveCell is called with correct cell key
  //   expect(mockSetActiveCell).toHaveBeenCalledWith('A1');
  // });
  

  // // Handles cell click and double-click events
  // it('properly handles cell click and double-click events', async () => {
  //   const mockSetActiveCell = jest.fn();
  //   const mockSetActiveEditCell = jest.fn();
  //   const spreadsheetMock = Spreadsheet.getInstance();
  //   // spreadsheetMock.getCellAtKeyDisplay.mockReturnValue('Cell Value');

  //   spreadsheetMock.setCellAtKeyGivenInput('A1', 'Cell Value');
  //   spreadsheetMock.notifyObservers();

  //       // // Wrapper component to test state updates
  //       // const Wrapper = () => {
  //       //   const [fileNameMock, setFileNameMock] = useState("Test File");
  //       //   return (
  //       //     // Render FileHeader
  //       //     <FileHeader fileName={fileNameMock} setFileName={setFileNameMock} />
  //       //   );
  //       // };
  //       // render(<Wrapper />);

  //   const Wrapper = () => {
  //     const [activeCellMock, setActiveCellMock] = useState("A1");
  //     const [activeEditCellMock, setActiveEditCellMock] = useState("test");
  //     const [editValueMock, setEditValueMock] = useState<string | number>("test");
  
  //       return (<CellGrid 
  //         activeCell={activeCellMock} 
  //         setActiveCell={setActiveCellMock} 
  //         activeEditCell={activeEditCellMock}
  //         setActiveEditCell={setActiveEditCellMock} 
  //         editValue={editValueMock}
  //         setEditValue={setEditValueMock} 
  //       />);
  //   };

  //   render (<Wrapper />);
    
  //   // const cell = screen.getByAltText("Edit cell A1");
  //   // const cell = screen.getByTestId("cell-A1");
  //   await waitFor(() => {
  //     const cell = screen.getByTestId("cell-A1");
  //     expect(cell).toBeInTheDocument();
  //   });
  
  //   // Simulate click
  //   // fireEvent.click(cell);
  //   // expect(spreadsheetMock.getCellAtKeyDisplay(mockSetActiveCell)).toEqual('Cell Value');
  //   // expect(mockSetActiveCell).toHaveBeenCalledWith('A1');
  
  //   // // Simulate double-click
  //   // fireEvent.doubleClick(cell);
  //   // expect(mockSetActiveEditCell).toHaveBeenCalledWith('A1');
  // });
  
  
  });