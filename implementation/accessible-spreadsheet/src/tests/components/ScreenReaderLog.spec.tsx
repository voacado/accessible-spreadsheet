import { render, screen, act } from "@testing-library/react";

import { ScreenReaderLog } from "components";
import { ScreenReader } from "model/ScreenReader";

describe("ScreenReaderLog", () => {
  // Test: Component renders properly without crashing
  it("init render without crashing and with no initial messages", () => {
    render(<ScreenReaderLog />);
    expect(screen.getByAltText("Clippy")).toBeInTheDocument();
    expect(screen.queryAllByText(/.+/)).toHaveLength(0); // No messages initially
  });

  // Test: Component updates when new messages are added to the ScreenReader log (observer pattern)
  it("updates when new messages are added to the ScreenReader log", async () => {
    // Init ScreenReader
    const screenReaderMock = ScreenReader.getInstance();
    screenReaderMock.clearSpeechLog();
    if (!screenReaderMock.getScreenReaderStatus()) {
      screenReaderMock.toggleScreenReader();
    }

    // Render the ScreenReaderLog
    render(<ScreenReaderLog />);
    // No messages initially
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);

    // Wait for speak() to complete
    await act(async () => {
      screenReaderMock.speak("New Message");
    });

    // Component contains new message
    expect(screen.getByText("New Message")).toBeInTheDocument();
  });

  // Edge Case Test: Component does not add new message when speak() message is invalid
  it("does not update when invalid message", async () => {
    // Init ScreenReader
    const screenReaderMock = ScreenReader.getInstance();
    screenReaderMock.clearSpeechLog();
    if (!screenReaderMock.getScreenReaderStatus()) {
      screenReaderMock.toggleScreenReader();
    }

    // Render the ScreenReaderLog
    render(<ScreenReaderLog />);
    // No messages initially
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);

    // Wait for speak() to complete - null message
    await act(async () => {
      screenReaderMock.speak(null as unknown as string);
    });
    // Still no new messages
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);

    // Wait for speak() to complete - undefined message
    await act(async () => {
      screenReaderMock.speak(undefined as unknown as string);
    });
    // Still no new messages
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);

    // Wait for speak() to complete - empty string message
    await act(async () => {
      screenReaderMock.speak("");
    });
    // Still no new messages
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);

    // Wait for speak() to complete - single quotation string message
    await act(async () => {
      screenReaderMock.speak("''");
    });
    // Still no new messages
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);

    // Wait for speak() to complete - double quotation string message
    await act(async () => {
      screenReaderMock.speak('""');
    });
    // Still no new messages
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);

    // Wait for speak() to complete - legitimate message
    await act(async () => {
      screenReaderMock.speak("New Message");
    });
    // Component contains new message
    expect(screen.getByText("New Message")).toBeInTheDocument();
  });
});
