import { Spreadsheet } from "./Spreadsheet";
import { CellHelper } from "./CellHelper";

export class Cell {
    private key : string;
    private displayValue : string;
    private inputValue : string;
    private observers : Cell[] = [];
    private mySpreadsheet : Spreadsheet;

    constructor(key : string, input : string, spreadsheet : Spreadsheet) {
        this.key = key;
        this.inputValue = input;
        this.mySpreadsheet = spreadsheet;
        let processedData = CellHelper.getValueFromUserInput(this.inputValue, this.mySpreadsheet)
        this.displayValue = processedData[0]
        for (let observeeKey of processedData[1]) {
            this.mySpreadsheet.getCellAtKey(observeeKey);
        }
        this.updateCellValue()
    }

    public getKey() : string {
        return this.key;
    }

    public setKey(key : string) : void {
        this.key = key;
    }

    public clearCell() : void {
        this.inputValue = "";
        this.updateCellValue()
    }
    
    public getDisplayValue() : string {
        return this.displayValue;
    }
    
    public getFormulaBarDisplayValue() : string {
        return this.inputValue;
    }
    
    public setCellValue(input : string) : void {
        this.inputValue = input;
        this.updateCellValue();
    }
    
    public updateCellValue() {
        let processedData = CellHelper.getValueFromUserInput(this.inputValue, this.mySpreadsheet)
        this.displayValue = processedData[0]
        for (let observeeKey of processedData[1]) {
            this.mySpreadsheet.getCellAtKey(observeeKey).addObserver(this);
        }
        this.updateObservers();
    }
    
    public addObserver(observer : Cell) : void {
        if (this.observers.includes(observer)) {
            return;
        }
        this.observers.push(observer);
        // TODO: CONFIRM ACYCLICITY
    }
    
    public removeObserver(observer : Cell) : void {
        let index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        } else {
            throw new Error("ERROR: Cell.removeObserver() did not find given observer in this.observers to remove.");
        }
    }
    
    public getObservers() : Cell[] {
        return this.observers
    }

    private updateObservers() : void {
        for (let observer of this.observers) {
            observer.updateCellValue();
        }
    }

    public deleteCell() : void {
        // for (let observer of this.observers) {
        //     observer.updateCellValue(); // TODO: ORDER
        // }
    }
}
