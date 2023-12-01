import { render, fireEvent, screen } from "@testing-library/react";

import { OptionsPane } from "components";
import { Spreadsheet } from "model/Spreadsheet";
import { ScreenReader } from "model/ScreenReader";

// Define the types for the mocked methods
type SpreadsheetMock = {
  saveSpreadsheet: jest.Mock;
  loadSpreadsheet: jest.Mock;
  addRow: jest.Mock;
  removeRow: jest.Mock;
  clearRow: jest.Mock;
  addColumn: jest.Mock;
  removeColumn: jest.Mock;
  clearColumn: jest.Mock;
};

type ScreenReaderMock = {
  speak: jest.Mock;
  toggleScreenReader: jest.Mock;
};

const props = {
  activeCell: "A1",
  setActiveCell: jest.fn(),
  activeEditCell: "",
  setActiveEditCell: jest.fn(),
  editValue: "",
  setEditValue: jest.fn(),
  fileName: "Untitled Spreadsheet",
  setFileName: jest.fn(),
  theme: "defaultTheme",
  setTheme: jest.fn(),
  screenReaderUIActive: false,
  setScreenReaderUIActive: jest.fn(),
};

describe("OptionsPane", () => {
  let spreadsheetMock: SpreadsheetMock;
  let screenReaderMock: ScreenReaderMock;

  beforeEach(() => {
    // Initialize mocks
    spreadsheetMock = {
      saveSpreadsheet: jest.fn(),
      loadSpreadsheet: jest.fn(),
      addRow: jest.fn(),
      removeRow: jest.fn(),
      clearRow: jest.fn(),
      addColumn: jest.fn(),
      removeColumn: jest.fn(),
      clearColumn: jest.fn(),
    };

    screenReaderMock = {
      speak: jest.fn(),
      toggleScreenReader: jest.fn(),
    };

    jest
      .spyOn(Spreadsheet, "getInstance")
      .mockReturnValue(spreadsheetMock as any);
    jest
      .spyOn(ScreenReader, "getInstance")
      .mockReturnValue(screenReaderMock as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test: Save Button calls saveSpreadsheet
  it("calls saveSpreadsheet on save button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Save"));
    expect(spreadsheetMock.saveSpreadsheet).toHaveBeenCalled();
  });

  // Test: Load Button calls loadSpreadsheet
  it("calls loadSpreadsheet on load button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Load"));
    expect(spreadsheetMock.loadSpreadsheet).toHaveBeenCalled();
  });

  // Test: Insert Row Button calls addRow
  it("calls addRow on insert row button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Insert Row"));
    expect(spreadsheetMock.addRow).toHaveBeenCalled();
  });

  // Test: Delete Row Button calls removeRow
  it("calls removeRow on delete row button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Delete Row"));
    expect(spreadsheetMock.removeRow).toHaveBeenCalled();
  });

  // Test: Clear Row Button calls clearRow
  it("calls clearRow on clear row button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Clear Row"));
    expect(spreadsheetMock.clearRow).toHaveBeenCalled();
  });

  // Test: Insert Column Button calls addColumn
  it("calls addColumn on insert column button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Insert Column"));
    expect(spreadsheetMock.addColumn).toHaveBeenCalled();
  });

  // Test: Delete Column Button calls removeColumn
  it("calls removeColumn on delete column button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Delete Column"));
    expect(spreadsheetMock.removeColumn).toHaveBeenCalled();
  });

  // Test: Clear Column Button calls clearColumn
  it("calls clearColumn on clear column button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Clear Column"));
    expect(spreadsheetMock.clearColumn).toHaveBeenCalled();
  });

  // Test: Theme Button calls setTheme
  it("calls setTheme on theme button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Theme"));
    expect(screenReaderMock.speak).toHaveBeenCalled();
  });

  // Test: Screen Reader Button calls toggleScreenReader
  it("calls toggleScreenReader on screen reader button click", () => {
    render(<OptionsPane />);

    fireEvent.click(screen.getByText("Screen Reader"));
    expect(screenReaderMock.toggleScreenReader).toHaveBeenCalled();
  });
});
