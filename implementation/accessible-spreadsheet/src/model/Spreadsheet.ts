import { Cell } from "./Cell";
import { CellParser } from "./CellParser";
import { CellParserHelper } from "./CellParserHelper";
import { KeyHelper } from "./KeyHelper";
import { string } from "yargs";

const initRowCount = 30;
const initColCount = 30;

export class Spreadsheet {
    // Dict approach
    private cells = new Map<string, Cell>();
    private rowCount = 0;
    private colCount = 0;

    // Singleton Design Pattern - only one instance of Spreadsheet
    private static instance: Spreadsheet;
    // Observer Design Pattern - observers are notified when spreadsheet changes (like CellGrid)
    private observers: (() => void)[] = [];

    private constructor(rowCount : number = initRowCount, colCount : number = initColCount) {
        this.initialize(rowCount, colCount);
    }

    /**
     * Generate or return the instance of Spreadsheet
     * @returns the instance of Spreadsheet
     */
    public static getInstance(): Spreadsheet {
        if (!Spreadsheet.instance) {
            Spreadsheet.instance = new Spreadsheet(initRowCount, initColCount);
        }
        return Spreadsheet.instance;
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
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    /**
     * Notify all observers that the spreadsheet has changed
     */
    public notifyObservers(): void {
        this.observers.forEach(observer => observer());
    }

    /**
     * Initialize the spreadsheet
     * @param rowCount number of rows in initial spreadsheet
     * @param colCount number of columns in initial spreadsheet
     */
    private initialize(rowCount : number, colCount : number) : void {
        this.cells = new Map<string, Cell>();
        this.rowCount = rowCount;
        this.colCount = colCount;
    }

    /**
     * Reset the spreadsheet to its initial state
     */
    public resetSpreadsheet() {
        this.initialize(initRowCount, initColCount);
        this.notifyObservers();
    }

    /**
     * Get the number of rows in the spreadsheet
     * @returns number of rows in spreadsheet
     */
    public getRowCount() : number {
        return this.rowCount;
    }

    /**
     * Get the number of columns in the spreadsheet
     * @returns number of columns in spreadsheet
     */
    public getColCount() : number {
        return this.colCount;
    }

    /**
     * Add a row to the spreadsheet (cells dict) at the given index
     * @param index index to add row at
     */
    public addRow(index : number) : void {
        if (index < 0) {
            throw new Error("ERROR: Spreadsheet.addRow() given negative index: " + index.toString());
        }
        if (index > this.rowCount) {
            throw new Error("ERROR: Spreadsheet.addRow() given index greater than rowCount:" + index.toString());
        }

        this.rowCount++;
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + KeyHelper.getRowKeyFromIndex(index), 
                                                            KeyHelper.createKeyFromIndeces(this.colCount-1, this.rowCount-1), //.getColKeyFromIndex(this.colCount-1) + KeyHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            false)

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
            newKey = KeyHelper.incrementKeyRow(oldKey);// KeyHelper.getColFromKey(oldKey) + KeyHelper.getRowKeyFromIndex(KeyHelper.getIndexOfRow(KeyHelper.getRowFromKey(oldKey)) + 1);
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        this.notifyObservers();
    }
    
    /**
     * Add a column to the spreadsheet (cells dict) at the given index
     * @param index index to add column at
     */
    public addColumn(index : number) : void {
        if (index < 0) {
            throw new Error("ERROR: Spreadsheet.addColumn() given negative index:" + index.toString());
        }
        if (index > this.colCount) {
            throw new Error("ERROR: Spreadsheet.addColumn() given index greater than colCount: " + index.toString());
        }

        this.colCount++
        let cellsToChange : Cell[] = this.getCellsGivenRange(KeyHelper.getColKeyFromIndex(index) + "1", 
                                                            KeyHelper.createKeyFromIndeces(this.colCount-1, this.rowCount-1),//KeyHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
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
            newKey = KeyHelper.incrementKeyCol(oldKey); // KeyHelper.getColKeyFromIndex(KeyHelper.getIndexOfCol(KeyHelper.getColFromKey(oldKey)) + 1) + KeyHelper.getRowFromKey(oldKey)
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        this.notifyObservers();
    }
    
    /**
     * Remove a row from the spreadsheet (cells dict) at the given index
     * @param index index to remove row at
     */
    public removeRow(index : number) : void {
        let cellsToRemove : Cell[] = this.getCellsGivenRange("A" + KeyHelper.getRowKeyFromIndex(index), 
                                                            KeyHelper.createKeyFromIndeces(this.colCount-1, index),
                                                            //CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(index),
                                                            true)
        let removedCellObservers : Cell[] = [];
        if (cellsToRemove.length !== 0) {
            for (let i = 0; i < cellsToRemove.length; i++) {
                let observers = cellsToRemove[i].getObservers()
                observers.forEach((element : any) => {
                    removedCellObservers.push(element);
                });
                this.deleteCell(cellsToRemove[i]);
            }
        }
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + KeyHelper.getRowKeyFromIndex(index), 
                                                            KeyHelper.createKeyFromIndeces(this.colCount-1, this.rowCount-1),
                                                            // CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
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
            newKey = KeyHelper.decrementKeyRow(oldKey);//CellHelper.getColFromKey(oldKey) + CellHelper.getRowKeyFromIndex(CellHelper.getIndexOfRow(CellHelper.getRowFromKey(oldKey)) - 1);
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        for (let i = 0; i < removedCellObservers.length; i++) {
            removedCellObservers[i].updateCellValue();
        }
        this.notifyObservers();
    }
    
    /**
     * Remove a column from the spreadsheet (cells dict) at the given index
     * @param index index to remove column at
     */
    public removeColumn(index : number) : void {
        // Delete all cells in the removed column
        let cellsToRemove : Cell[] = this.getCellsGivenRange(KeyHelper.getColKeyFromIndex(index) + "1", 
                                                            KeyHelper.createKeyFromIndeces(index, this.rowCount-1), // KeyHelper.getColKeyFromIndex(index) + KeyHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        let removedCellObservers : Cell[] = [];
        if (cellsToRemove.length !== 0) {
            for (let i = 0; i < cellsToRemove.length; i++) {
                let observers = cellsToRemove[i].getObservers()
                observers.forEach((element : any) => {
                    removedCellObservers.push(element);
                });
                this.deleteCell(cellsToRemove[i]);
            }
        }
        // Shift cells to the right of the removed column left one column
        let cellsToChange : Cell[] = this.getCellsGivenRange(KeyHelper.getColKeyFromIndex(index+1) + "1", 
                                                            KeyHelper.createKeyFromIndeces(this.colCount-1, this.rowCount-1), // KeyHelper.getColKeyFromIndex(this.colCount-1) + KeyHelper.getRowKeyFromIndex(this.rowCount-1),
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
            newKey = KeyHelper.decrementKeyCol(oldKey); //CellHelper.getColKeyFromIndex(CellHelper.getIndexOfCol(CellHelper.getColFromKey(oldKey)) - 1) + CellHelper.getRowFromKey(oldKey)
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        for (let i = 0; i < removedCellObservers.length; i++) {
            removedCellObservers[i].updateCellValue();
        }
        this.notifyObservers();
    }
    
    /**
     * Clear a row from the spreadsheet (cells dict) at the given index
     * @param index index to clear row at
     */
    public clearRow(index : number) : void {
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + KeyHelper.getRowKeyFromIndex(index), 
                                                            KeyHelper.createKeyFromIndeces(this.colCount-1, index),
                                                            // KeyHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(index),
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
        this.notifyObservers();
    }
    
    /**
     * Clear a column from the spreadsheet (cells dict) at the given index
     * @param index index to clear column at
     */
    public clearColumn(index : number) : void {
        let cellsToChange : Cell[] = this.getCellsGivenRange(KeyHelper.getColKeyFromIndex(index) + "1", 
                                                            KeyHelper.createKeyFromIndeces(index, this.rowCount-1),
                                                            //CellHelper.getColKeyFromIndex(index) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
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
        this.notifyObservers();
    }
    
    /**
     *  Save the spreadsheet to a file
     * @param fileName name of spreadsheet to use when saving to file
     */
    public saveSpreadsheet(fileName: string): void {
        // Get data from spreadsheet into JSON format
//        let cellData = new Map<string, string>();
        let cellData : any = {};
        // let cellData: {string: string} = {};
        cellData["RowCount"] = this.rowCount.toString();
        cellData["ColCount"] = this.colCount.toString();
        this.cells.forEach((cell : Cell, key : string) => {
            cellData[key] = cell.getFormulaBarDisplayValue();
        });
        // console.log("celldata elements:");
        // cellData.forEach((element : any) => {
        //     console.log(element[0] + element[1]);
        // });
        for (let i = 0; i < cellData.length; i++) {
            console.log(cellData[i])
        }
        const json = JSON.stringify(cellData);
        // console.log(json);
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
    
    /**
     * Load the spreadsheet from a file to cells dict
     */
    public loadSpreadsheet(): void { 
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
                        newCell = new Cell(element[0], "");
                        this.cells.set(element[0], newCell);
                        newCell.setCellValue(element[1])
                    }
                });
            }
        };
        input.click();
        this.notifyObservers();
    }

    /**
     * Return Cell object at key position
     * @param key index of Cell
     * @returns Cell
     */
    private getCellAtKeyIfExists(key : string) : Cell | undefined {
        return this.cells.get(key);
    }
    
    /**
     * Return Cell object at key position, creating it if it does not exist
     * @param key index of Cell
     * @returns Cell
     */
    public getCellAtKey(key : string) : Cell {
        let cell : Cell = this.cells.get(key)!;

        if (cell === undefined) {
            cell = new Cell(key, "")
            this.cells.set(key, cell);
        }
        return cell;
    }

    /**
     * Return Cell object at key position, creating it if it does not exist
     * @param key index of Cell
     * @returns Cell
     */
    public getCellsGivenRange(startKey : string, endKey : string, leftToRight : boolean=true) : Cell[] {
        let startRowIndex = KeyHelper.getIndexOfRowFromKey(startKey);
        let startColIndex = KeyHelper.getIndexOfColFromKey(startKey);
        let endRowIndex = KeyHelper.getIndexOfRowFromKey(endKey);
        let endColIndex = KeyHelper.getIndexOfColFromKey(endKey);
        let cells : Cell[] = [];
        for (let row = startRowIndex; row <= endRowIndex; row++) {
            for (let col = startColIndex; col <= endColIndex; col++) {
                let key : string = KeyHelper.createKeyFromIndeces(col, row); // KeyHelper.getColKeyFromIndex(j) + KeyHelper.getRowKeyFromIndex(i);
                let cell : Cell | undefined = this.getCellAtKeyIfExists(key);
                if (cell !== undefined) {
                    cells.push(cell);
                } 
            }
        }

        if (leftToRight) {
            return cells;
        }
        return cells.reverse();
    }

    /**
     * Clear cell at key position
     * @param key position of cell
     */
    public clearCell(key : string) {
        let cell : Cell | undefined = this.getCellAtKeyIfExists(key);
        if (cell !== undefined) {
            cell.clearCell();
            this.notifyObservers();
        } 
    }

    /**
     * Set the cell at key position to the given value
     * @param key position of cell
     * @param value value to set cell to (from user)
     */
    public setCellAtKeyGivenInput(key : string, userInput : string) : void {
        let cell : Cell = this.getCellAtKey(key);
        cell.setCellValue(userInput);
        this.notifyObservers();
    }

    /**
     * Get display value of cell at key position
     * The display value is post-formula evaluation
     * @param key position of cell
     * @returns display value of cell
     */
    public getCellAtKeyDisplay(key : string) : string {
        let cell : Cell = this.getCellAtKey(key);
        if (cell !== undefined) {
            return cell.getDisplayValue();
        } 
        return "";
    }

    /**
     * Get formula bar value of cell at key position
     * The formula bar value is pre-formula evaluation
     * @param key position of cell
     * @returns formula bar value of cell
     */
    public getCellAtKeyFormulaBarDisplay(key : string) : string {
        let cell : Cell = this.getCellAtKey(key);
        if (cell !== undefined) {
            return cell.getFormulaBarDisplayValue();
        } 
        return "";
    }

    /**
     * Delete a given cell
     * @param cell cell to be deleted
     */
    private deleteCell(cell : Cell) : void {
        let oldKey : string = cell.getKey()
        cell.deleteCell();
        this.cells.delete(oldKey);
    }

    /**
     * Convert the spreadsheet into a string
     * @returns string representation of spreadsheet
     */
    public spreadsheetAsString() : string {
        let orderedCells : Cell[] = this.getCellsGivenRange("A1", 
                                                            KeyHelper.createKeyFromIndeces(this.colCount-1, this.rowCount-1),//KeyHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
                                                            true)
        let outputString : string = ""
        for (let i = 0; i < orderedCells.length; i++) {
            outputString += orderedCells[i].getKey() + " : " + orderedCells[i].getDisplayValue() + "\n"
        }
        return outputString
    }
}
