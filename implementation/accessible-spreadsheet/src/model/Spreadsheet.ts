import { Cell } from "./Cell";
// import { IValue } from "./values/IValue";
// import { EmptyValue } from "./values/EmptyValue";
// import { NumberValue } from "./values/NumberValue";
// import { StringValue } from "./values/StringValue";
// import { FormulaValue } from "./values/FormulaValue";
// import { CellReference } from "./values/CellReference";
// import { MultiCellReference } from "./values/MultiCellReference";
import { CellHelper } from "./CellHelper";
import { string } from "yargs";

const initRowCount = 3
const initColCount = 3

export class Spreadsheet {
    // Dict approach
    //private cells = new Map<string, Map<string, Cell>>();
    private cells = new Map<string, Cell>();
    private rowCount = 0;
    private colCount = 0;

    // private textReader : TextReader;

    // Singleton Design Pattern - only one instance of Spreadsheet
    private static instance: Spreadsheet;
    // Observer Design Pattern - observers are notified when spreadsheet changes (like CellGrid)
    private observers: (() => void)[] = [];

    constructor(rowCount :number=initRowCount, colCount : number=initColCount) { 
        // TODO: Implement
        this.initialize(rowCount, colCount);
    }

    public static getInstance(): Spreadsheet {
        if (!Spreadsheet.instance) {
            Spreadsheet.instance = new Spreadsheet(100, 100);
        }
        return Spreadsheet.instance;
    }

    public subscribe(observer: () => void): void {
        this.observers.push(observer);
    }

    public unsubscribe(observer: () => void): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notifyObservers(): void {
        this.observers.forEach(observer => observer());
    }

    private initialize(rowCount :number, colCount : number) : void {
        this.rowCount = rowCount;
        this.colCount = colCount;
    }

    public getRowCount() : number {
        return this.rowCount;
    }

    public getColCount() : number {
        return this.colCount;
    }

    public keyExists(key : string) : boolean {
        return CellHelper.stringIsValidKey(key) && 
                this.getIndexOfCol(this.getColFromKey(key)) < this.colCount &&
                this.getIndexOfRow(this.getRowFromKey(key)) < this.rowCount
    }
    
    public addRow(index : number) : void {
        if (index < 0) {
            throw new Error("ERROR: Spreadsheet.addRow() given negative index.");
        }
        if (index > this.rowCount) {
            throw new Error("ERROR: Spreadsheet.addRow() given index greater than rowCount.");
        }


        this.rowCount++;
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + this.getRowKeyFromIndex(index), 
                                                            this.getColKeyFromIndex(this.colCount-1) + this.getRowKeyFromIndex(this.rowCount-1),
                                                            false)

        if (cellsToChange.length === 0) {
            // console.log("AddRow cellsToChange.length was 0 given index " + index)
            return;
        }
        // console.log("AddRow cellsToChange.length was " + cellsToChange.length + " given index " + index)
        // console.log("RANGE EXPRSSION: " + "A" + this.getRowKeyFromIndex(index) + this.getColKeyFromIndex(this.colCount-1) + this.getRowKeyFromIndex(this.rowCount-1))

        let oldKey : string = ""
        let newKey : string = ""
        let changingCell : Cell
        for (let i = 0; i < cellsToChange.length; i++) {
            changingCell = cellsToChange[i];
            oldKey = changingCell.getKey();
            newKey = this.getColFromKey(oldKey) + this.getRowKeyFromIndex(this.getIndexOfRow(this.getRowFromKey(oldKey)) + 1);
            // console.log("AddRow iteration " + i + " Changing cell at key " + oldKey + " to new key " + newKey)
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        this.notifyObservers();
    }
    
