import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";

import { UserContext } from "contexts/UserPropsContext";
import IUserProps from "interfaces/IUserProps";

import { CellGrid } from "components";
import { Spreadsheet } from "model/Spreadsheet";

describe("CellGrid", () => {
  // Helper function to render components with UserContext
  const renderWithUserContext = (
    ui: React.ReactElement,
    { providerProps, ...renderOptions }: { providerProps: IUserProps, [key: string]: any }
  ) => {
    return render(
      <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
      renderOptions
    );
  };

  // Test: Component intializes properly
  it("renders the CellGrid component", () => {
    const providerProps: IUserProps = {
      activeCell: "A1",
      setActiveCell: () => {},
      activeEditCell: "",
      setActiveEditCell: () => {},
      editValue: "",
      setEditValue: () => {},
      fileName: "",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<CellGrid />, { providerProps });

    expect(screen.getByText("A")).toBeInTheDocument(); // Check for column header
    expect(screen.getByText("1")).toBeInTheDocument(); // Check for row header
  });

  // Test: Component properly reveals an input field on double click
  it("renders an input field when a cell is in editing mode", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    spreadsheetMock.setCellAtKeyGivenInput("A1", '"Test"');
    spreadsheetMock.notifyObservers();

    const providerProps: IUserProps = {
      activeCell: "A1",
      setActiveCell: jest.fn(),
      activeEditCell: "A1", // Set A1 as the active editing cell
      setActiveEditCell: jest.fn(),
      editValue: "Test",
      setEditValue: jest.fn(),
      fileName: "",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<CellGrid />, { providerProps });

    const cellA1 = screen.getByDisplayValue("Test");
    fireEvent.doubleClick(cellA1);

    const inputFieldPost = screen.getByTestId("cell-A1");
    expect(inputFieldPost).toBeInTheDocument();
  });

  // Test: Component properly sets active cell when single-clicking on a cell
  it("handles single cell click - cell A1", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    const setActiveCellMock = jest.fn();
    spreadsheetMock.setCellAtKeyGivenInput("A1", '"Test"');
    spreadsheetMock.notifyObservers();

    const providerProps: IUserProps = {
      activeCell: "A1",
      setActiveCell: setActiveCellMock,
      activeEditCell: "A1", // Set A1 as the active editing cell
      setActiveEditCell: jest.fn(),
      editValue: "Test",
      setEditValue: jest.fn(),
      fileName: "",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<CellGrid />, { providerProps });

    const cellA1 = screen.getByDisplayValue("Test");
    fireEvent.click(cellA1);

    expect(setActiveCellMock).toHaveBeenCalledWith("A1");
  });

  // Test: Component properly sets active cell when single-clicking on a cell (alternative cell)
  it("handles single cell click - cell A2", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    const setActiveCellMock = jest.fn();
    spreadsheetMock.setCellAtKeyGivenInput("A2", '"Test"');
    spreadsheetMock.notifyObservers();

    const providerProps: IUserProps = {
      activeCell: "A2",
      setActiveCell: setActiveCellMock,
      activeEditCell: "A2", // Set A2 as the active editing cell
      setActiveEditCell: jest.fn(),
      editValue: "Test",
      setEditValue: jest.fn(),
      fileName: "",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<CellGrid />, { providerProps });

    const cellA2 = screen.getByDisplayValue("Test");
    fireEvent.click(cellA2);

    expect(setActiveCellMock).toHaveBeenCalledWith("A2");
  });

  // Test: Component properly sets active edit cell when double-clicking on a cell
  it("handles double cell click", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    const setActiveCellMock = jest.fn();
    const setActiveEditCellMock = jest.fn();
    spreadsheetMock.setCellAtKeyGivenInput("A1", '"Test"');
    spreadsheetMock.notifyObservers();

    const providerProps: IUserProps = {
      activeCell: "A1",
      setActiveCell: setActiveCellMock,
      activeEditCell: "A1", // Set A1 as the active editing cell
      setActiveEditCell: setActiveEditCellMock,
      editValue: "Test",
      setEditValue: jest.fn(),
      fileName: "",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<CellGrid />, { providerProps });

    const cellA1 = screen.getByDisplayValue("Test");
    fireEvent.click(cellA1);
    expect(setActiveCellMock).toHaveBeenCalledWith("A1");

    fireEvent.doubleClick(cellA1);
    expect(setActiveEditCellMock).toHaveBeenCalledWith("A1");
  });
});
