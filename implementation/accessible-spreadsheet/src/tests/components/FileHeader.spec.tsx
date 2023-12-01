import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { FileHeader } from "components";
import { ScreenReader } from "model/ScreenReader";

import { UserContext } from "contexts/UserPropsContext";
import IUserProps from "interfaces/IUserProps";

describe("FileHeader", () => {
  let screenReaderMock: ScreenReader;

  beforeEach(() => {
    // Create, clear, and toggle off screen reader if necessary
    screenReaderMock = ScreenReader.getInstance();
    screenReaderMock.clearSpeechLog();
    if (screenReaderMock.getScreenReaderStatus()) {
      screenReaderMock.toggleScreenReader();
    }
  });

  const renderWithUserContext = (
    ui: React.ReactElement,
    { providerProps, ...renderOptions }: { providerProps: IUserProps, [key: string]: any }
  ) => {
    return render(
      <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
      renderOptions
    );
  };

  // Test: Initial render uses display value from state (passed as prop)
  it("renders with initial file name", () => {
    const providerProps: IUserProps = {
      activeCell: "A1",
      setActiveCell: () => {},
      activeEditCell: "A1",
      setActiveEditCell: () => {},
      editValue: "",
      setEditValue: () => {},
      fileName: "Test File",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<FileHeader />, { providerProps });
    expect(screen.getByDisplayValue("Test File")).toBeInTheDocument();
  });

  // Test: When changing the text field, FileHeader should accept and call the setter function for the fileName prop
  it("calls setFileName when the file name is changed", () => {
    const mockSetFileName = jest.fn();
    const providerProps: IUserProps = {
      activeCell: "A1",
      setActiveCell: () => {},
      activeEditCell: "A1",
      setActiveEditCell: () => {},
      editValue: "",
      setEditValue: () => {},
      fileName: "Test File",
      setFileName: mockSetFileName,
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    renderWithUserContext(<FileHeader />, { providerProps });

    const input = screen.getByDisplayValue("Test File");
    fireEvent.change(input, { target: { value: "New File Name" } });

    expect(mockSetFileName).toHaveBeenCalledWith("New File Name");
  });

  // Test: When changing the text field, FileHeader should accept and store the new file name
  it("should modify fileName prop on value change", () => {
    const Wrapper: React.FC = () => {
      const [fileNameMock, setFileNameMock] = useState<string>("Test File");
      const providerProps: IUserProps = {
        activeCell: "A1",
        setActiveCell: () => {},
        activeEditCell: "A1",
        setActiveEditCell: () => {},
        editValue: "",
        setEditValue: () => {},
        fileName: fileNameMock,
        setFileName: setFileNameMock,
        theme: "",
        setTheme: () => {},
        screenReaderUIActive: false,
        setScreenReaderUIActive: () => {},
      };
  

      return (
        <UserContext.Provider value={providerProps}>
          <FileHeader />
        </UserContext.Provider>
      );
    };
    render(<Wrapper />);

    const input = screen.getByDisplayValue("Test File");
    fireEvent.change(input, { target: { value: "New File Name" } });
    fireEvent.blur(input);

    expect(screen.queryByDisplayValue("Test File")).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("New File Name")).toBeInTheDocument();
  });

  // Test: When changing the text field, FileHeader should accept and store the new file name
  it("calls ScreenReader speak method on input blur", () => {
    const providerProps: IUserProps = {
      activeCell: "A1",
      setActiveCell: () => {},
      activeEditCell: "A1",
      setActiveEditCell: () => {},
      editValue: "",
      setEditValue: () => {},
      fileName: "Test File",
      setFileName: () => {},
      theme: "",
      setTheme: () => {},
      screenReaderUIActive: false,
      setScreenReaderUIActive: () => {},
    };

    screenReaderMock = ScreenReader.getInstance();
    screenReaderMock.toggleScreenReader();

    renderWithUserContext(<FileHeader />, { providerProps });

    const input = screen.getByDisplayValue("Test File");
    fireEvent.blur(input);

    expect(screenReaderMock.getSpeechLog()).toContain("Test File");
  });

  // Test: When changing the text field, FileHeader should accept and store the new file name (multiple calls)
  it("calls ScreenReader speak method on input blur - multiple calls", () => {
    const Wrapper: React.FC = () => {
      const [fileNameMock, setFileNameMock] = useState<string>("Test File");
      const providerProps: IUserProps = {
        activeCell: "A1",
        setActiveCell: () => {},
        activeEditCell: "A1",
        setActiveEditCell: () => {},
        editValue: "",
        setEditValue: () => {},
        fileName: fileNameMock,
        setFileName: setFileNameMock,
        theme: "",
        setTheme: () => {},
        screenReaderUIActive: false,
        setScreenReaderUIActive: () => {},
      };

      return (
        <UserContext.Provider value={providerProps}>
          <FileHeader />
        </UserContext.Provider>
      );
    };

    screenReaderMock = ScreenReader.getInstance();
    screenReaderMock.toggleScreenReader();

    render(<Wrapper />);

    const input = screen.getByDisplayValue("Test File");
    fireEvent.blur(input);

    expect(screenReaderMock.getSpeechLog()).toEqual(["Test File"]);

    fireEvent.change(input, { target: { value: "New File Name" } });
    fireEvent.blur(input);

    expect(screenReaderMock.getSpeechLog()).toEqual(["Test File", "New File Name"]);
  });
});
