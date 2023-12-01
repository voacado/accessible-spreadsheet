import { Cell } from "./Cell";
import { CellHelper } from "./CellHelper";

const initRowCount = 3
const initColCount = 3

export class Spreadsheet {
    // Dict approach
    private cells = new Map<string, Cell>();
    private rowCount = 0;
    private colCount = 0;

    // Singleton Design Pattern - only one instance of Spreadsheet
    private static instance: Spreadsheet;
    // Observer Design Pattern - observers are notified when spreadsheet changes (like CellGrid)
    private observers: (() => void)[] = [];

    constructor(rowCount :number=initRowCount, colCount : number=initColCount) {
        this.initialize(rowCount, colCount);
    }

    public static getInstance(): Spreadsheet {
        if (!Spreadsheet.instance) {
            Spreadsheet.instance = new Spreadsheet(35, 35);
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
            throw new Error("ERROR: Spreadsheet.addRow() given negative index: " + index.toString());
        }
        if (index > this.rowCount) {
            throw new Error("ERROR: Spreadsheet.addRow() given index greater than rowCount:" + index.toString());
        }

        this.rowCount++;
        let cellsToChange : Cell[] = this.getCellsGivenRange("A" + CellHelper.getRowKeyFromIndex(index), 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
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
            newKey = CellHelper.getColFromKey(oldKey) + CellHelper.getRowKeyFromIndex(CellHelper.getIndexOfRow(CellHelper.getRowFromKey(oldKey)) + 1);
            cellsToChange[i].setKey(newKey);
            this.cells.set(newKey, changingCell);
            this.cells.delete(oldKey);
        }
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        this.notifyObservers();
    }
    
    public addColumn(index : number) : void {
        if (index < 0) {
            throw new Error("ERROR: Spreadsheet.addColumn() given negative index:" + index.toString());
        }
        if (index > this.colCount) {
            throw new Error("ERROR: Spreadsheet.addColumn() given index greater than colCount: " + index.toString());
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
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        this.notifyObservers();
    }
    
    public removeRow(index : number) : void {
        let cellsToRemove : Cell[] = this.getCellsGivenRange("A" + CellHelper.getRowKeyFromIndex(index), 
                                                            CellHelper.getColKeyFromIndex(this.colCount-1) + CellHelper.getRowKeyFromIndex(index),
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
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        for (let i = 0; i < removedCellObservers.length; i++) {
            removedCellObservers[i].updateCellValue();
        }
        this.notifyObservers();
    }
    
    public removeColumn(index : number) : void {
        // Delete all cells in the removed column
        let cellsToRemove : Cell[] = this.getCellsGivenRange(CellHelper.getColKeyFromIndex(index) + "1", 
                                                            CellHelper.getColKeyFromIndex(index) + CellHelper.getRowKeyFromIndex(this.rowCount-1),
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
        for (let i = 0; i < cellsToChange.length; i++) {
            cellsToChange[i].updateObservers();
        }
        for (let i = 0; i < removedCellObservers.length; i++) {
            removedCellObservers[i].updateCellValue();
        }
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
        this.notifyObservers();
    }
    
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
                    if (element[0] === "RowCount") {
                        this.rowCount = Number(element[1]);
                    }
                    else if (element[0] === "ColumnCount") {
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

    private getCellAtKeyIfExists(key : string) : Cell | undefined {
        return this.cells.get(key);
    }
    
    public getCellAtKey(key : string) : Cell {
        let cell : Cell = this.cells.get(key)!;

        if (cell === undefined) {
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
        for (let i = startRowIndex; i <= endRowIndex; i++) {
            for (let j = startColIndex; j <= endColIndex; j++) {
                let key : string = CellHelper.getColKeyFromIndex(j) + CellHelper.getRowKeyFromIndex(i);
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

    public setCellAtKeyGivenInput(key : string, userInput : string) : void {
        let cell : Cell = this.getCellAtKey(key);
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

    private deleteCell(cell : Cell) : void {
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
