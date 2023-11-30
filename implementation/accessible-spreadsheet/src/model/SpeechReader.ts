export class SpeechReader {

    // Singleton Design Pattern - only one instance of SpeechReader
    private static instance: SpeechReader;
    private textToSpeech: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    private speechLog: string[] = [];
    private isSpeechReaderActive: boolean = false;

    constructor() {
        if (SpeechReader.instance) {
            return SpeechReader.instance;
        }
        SpeechReader.instance = this;
    }

    public static getInstance(): SpeechReader {
        if (!SpeechReader.instance) {
            SpeechReader.instance = new SpeechReader();
        }
        return SpeechReader.instance;
    }

    public toggleSpeechReader(): void {
        this.isSpeechReaderActive = !this.isSpeechReaderActive;
    }

    public speak(text: string): void {
        if ((text != null && text !== undefined && text['length'] !== 0 && text !== "" && text !== "''" && text !== "\"\"" && this.isSpeechReaderActive)) {
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
