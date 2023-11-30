import { ScreenReader } from "model/ScreenReader";

describe('ScreenReader', () => {

    beforeAll(() => {
        // Since we are not testing the speechSynthesis object, we can mock it
        global.SpeechSynthesisUtterance = jest.fn().mockImplementation(() => ({}));
    });

    it('Singleton - should always return the same instance', () => {
        const instance1 = ScreenReader.getInstance();
        const instance2 = ScreenReader.getInstance();

        expect(instance1).toBe(instance2);
    });

    it('should speak text and update log', () => {
        const screenReader = ScreenReader.getInstance();
        screenReader.speak('Test message');

        // expect(screenReader.speak).toHaveBeenCalledWith(expect.any(SpeechSynthesisUtterance));
        expect(screenReader.getSpeechLog()).toContain('Test message');
    });

    // Additional tests...
});
