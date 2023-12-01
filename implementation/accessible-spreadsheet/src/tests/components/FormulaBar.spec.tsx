import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { UserContext } from "contexts/UserPropsContext";
import IUserProps from "interfaces/IUserProps";

import { FormulaBar } from "components";
import { Spreadsheet } from "model/Spreadsheet";
import { ScreenReader } from "model/ScreenReader";

// Helper func to render components given UserContext
const renderWithUserContext = (
  ui: React.ReactElement,
  {
    providerProps,
    ...renderOptions
  }: { providerProps: IUserProps; [key: string]: any }
) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe("FormulaBar", () => {
  // Test: Component intializes properly
  it("Component renders properly without crashing", () => {
    const providerProps: IUserProps = {
      activeCell: "A1",
      setActiveCell: () => {},
      activeEditCell: "A1",
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

    renderWithUserContext(<FormulaBar />, { providerProps });
    expect(
      screen.getByPlaceholderText("Enter formula or data...")
    ).toBeInTheDocument();
  });

  // Test: Component properly sends edit value to React state (via "setEditValue")
  it("handles input change via react state", () => {
    const mockSetEditValue = jest.fn();
    const providerProps = {
      activeCell: "A1",
      setActiveCell: () => {},
      activeEditCell: "A1",
      setActiveEditCell: () => {},
      editValue: "",
      setEditValue: mockSetEditValue,
      fileName: "",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<FormulaBar />, { providerProps });

    const input = screen.getByPlaceholderText("Enter formula or data...");
    fireEvent.change(input, { target: { value: "123" } });

    expect(mockSetEditValue).toHaveBeenCalledWith("123");
  });

  // Test: Component properly sends edit value to Spreadsheet on blur
  it("sends edited value to Spreadsheet on blur", () => {
    const spreadsheetMock = Spreadsheet.getInstance();
    const providerProps = {
      activeCell: "A1",
      setActiveCell: () => {},
      activeEditCell: "A1",
      setActiveEditCell: () => {},
      editValue: "123",
      setEditValue: () => {},
      fileName: "",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<FormulaBar />, { providerProps });

    const input = screen.getByPlaceholderText("Enter formula or data...");
    fireEvent.blur(input);

    expect(spreadsheetMock.getCellAtKeyDisplay("A1")).toEqual("123");
  });

  // Test: Component properly sends edit value to ScreenReader on blur
  it("calls ScreenReader speak method on input blur", () => {
    const screenReaderMock = ScreenReader.getInstance();
    if (!screenReaderMock.getScreenReaderStatus()) {
      screenReaderMock.toggleScreenReader();
    }
    screenReaderMock.clearSpeechLog();

    const providerProps = {
      activeCell: "A1",
      setActiveCell: () => {},
      activeEditCell: "A1",
      setActiveEditCell: () => {},
      editValue: "123",
      setEditValue: () => {},
      fileName: "",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<FormulaBar />, { providerProps });

    const input = screen.getByPlaceholderText("Enter formula or data...");
    fireEvent.blur(input);

    expect(screenReaderMock.getSpeechLog()).toEqual(["123"]);
  });
});
