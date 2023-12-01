import { ScreenReader } from "model/ScreenReader";

describe("ScreenReader", () => {
  // Global instantiation of screenReader for test cases
  // Mock instantiated in setupTests.ts
  let screenReader: ScreenReader;

  beforeEach(() => {
    // Before each test, clear the speech log and reset screen reader status to false (by default)
    screenReader = ScreenReader.getInstance();
    screenReader.clearSpeechLog();
    if (screenReader.getScreenReaderStatus()) {
      screenReader.toggleScreenReader();
    }
  });

  // Test: ScreenReader is a Singleton class
  it("Singleton - should always return the same instance", () => {
    const instance1 = ScreenReader.getInstance();
    const instance2 = ScreenReader.getInstance();

    expect(instance1).toBe(instance2);
  });

  // Test: Basic functionality, speak() should add message to speech log
  it("Basic Functionality - Test speak()", () => {
    screenReader = ScreenReader.getInstance();
    screenReader.toggleScreenReader();

    const message: string = "Test message";
    screenReader.speak(message);

    expect(screenReader.getSpeechLog()).toContain("Test message");
  });

  // Test: Basic functionality, toggleScreenReader() should toggle screen reader status
  it("Toggle Screen Reader status", () => {
    const screenReader = ScreenReader.getInstance();
    expect(screenReader.getScreenReaderStatus()).toBe(false);

    screenReader.toggleScreenReader();
    expect(screenReader.getScreenReaderStatus()).toBe(true);

    screenReader.toggleScreenReader();
    expect(screenReader.getScreenReaderStatus()).toBe(false);
  });

  // Test: Basic functionality, toggleScreenReader() should prevent speak() from adding messages to speech log when false
  it("Should not be able to speak() when screen reader disabled", () => {
    const screenReader = ScreenReader.getInstance();
    expect(screenReader.getScreenReaderStatus()).toBe(false);

    const message: string = "Test message";
    screenReader.speak(message);
    expect(screenReader.getSpeechLog()).toEqual([]);

    screenReader.toggleScreenReader();
    expect(screenReader.getScreenReaderStatus()).toBe(true);

    screenReader.speak(message);
    expect(screenReader.getSpeechLog()).toEqual(["Test message"]);

    screenReader.toggleScreenReader();
    expect(screenReader.getScreenReaderStatus()).toBe(false);

    screenReader.speak(message);
    expect(screenReader.getSpeechLog()).toEqual(["Test message"]);

    screenReader.toggleScreenReader();
    expect(screenReader.getScreenReaderStatus()).toBe(true);

    screenReader.speak(message);
    expect(screenReader.getSpeechLog()).toEqual([
      "Test message",
      "Test message",
    ]);
  });

  // Test: the message log should never exceed the maximum log size (5 by default)
  it("Should not exceed maximum log size", () => {
    const screenReader = ScreenReader.getInstance();
    for (let i = 0; i < 10; i++) {
      // Assuming max log size is 5
      screenReader.speak(`Message ${i}`);
    }

    expect(screenReader.getSpeechLog().length).toBeLessThanOrEqual(5);
  });

  // Test: clearSpeechLog() should clear the speech log
  it("Should clear the speech log", () => {
    const screenReader = ScreenReader.getInstance();
    screenReader.toggleScreenReader();
    screenReader.speak("Test message");
    expect(screenReader.getSpeechLog()).toContain("Test message");
    screenReader.clearSpeechLog();

    expect(screenReader.getSpeechLog()).toEqual([]);
  });

  // Test: subscribe() should add a subscriber to the list of observers, and they should be notified appropriately
  it("should notify subscribers on log update", () => {
    const screenReader = ScreenReader.getInstance();
    screenReader.toggleScreenReader();
    const mockSubscriber = jest.fn();

    expect(mockSubscriber).toHaveBeenCalledTimes(0);

    screenReader.subscribe(mockSubscriber);
    screenReader.speak("Test message");

    expect(mockSubscriber).toHaveBeenCalled();
    expect(mockSubscriber).toHaveBeenCalledTimes(1);
  });

  // Test: certain data types and strings should not be spoken and added to the speech log
  it("Should handle empty or null messages gracefully", () => {
    const screenReader = ScreenReader.getInstance();
    screenReader.toggleScreenReader();
    screenReader.speak(null as unknown as string);
    expect(screenReader.getSpeechLog()).toEqual([]);
    screenReader.speak(undefined as unknown as string);
    expect(screenReader.getSpeechLog()).toEqual([]);
    screenReader.speak("");
    expect(screenReader.getSpeechLog()).toEqual([]);
    screenReader.speak("''");
    expect(screenReader.getSpeechLog()).toEqual([]);
    screenReader.speak('""');
    expect(screenReader.getSpeechLog()).toEqual([]);
  });
});
