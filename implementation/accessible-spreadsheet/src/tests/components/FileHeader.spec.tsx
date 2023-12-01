import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { FileHeader } from "components";
import { ScreenReader } from "model/ScreenReader";

describe("FileHeader", () => {
  let screenReaderMock: ScreenReader;

  beforeEach(() => {
    // Create, clear, and toggle off screen reader if necessary (equivalent to resetting ScreenReader)
    const screenReaderMock = ScreenReader.getInstance();
    screenReaderMock.clearSpeechLog();
    if (screenReaderMock.getScreenReaderStatus()) {
      screenReaderMock.toggleScreenReader();
    }
  });

  // Test: Initial render uses display value from state (passed as prop)
  it("renders with initial file name", () => {
    render(<FileHeader fileName="Test File" setFileName={() => {}} />);
    expect(screen.getByDisplayValue("Test File")).toBeInTheDocument();
  });

  // Test: When changing the text field, FileHeader should accept and call the setter function for the fileName prop
  it("calls setFileName when the file name is changed", () => {
    const mockSetFileName = jest.fn();
    render(<FileHeader fileName="Test File" setFileName={mockSetFileName} />);

    const input = screen.getByDisplayValue("Test File");
    fireEvent.change(input, { target: { value: "New File Name" } });

    expect(mockSetFileName).toHaveBeenCalledWith("New File Name");
  });

  // Test: When changing the text field, FileHeader should accept and store the new file name
  it("should modify fileName prop on value change", () => {
    // Wrapper component to test state updates
    const Wrapper = () => {
      const [fileNameMock, setFileNameMock] = useState("Test File");
      return (
        // Render FileHeader
        <FileHeader fileName={fileNameMock} setFileName={setFileNameMock} />
      );
    };
    render(<Wrapper />);

    // Change file name
    const input = screen.getByDisplayValue("Test File");
    fireEvent.change(input, { target: { value: "New File Name" } });
    fireEvent.blur(input); // deselect input field

    expect(screen.queryByDisplayValue("Test File")).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("New File Name")).toBeInTheDocument();
  });

  it("calls ScreenReader speak method on input blur", () => {
    // Toggle screen reader on
    screenReaderMock = ScreenReader.getInstance();
    screenReaderMock.toggleScreenReader();

    // Before render, speak() is not called
    expect(screenReaderMock.getSpeechLog()).not.toContain("Test File");

    // Render FileHeader
    render(<FileHeader fileName="Test File" setFileName={() => {}} />);

    // Find and de-select text field
    const input = screen.getByDisplayValue("Test File");
    fireEvent.blur(input); // deselect input field

    // Screen Reader now contains file name
    expect(screenReaderMock.getSpeechLog()).toContain("Test File");
  });

  it("calls ScreenReader speak method on input blur - multiple calls", () => {
    // Toggle screen reader on
    screenReaderMock = ScreenReader.getInstance();
    screenReaderMock.toggleScreenReader();

    // Before render, speak() is not called
    expect(screenReaderMock.getSpeechLog()).toEqual([]);

    // Wrapper component to test state updates
    const Wrapper = () => {
      const [fileNameMock, setFileNameMock] = useState("Test File");
      return (
        // Render FileHeader
        <FileHeader fileName={fileNameMock} setFileName={setFileNameMock} />
      );
    };
    render(<Wrapper />);

    // Find and de-select text field
    const input = screen.getByDisplayValue("Test File");
    fireEvent.blur(input); // deselect input field

    // Screen Reader log now contains file name
    expect(screenReaderMock.getSpeechLog()).toEqual(["Test File"]);

    // Change file name
    fireEvent.change(input, { target: { value: "New File Name" } });
    fireEvent.blur(input); // deselect input field

    // Screen Reader log now contains new file name
    expect(screenReaderMock.getSpeechLog()).toEqual([
      "Test File",
      "New File Name",
    ]);
  });
});