    public addColumn(index : number) : void {
        if (index < 0) {
            throw new Error("ERROR: Spreadsheet.addColumn() given negative index.");
        }
        if (index > this.colCount) {
            throw new Error("ERROR: Spreadsheet.addColumn() given index greater than colCount.");
        }

        this.colCount++
        let cellsToChange : Cell[] = this.getCellsGivenRange(this.getColKeyFromIndex(index) + "1", 
                                                            this.getColKeyFromIndex(this.colCount-1) + this.getRowKeyFromIndex(this.rowCount-1),
                                                            false)
        
        
        if (cellsToChange.length === 0) {
            return;
        }
        let oldKey : string = ""
        let newKey : string = ""
        let changingCell : Cell
        for (let i = 0; i < cellsToChange.length; i++) {
            changingCell = cellsToChange[i];
            oldKey = changingCell.getKey();
            newKey = this.getColKeyFromIndex(this.getIndexOfCol(this.getColFromKey(oldKey)) + 1) + this.getRowFromKey(oldKey)
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        this.notifyObservers();
    }
    
    public removeRow(index : number) : void {
        // TODO: Implement


        let cellsToRemove : Cell[] = this.getCellsGivenRange("A" + this.getRowKeyFromIndex(index), 
                                                            this.getColKeyFromIndex(this.colCount-1) + this.getRowKeyFromIndex(index),
                                                            true)
        if (cellsToRemove.length !== 0) {
            for (let i = 0; i < cellsToRemove.length; i++) {
                this.deleteCell(cellsToRemove[i])
            }
        }
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + this.getRowKeyFromIndex(index+1), 
                                                            this.getColKeyFromIndex(this.colCount-1) + this.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        
        this.rowCount--;
        if (cellsToChange.length === 0) {
            return;
        }
        let oldKey : string = ""
        let newKey : string = ""
        let changingCell : Cell
        for (let i = 0; i < cellsToChange.length; i++) {
            changingCell = cellsToChange[i];
            oldKey = changingCell.getKey();
            newKey = this.getColFromKey(oldKey) + this.getRowKeyFromIndex(this.getIndexOfRow(this.getRowFromKey(oldKey)) - 1);
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }

        // GET LIST LEFT TO RIGHT

        // DELETE 

        // SHIFT

        // TODO: OBSERVERS
        this.notifyObservers();
    }
    
    public removeColumn(index : number) : void {
        // TODO: Implement

        // Delete all cells in the removed column
        let cellsToRemove : Cell[] = this.getCellsGivenRange(this.getColKeyFromIndex(index) + "1", 
                                                            this.getColKeyFromIndex(index) + this.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        if (cellsToRemove.length !== 0) {
            for (let i = 0; i < cellsToRemove.length; i++) {
                this.deleteCell(cellsToRemove[i]);
            }
        }
        

        // Shift cells to the right of the removed column left one column
        let cellsToChange : Cell[] = this.getCellsGivenRange(this.getColKeyFromIndex(index+1) + "1", 
                                                            this.getColKeyFromIndex(this.colCount-1) + this.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        
        this.colCount--
        if (cellsToChange.length === 0) {
            return;
        }
        let oldKey : string = ""
        let newKey : string = ""
        let changingCell : Cell
        for (let i = 0; i < cellsToChange.length; i++) {
            changingCell = cellsToChange[i];
            oldKey = changingCell.getKey();
            newKey = this.getColKeyFromIndex(this.getIndexOfCol(this.getColFromKey(oldKey)) - 1) + this.getRowFromKey(oldKey)
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }

        // GET LIST LEFT TO RIGHT
        // DELETE 
        // SHIFT
        // TODO: OBSERVERS
        this.notifyObservers();
    }
    
    public clearRow(index : number) : void {
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + this.getRowKeyFromIndex(index), 
                                                            this.getColKeyFromIndex(this.colCount-1) + this.getRowKeyFromIndex(index),
                                                            true)
        if (cellsToChange.length === 0) {
            return;
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].setCellValue("");
        }
        // TODO: Implement
        this.notifyObservers();
    }
    
    public clearColumn(index : number) : void {
        let cellsToChange : Cell[] = this.getCellsGivenRange(this.getColKeyFromIndex(index) + "1", 
                                                            this.getColKeyFromIndex(index) + this.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        if (cellsToChange.length === 0) {
            return;
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].setCellValue("");
        }
        // TODO: Implement
        this.notifyObservers();
    }
    
    public saveSpreadsheet(fileName: string): void {
        // TODO: serialize cells
        console.log('Saving file');

        // Get data from spreadsheet into JSON format
        const json = JSON.stringify(this.cells);
        const blob = new Blob([json], {type: "application/json"});
        const url = URL.createObjectURL(blob);
      
        // Create a link to download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
      
        // Clean up created file from memory
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    public loadSpreadsheet(): void {
        console.log('Loading file')
        // Prompt user for file to load
        var input = document.createElement('input');
        input.type = 'file';

        // When file selected, read contents of file
        input.onchange = (e: any) => {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            // When done reading, assign to cells
            // TODO: actually assign to cells dict
            reader.onload = readerEvent => {
            // this.cells = readerEvent.target!.result;
            }
        };
        input.click();
    }
    
    // public getTextReader() : TextReader {
        // TODO: Implement
    // }

    // TODO Key: A1 + 1 (B1 or A2)
    // TODO: Key A + 1 (B) -> Key

    public getRowAndColFromKey(key : string) : [string, string] {
        return [this.getRowFromKey(key), this.getColFromKey(key)];
    }

    public getRowAndColKeyFromIndex(idx : number) : [string, string] {
        return [this.getRowKeyFromIndex(idx), this.getColKeyFromIndex(idx)];
    }

    public getIndexFromRowAndCol(row : string, col : string) : [number, number] {
        return [this.getIndexOfRow(row), this.getIndexOfCol(col)]
    }

    private getRowFromKey(key : string): string {
        let matches: RegExpMatchArray = key.match(/([A-Z]+)(\d+)/)!;
        if (matches) {
            return parseInt(matches[2]).toString();
        } else {
            throw new Error("ERROR: Spreadsheet.getRowFromKey() given key with more than one row.");
        }
    }

    private getColFromKey(key : string): string {
        let matches: RegExpMatchArray = key.match(/([A-Z]+)(\d+)/)!;
        if (matches) {
            return matches[1];
        } else {
            throw new Error("ERROR: Spreadsheet.getRowFromKey() given key with more than one row.");
        }
    }

    private getIndexOfRow(row : string) : number {
        return Number(row) - 1;
    }

    private getIndexOfCol(col : string) : number {
        let index: number = 0;
        for (let i = 0; i < col.length; i++) {
            index *= 26;
            index += (col.charCodeAt(i) - 65) + 1; // A = 1, B = 2, ... Z = 26
        }
        return index - 1; // Zero-indexed
    }

    private getRowKeyFromIndex(index : number) : string {
        return String(index + 1);
    }

    private getColKeyFromIndex(index : number) : string {
        let key: string = "";
        while (index >= 0) {
            key = String.fromCharCode(index % 26 + 65) + key;
            index = Math.floor(index / 26) - 1;
        }
        return key;
    }

    private getCellAtKeyIfExists(key : string) : Cell | undefined {
        // TODO if spreadsheet does not reach this key, ?
        // console.log("getCellAtKeyIfExists() key: " + key + "does exist?: " + (this.cells.get(key) !== undefined))
        return this.cells.get(key);
    }
    
    public getCellAtKey(key : string) : Cell {
        // TODO if spreadsheet does not reach this key, ?

        let cell : Cell = this.cells.get(key)!;

        if (cell === undefined) {
            // console.log("getCellAtKey found undefined. Creating new cell at key: " + key  + " with empty value")
            cell = new Cell(key, "", this)
            this.cells.set(key, cell);
        }
        return cell;
    }

    public getCellsGivenRange(startKey : string, endKey : string, leftToRight : boolean=true) : Cell[] {
        let startRowIndex = this.getIndexOfRow(this.getRowFromKey(startKey));
        let startColIndex = this.getIndexOfCol(this.getColFromKey(startKey));
        let endRowIndex = this.getIndexOfRow(this.getRowFromKey(endKey));
        let endColIndex = this.getIndexOfCol(this.getColFromKey(endKey));
        let cells : Cell[] = [];
        // console.log("Start getCellsGivenRange")
        for (let i = startRowIndex; i <= endRowIndex; i++) {
            for (let j = startColIndex; j <= endColIndex; j++) {
                let key : string = this.getColKeyFromIndex(j) + this.getRowKeyFromIndex(i);
                // console.log("Checking key " + key + " in getCellsGivenRange")
                let cell : Cell | undefined = this.getCellAtKeyIfExists(key);
                if (cell !== undefined) {
                    // console.log("Found cell at key " + key + " in getCellsGivenRange")
                    cells.push(cell);
                } 
                else {
                    // console.log("cell did not exist at key: " + key)
                }
            }
        }
        
        // console.log("Length of cells: " + cells.length)

        if (leftToRight) {
            return cells;
        }
        return cells.reverse();
    }

    public setCellAtKeyGivenInput(key : string, userInput : string) : void {
        let cell : Cell = this.getCellAtKey(key);
        // let value : IValue = CellHelper.getValueFromUserInput(userInput, this);
        // console.log("Setting cell at " + key + " value to " + value.display())
        cell.setCellValue(userInput);
    }

    public getCellAtKeyDisplay(key : string) : string {
        let cell : Cell = this.getCellAtKey(key);
        return cell.getDisplayValue();
    }

    public getCellAtKeyFormulaBarDisplay(key : string) : string {
        let cell : Cell = this.getCellAtKey(key);
        return cell.getFormulaBarDisplayValue();
    }

    // public getCellAtKeyValue(key : string) : number | string {
    //     let cell : Cell = this.getCellAtKey(key);
    //     return cell.getDisplayValue();
    // }

    private deleteCell(cell : Cell) : void {
        // TODO
        let oldKey : string = cell.getKey()
        cell.deleteCell();
        this.cells.delete(oldKey);
        // Observesr
    }

    public spreadsheetAsString() : string {
        let orderedCells : Cell[] = this.getCellsGivenRange("A1", 
                                                            this.getColKeyFromIndex(this.colCount-1) + this.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        let outputString : string = ""
        for (let i = 0; i < orderedCells.length; i++) {
            outputString += orderedCells[i].getKey() + " : " + orderedCells[i].getDisplayValue() + "\n"
        }
        return outputString
    }

}
