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
                CellHelper.getIndexOfCol(CellHelper.getColFromKey(key)) < this.colCount &&
                CellHelper.getIndexOfRow(CellHelper.getRowFromKey(key)) < this.rowCount
    }
    
    public addRow(index : number) : void {
        if (index < 0) {
            throw new Error("ERROR: Spreadsheet.addRow() given negative index.");
        }
        if (index > this.rowCount) {
            throw new Error("ERROR: Spreadsheet.addRow() given index greater than rowCount.");
        }


        this.rowCount++;
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + CellHelper.getRowKeyFromIndex(index), 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            false)

        if (cellsToChange.length === 0) {
            this.notifyObservers();
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
            newKey = CellHelper.getColFromKey(oldKey) + CellHelper.getRowKeyFromIndex(CellHelper.getIndexOfRow(CellHelper.getRowFromKey(oldKey)) + 1);
            // console.log("AddRow iteration " + i + " Changing cell at key " + oldKey + " to new key " + newKey)
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        // for (let i = 0; i < cellsToChange.length; i++) {
        //     cellsToChange[i].updateCellValueAndShift(true, false, "A" + CellHelper.getRowKeyFromIndex(index));
        // }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
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
        let cellsToChange : Cell[] = this.getCellsGivenRange(CellHelper.getColKeyFromIndex(index) + "1", 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
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
            newKey = CellHelper.getColKeyFromIndex(CellHelper.getIndexOfCol(CellHelper.getColFromKey(oldKey)) + 1) + CellHelper.getRowFromKey(oldKey)
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        // for (let i = 0; i < cellsToChange.length; i++) {
        //     cellsToChange[i].updateCellValueAndShift(true, true, CellHelper.getColKeyFromIndex(index) + "1");
        // }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        this.notifyObservers();
    }
    
    public removeRow(index : number) : void {
        // TODO: Implement


        let cellsToRemove : Cell[] = this.getCellsGivenRange("A" + CellHelper.getRowKeyFromIndex(index), 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(index),
                                                            true)
        if (cellsToRemove.length !== 0) {
            for (let i = 0; i < cellsToRemove.length; i++) {
                this.deleteCell(cellsToRemove[i])
            }
        }
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + CellHelper.getRowKeyFromIndex(index+1), 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        
        this.rowCount--;
        if (cellsToChange.length === 0) {
            this.notifyObservers();
            return;
        }
        let oldKey : string = ""
        let newKey : string = ""
        let changingCell : Cell
        for (let i = 0; i < cellsToChange.length; i++) {
            changingCell = cellsToChange[i];
            oldKey = changingCell.getKey();
            newKey = CellHelper.getColFromKey(oldKey) + CellHelper.getRowKeyFromIndex(CellHelper.getIndexOfRow(CellHelper.getRowFromKey(oldKey)) - 1);
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        // for (let i = 0; i < cellsToChange.length; i++) {
        //     cellsToChange[i].updateCellValueAndShift(false, true, "A" + CellHelper.getRowKeyFromIndex(index+1));
        // }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
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
        let cellsToRemove : Cell[] = this.getCellsGivenRange(CellHelper.getColKeyFromIndex(index) + "1", 
                                                            CellHelper.getColKeyFromIndex(index) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        if (cellsToRemove.length !== 0) {
            for (let i = 0; i < cellsToRemove.length; i++) {
                this.deleteCell(cellsToRemove[i]);
            }
        }
        

        // Shift cells to the right of the removed column left one column
        let cellsToChange : Cell[] = this.getCellsGivenRange(CellHelper.getColKeyFromIndex(index+1) + "1", 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        
        this.colCount--
        if (cellsToChange.length === 0) {
            this.notifyObservers();
            return;
        }
        let oldKey : string = ""
        let newKey : string = ""
        let changingCell : Cell
        for (let i = 0; i < cellsToChange.length; i++) {
            changingCell = cellsToChange[i];
            oldKey = changingCell.getKey();
            newKey = CellHelper.getColKeyFromIndex(CellHelper.getIndexOfCol(CellHelper.getColFromKey(oldKey)) - 1) + CellHelper.getRowFromKey(oldKey)
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        // for (let i = 0; i < cellsToChange.length; i++) {
        //     cellsToChange[i].updateCellValueAndShift(false, true, CellHelper.getColKeyFromIndex(index) + "1");
        // }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }

        // GET LIST LEFT TO RIGHT
        // DELETE 
        // SHIFT
        // TODO: OBSERVERS
        this.notifyObservers();
    }
    
    public clearRow(index : number) : void {
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + CellHelper.getRowKeyFromIndex(index), 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(index),
                                                            true)
        if (cellsToChange.length === 0) {
            return;
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].setCellValue("");
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        // TODO: Implement
        this.notifyObservers();
    }
    
    public clearColumn(index : number) : void {
        let cellsToChange : Cell[] = this.getCellsGivenRange(CellHelper.getColKeyFromIndex(index) + "1", 
                                                            CellHelper.getColKeyFromIndex(index) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        if (cellsToChange.length === 0) {
            return;
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].setCellValue("");
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        // TODO: Implement
        this.notifyObservers();
    }
    
    public saveSpreadsheet(fileName: string): void {
        // TODO: serialize cells
        // console.log('Saving file');

        // Get data from spreadsheet into JSON format
        let cellData : any;
        cellData.set("RowCount", this.rowCount);
        cellData.set("ColCount", this.colCount);
        this.cells.forEach((cell : Cell, key : string) => {
            cellData.set(key, cell.getFormulaBarDisplayValue());
        });
        const json = JSON.stringify(cellData);
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
        // console.log('Loading file')
        // Prompt user for file to load
        this.cells = new Map<string, Cell>();
        var input = document.createElement('input');
        input.type = 'file';

        // When file selected, read contents of file
        input.onchange = (e: any) => {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            let newCell;
            // When done reading, assign to cells
            // TODO: actually assign to cells dict
            reader.onload = readerEvent => {
                let readValue : any = JSON.parse(readerEvent.target!.result!?.toString());
                readValue.array.forEach((element: string[]) => {
                    if (element[0] == "RowCount") {
                        this.rowCount = Number(element[1]);
                    }
                    else if (element[0] == "ColumnCount") {
                        this.colCount = Number(element[1]);
                    }
                    else {
                        newCell = new Cell(element[0], "", this);
                        this.cells.set(element[0], newCell);
                        newCell.setCellValue(element[1])
                    }
                });
            }
        };
        input.click();
    }
    
    // public getTextReader() : TextReader {
        // TODO: Implement
    // }

    // TODO Key: A1 + 1 (B1 or A2)
    // TODO: Key A + 1 (B) -> Key

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
        let startRowIndex = CellHelper.getIndexOfRow(CellHelper.getRowFromKey(startKey));
        let startColIndex = CellHelper.getIndexOfCol(CellHelper.getColFromKey(startKey));
        let endRowIndex = CellHelper.getIndexOfRow(CellHelper.getRowFromKey(endKey));
        let endColIndex = CellHelper.getIndexOfCol(CellHelper.getColFromKey(endKey));
        let cells : Cell[] = [];
        // console.log("Start getCellsGivenRange")
        for (let i = startRowIndex; i <= endRowIndex; i++) {
            for (let j = startColIndex; j <= endColIndex; j++) {
                let key : string = CellHelper.getColKeyFromIndex(j) + CellHelper.getRowKeyFromIndex(i);
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
    }

    public spreadsheetAsString() : string {
        let orderedCells : Cell[] = this.getCellsGivenRange("A1", 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        let outputString : string = ""
        for (let i = 0; i < orderedCells.length; i++) {
            outputString += orderedCells[i].getKey() + " : " + orderedCells[i].getDisplayValue() + "\n"
        }
        return outputString
    }

}
