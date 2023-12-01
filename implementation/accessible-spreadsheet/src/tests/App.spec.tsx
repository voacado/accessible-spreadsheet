import { render, screen, fireEvent } from "@testing-library/react";
import App from "App";

describe("App", () => {
  // Test: App should render
  it("renders App without crashing", () => {
    render(<App />);
  });

  // Test: App should render with valid components/elements
  it("renders App correctly - file header visible", () => {
    render(<App />);

    // File Header - appears
    expect(
      screen.getByDisplayValue("Untitled Spreadsheet")
    ).toBeInTheDocument();
  });

  it("renders App correctly - options pane visible", () => {
    render(<App />);

    // Options Pane - Buttons visible
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Load")).toBeInTheDocument();
    expect(screen.getByText("Insert Row")).toBeInTheDocument();
    expect(screen.getByText("Delete Row")).toBeInTheDocument();
    expect(screen.getByText("Clear Row")).toBeInTheDocument();
    expect(screen.getByText("Insert Column")).toBeInTheDocument();
    expect(screen.getByText("Delete Column")).toBeInTheDocument();
    expect(screen.getByText("Clear Column")).toBeInTheDocument();
    expect(screen.getByText("Theme")).toBeInTheDocument();
    expect(screen.getByText("Screen Reader")).toBeInTheDocument();
  });

  it("renders App correctly - formula bar visible", () => {
    render(<App />);

    // Formula bar - appears
    expect(
      screen.getByPlaceholderText("Enter formula or data...")
    ).toBeInTheDocument();
  });

  it("renders App correctly - cell grid visible", () => {
    render(<App />);

    // CellGrid - appears
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders App correctly - buttons exist", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Load/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Insert Row/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Delete Row/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Clear Row/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Insert Column/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Delete Column/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Clear Column/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Theme/i })).toBeInTheDocument();
  });

  // Test: App should respond to a button press - screen reader
  it("Screen Reader button toggles Screen Reader UI", () => {
    render(<App />);

    // Before press (not visible)
    const notFoundText = screen.queryByText("Screen Reader Active");
    expect(notFoundText).toBeNull();

    // Press button (visible)
    fireEvent.click(screen.getByText("Screen Reader"));

    // After button press (visible)
    expect(screen.getByText("Screen Reader Active")).toBeInTheDocument();

    // Press button again (not visible)
    fireEvent.click(screen.getByText("Screen Reader"));

    // Component no longer visible
    expect(notFoundText).toBeNull();
  });
});
