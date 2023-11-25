import { Cell } from "./Cell";

export class Spreadsheet {
    // private configuration : Configuration;
    private cells : Cell[][] = [[]];
    // private cells = new Map<string, Map<string, Cell>>();
    // private cells = new Map<string, Map<string, Cell>>();
    // private textReader : TextReader;

    constructor() { 
        this.initialize();
        // TODO: Implement
    }

    private initialize() : void {
        // TODO: Implement
    }
    
    public addRow(index : number) : void {
        if (index < 0) {
            throw new Error("ERROR: Spreadsheet.addRow() given negative index.");
        }
        if (index > this.cells.length) {
            throw new Error("ERROR: Spreadsheet.addRow() given index greater than this.cells.length.");
        }
        const newColumn : Cell[] = [];
        for (let i = 0; i < this.cells[index].length; i++) {
            newColumn.push(new Cell(index, i));
            // this.cells.splice(index, 0, new Cell(index, i));
            // this.cells[index].splice(i, 0, new Cell(index, i));
        }
        this.cells.splice(index, 0, newColumn);
        // TODO: Implement
    }
    
    public addColumn(index : number) : void {
        if (index < 0) {
            throw new Error("ERROR: Spreadsheet.addColumn() given negative index.");
        }
        for (let i = 0; i < this.cells.length; i++) {
            if (index > this.cells[i].length) {
                throw new Error("ERROR: Spreadsheet.addColumn() given index greater than this.cells[i].length.");
            }
            this.cells[i].splice(index, 0, new Cell(i, index));
        }
        // TODO: Implement
    }
    
    public removeRow() : void {
        // TODO: Implement
    }
    
    public removeColumn() : void {
        // TODO: Implement
    }
    
    public clearRow(index : number) : void {
        for (let i = 0; i < this.cells[index].length; i++) {
            this.cells[index][i].clearCell();
        }
    }
    
    public clearColumn(index : number) : void {
        for (let i = 0; i < this.cells[index].length; i++) {
            this.cells[i][index].clearCell();
        }
    }
    
    public getCellAt(row : number, column : number) : Cell {
        if (row < 0 || column < 0) {
            throw new Error("ERROR: Spreadsheet.getCellAt() given negative row or column.");
        }
        if (row >= this.cells.length) {
            throw new Error("ERROR: Spreadsheet.getCellAt() given row greater than this.cells.length.");
        }
        if (column >= this.cells[row].length) {
            throw new Error("ERROR: Spreadsheet.getCellAt() given column greater than this.cells[row].length.");
        }
        return this.cells[row][column];
    }
    
    public saveSpreadsheet(filename : string) : void {
        // TODO: Implement
    }
    
    public loadSpreadsheet(filename : string) : void {
        // TODO: Implement
    }
    
    // public getTextReader() : TextReader {
        // TODO: Implement
    // }
}