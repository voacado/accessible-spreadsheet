import { Spreadsheet } from "./Spreadsheet";
import { CellParser } from "./CellParser";

/**
 * Cell class
 * Represents a single cell in the spreadsheet
 */
export class Cell {
    private key : string; // key of the cell
    private displayValue : string; // display value of the cell
    private inputValue : string; // input value of the cell
    private observers : Cell[] = []; // observers of the cell

    constructor(key : string, input : string) {
        this.key = key;
        this.inputValue = input;
        let processedData = CellParser.getValueFromUserInput(this.inputValue)
        this.displayValue = processedData[0]
        for (let observeeKey of processedData[1]) {
            Spreadsheet.getInstance().getCellAtKey(observeeKey);
        }
        this.updateCellValue()
    }

    /**
     * Get the key of the cell
     * @returns the key of the cell
     */
    public getKey() : string {
        return this.key;
    }

    /**
     * Set the key of the cell
     * @param key - the key to set the cell to
     */
    public setKey(key : string) : void {
        this.key = key;
    }

    /**
     * Clear the cell of its value
     */
    public clearCell() : void {
        this.inputValue = "";
        this.updateCellValue()
    }
    
    /**
     * Get the display value of the cell
     * The display value is post-formula evaluation
     * @returns the display value of the cell
     */
    public getDisplayValue() : string {
        return this.displayValue;
    }
    
    /**
     * Get the formula bar (input) value of the cell
     * The formula bar (input) value is pre-formula evaluation
     * @returns the formula bar (input) value of the cell
     */
    public getFormulaBarDisplayValue() : string {
        return this.inputValue;
    }
    
    /**
     * Set the  value of the cell
     * @param input - the value to set the cell to
     */
    public setCellValue(input : string) : void {
        this.inputValue = input;
        this.updateCellValue();
    }
    
    /**
     * Get the value of the cell
     */
    public updateCellValue(): void {
        let processedData = CellParser.getValueFromUserInput(this.inputValue)
        this.displayValue = processedData[0]
        if (processedData[1].includes(this.getKey())) {
            this.displayValue = "#ERROR: self-ref.";
            this.updateObservers();
            return;
        }
        for (let observeeKey of processedData[1]) {
            Spreadsheet.getInstance().getCellAtKey(observeeKey).addObserver(this);
        }
        this.updateObservers();
    }
    
    /**
     * Add an observer to the cell
     */
    public addObserver(observer : Cell) : void {
        if (this.observers.includes(observer)) {
            return;
        }
        this.observers.push(observer);
    }
    
    /**
     * Remove an observer from the cell
     */
    public removeObserver(observer : Cell) : void {
        let index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        } else {
            throw new Error("ERROR: Cell.removeObserver() did not find given observer in this.observers to remove.");
        }
    }
    
    /**
     * Get the observers of the cell
     */
    public getObservers() : Cell[] {
        return this.observers
    }

    /**
     * Notify the observers of the cell
     */
    public updateObservers() : void {
        for (let observer of this.observers) {
            observer.updateCellValue();
        }
    }

    /**
     * Delete the cell
     */
    public deleteCell() : void {
        this.inputValue = "";
        this.displayValue = "";
        for (let observer of this.observers) {
            observer.updateCellValue();
        }
    }
}
