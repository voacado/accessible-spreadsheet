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

  /**
   * Generate or return the instance of ScreenReader
   * Follows Singleton Design Pattern - only one instance of ScreenReader
   * 
   * @returns the instance of ScreenReader
   */
  public static getInstance(): ScreenReader {
    if (!ScreenReader.instance) {
      ScreenReader.instance = new ScreenReader();
    }
    return ScreenReader.instance;
  }

  /**
   * Add an observer to the list of observers
   * @param observer - the observer to be added to the list of observers
   */
  public subscribe(observer: () => void): void {
    this.observers.push(observer);
  }

  /**
   * Remove an observer from the list of observers
   * @param observer - the observer to be removed from the list of observers
   */
  public unsubscribe(observer: () => void): void {
    this.observers = this.observers.filter(
      (subscriber) => subscriber !== observer
    );
  }

  /**
   * Notify all observers that the screen reader log has changed
   */  
  public notifyObservers(): void {
    this.observers.forEach((observer) => observer());
  }

  /**
   * Toggle the screen reader on or off
   */
  public toggleScreenReader(): void {
    this.isScreenReaderActive = !this.isScreenReaderActive;
  }

  /**
   * Speak the given text (text-to-speech) if the screen reader is active
   * @param text - text to be spoken by the screen reader
   */
  public speak(text: string): void {
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

  /**
   * Add the given text to the screen reader log
   * @param text - text to be added to the screen reader log
   */
  private addToSpeechLog(text: string): void {
    if (this.speechLog.length >= this.maxLogSize) {
      this.speechLog.shift();
    }
    this.speechLog.push(text);
    this.notifyObservers();
  }

  /**
   * Get the screen reader log
   * @returns the screen reader log
   */
  public getSpeechLog(): string[] {
    return this.speechLog;
  }

  /**
   * Clear the screen reader log
   * NOTE: Used for testing purposes
   */
  public clearSpeechLog(): void {
    this.speechLog = [];
    this.notifyObservers();
  }

  /**
   * Get the status of the screen reader (on or off)
   * @returns the status of the screen reader
   */
  public getScreenReaderStatus(): boolean {
    return this.isScreenReaderActive;
  }
}
