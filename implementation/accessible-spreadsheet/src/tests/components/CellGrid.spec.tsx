import { render, fireEvent, screen } from "@testing-library/react";

import { CellGrid } from "components";
import { Spreadsheet } from "model/Spreadsheet";

describe("CellGrid", () => {
  // Test: Component intializes properly
  it("renders the CellGrid component", () => {
    render(
      <CellGrid
        activeCell="A1"
        setActiveCell={() => {}}
        activeEditCell=""
        setActiveEditCell={() => {}}
        editValue=""
        setEditValue={() => {}}
      />
    );

    expect(screen.getByText("A")).toBeInTheDocument(); // Check for column header
    expect(screen.getByText("1")).toBeInTheDocument(); // Check for row header
  });

  // Test: Component properly reveals an input field on double click
  it("renders an input field when a cell is in editing mode", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    spreadsheetMock.setCellAtKeyGivenInput("A1", '"Test"');
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

  // Test: Component properly sets active cell when single-clicking on a cell
  it("handles single cell click - cell A1", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    const setActiveCellMock = jest.fn();
    spreadsheetMock.setCellAtKeyGivenInput("A1", '"Test"');
    spreadsheetMock.notifyObservers();

    // Mock the props
    const props = {
      activeCell: "A1",
      setActiveCell: setActiveCellMock,
      activeEditCell: "A1", // Set A1 as the active editing cell
      setActiveEditCell: jest.fn(),
      editValue: "Test",
      setEditValue: jest.fn(),
    };

    render(<CellGrid {...props} />);

    // Simulate a single click on cell A1 - sets A1 as active cell
    const cellA1 = screen.getByDisplayValue("Test");
    fireEvent.click(cellA1);

    expect(setActiveCellMock).toHaveBeenCalledWith("A1");
  });

  it("handles single cell click - cell A2", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    const setActiveCellMock = jest.fn();
    spreadsheetMock.setCellAtKeyGivenInput("A2", '"Test"');
    spreadsheetMock.notifyObservers();

    // Mock the props
    const props = {
      activeCell: "A2",
      setActiveCell: setActiveCellMock,
      activeEditCell: "A2", // Set A1 as the active editing cell
      setActiveEditCell: jest.fn(),
      editValue: "Test",
      setEditValue: jest.fn(),
    };

    render(<CellGrid {...props} />);

    // Simulate a single click on cell A1 - sets A1 as active cell
    const cellA1 = screen.getByDisplayValue("Test");
    fireEvent.click(cellA1);

    expect(setActiveCellMock).toHaveBeenCalledWith("A2");
  });

  // Test: Component properly sets active edit cell when double-clicking on a cell
  it("handles double cell click", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    const setActiveCellMock = jest.fn();
    const setActiveEditCellMock = jest.fn();
    spreadsheetMock.setCellAtKeyGivenInput("A1", '"Test"');
    spreadsheetMock.notifyObservers();

    // Mock the props
    const props = {
      activeCell: "A1",
      setActiveCell: setActiveCellMock,
      activeEditCell: "A1", // Set A1 as the active editing cell
      setActiveEditCell: setActiveEditCellMock,
      editValue: "Test",
      setEditValue: jest.fn(),
    };

    render(<CellGrid {...props} />);

    // Simulate a single click on cell A1 - sets A1 as active cell
    const cellA1 = screen.getByDisplayValue("Test");
    fireEvent.click(cellA1);
    expect(setActiveCellMock).toHaveBeenCalledWith("A1");

    // Simulate a double click on cell A1 - sets A1 as active edit cell
    fireEvent.doubleClick(cellA1);
    expect(setActiveEditCellMock).toHaveBeenCalledWith("A1");
  });
});
