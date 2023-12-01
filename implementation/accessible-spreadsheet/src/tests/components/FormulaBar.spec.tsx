import { render, fireEvent, screen } from "@testing-library/react";

import { FormulaBar } from "components";
import { Spreadsheet } from "model/Spreadsheet";
import { ScreenReader } from "model/ScreenReader";

describe("FormulaBar", () => {
  // Test: Component intializes properly
  it("Component renders properly without crashing", () => {
    render(
      <FormulaBar
        activeCell="A1"
        activeEditCell="A1"
        editValue=""
        setEditValue={() => {}}
      />
    );
    expect(
      screen.getByPlaceholderText("Enter formula or data...")
    ).toBeInTheDocument();
  });

  // Test: Component properly sends edit value to React state (via "setEditValue")
  it("handles input change via react state", () => {
    const mockSetEditValue = jest.fn();
    render(
      <FormulaBar
        activeCell="A1"
        activeEditCell="A1"
        editValue=""
        setEditValue={mockSetEditValue}
      />
    );

    const input = screen.getByPlaceholderText("Enter formula or data...");
    fireEvent.change(input, { target: { value: "123" } });

    expect(mockSetEditValue).toHaveBeenCalledWith("123");
  });

  // Test: Component properly sends edit value to Spreadsheet on blur
  it("sends edited value to Spreadsheet on blur", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    render(
      <FormulaBar
        activeCell="A1"
        activeEditCell="A1"
        editValue="123"
        setEditValue={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("Enter formula or data...");
    fireEvent.blur(input);

    expect(spreadsheetMock.getCellAtKeyDisplay("A1")).toEqual("123");
  });

  // Test: Component properly sends edit value to ScreenReader on blur
  it("calls ScreenReader speak method on input blur", () => {
    // Instantiate ScreenReader
    const screenReaderMock = ScreenReader.getInstance();
    if (!screenReaderMock.getScreenReaderStatus()) {
      screenReaderMock.toggleScreenReader();
    }
    screenReaderMock.clearSpeechLog();

    // Render FormulaBar and change value to editValue
    render(
      <FormulaBar
        activeCell="A1"
        activeEditCell="A1"
        editValue="123"
        setEditValue={() => {}}
      />
    );
    const input = screen.getByPlaceholderText("Enter formula or data...");
    fireEvent.blur(input);

    expect(screenReaderMock.getSpeechLog()).toEqual(["123"]);
  });
});
