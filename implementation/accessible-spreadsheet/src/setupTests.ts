// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Global Mocks

// Since we are not testing the speechSynthesis object, we can mock it
// We assume it works as it is provided from the browser
// SpeechSynthehsisUtterance is a browser API which can't be used in the Jest environment
global.SpeechSynthesisUtterance = jest.fn().mockImplementation(() => ({}));

// Mock window.speechSynthesis and its properties
global.window.speechSynthesis = {
    speak: jest.fn(),
    cancel: jest.fn(),
    speaking: false,
    onvoiceschanged: null,
    paused: false,
    pending: false,
    getVoices: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
    };

    