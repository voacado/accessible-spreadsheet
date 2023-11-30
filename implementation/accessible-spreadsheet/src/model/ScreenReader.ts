export class ScreenReader {

    // Singleton Design Pattern - only one instance of ScreenReader
    private static instance: ScreenReader;
    private textToSpeech: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    private speechLog: string[] = [];
    private isScreenReaderActive: boolean = false;

    constructor() {
        if (ScreenReader.instance) {
            return ScreenReader.instance;
        }
        ScreenReader.instance = this;
    }

    public static getInstance(): ScreenReader {
        if (!ScreenReader.instance) {
            ScreenReader.instance = new ScreenReader();
        }
        return ScreenReader.instance;
    }

    public toggleScreenReader(): void {
        this.isScreenReaderActive = !this.isScreenReaderActive;
    }

    public speak(text: string): void {
        if ((text != null && text !== undefined && text['length'] !== 0 && text !== "" && text !== "''" && text !== "\"\"" && this.isScreenReaderActive)) {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            this.textToSpeech.text = text;
            window.speechSynthesis.speak(this.textToSpeech);
            this.speechLog.push(text);
            console.log(this.speechLog);
        }
    }

    public getSpeechLog(): string[] {
        return this.speechLog;
    }

    public clearSpeechLog(): void {
        this.speechLog = [];
    }
}
