export class ScreenReader {
  // Singleton Design Pattern - only one instance of ScreenReader
  private static instance: ScreenReader;

  // Observer Design Pattern - observers are notified when screen reader log changes (like ScreenReaderLog component)
  private observers: (() => void)[] = [];

  private textToSpeech: SpeechSynthesisUtterance =
    new SpeechSynthesisUtterance();
  private speechLog: string[] = [];
  private isScreenReaderActive: boolean = false;
  private maxLogSize = 5;

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

  public subscribe(observer: () => void): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: () => void): void {
    this.observers = this.observers.filter(
      (subscriber) => subscriber !== observer
    );
  }

  public notifyObservers(): void {
    this.observers.forEach((observer) => observer());
  }

  public toggleScreenReader(): void {
    this.isScreenReaderActive = !this.isScreenReaderActive;
  }

  public speak(text: string): void {
    // if ((text != null && text !== undefined && text['length'] !== 0 && text !== "" && text !== "''" && text !== "\"\"" && this.isScreenReaderActive)) {
    if (
      text != null &&
      text !== undefined &&
      text["length"] !== 0 &&
      text !== "" &&
      text !== "''" &&
      text !== '""' &&
      this.isScreenReaderActive
    ) {
      this.addToSpeechLog(text);
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      this.textToSpeech.text = text;
      window.speechSynthesis.speak(this.textToSpeech);
    }
  }

  private addToSpeechLog(text: string): void {
    if (this.speechLog.length >= this.maxLogSize) {
      this.speechLog.shift();
    }
    this.speechLog.push(text);
    this.notifyObservers();
  }

  public getSpeechLog(): string[] {
    return this.speechLog;
  }

  public clearSpeechLog(): void {
    this.speechLog = [];
    this.notifyObservers();
  }

  public getScreenReaderStatus(): boolean {
    return this.isScreenReaderActive;
  }
}
