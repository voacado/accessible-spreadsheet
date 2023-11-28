import { IValue } from "./values/IValue";
import { EmptyValue } from "./values/EmptyValue";
import { NumberValue } from "./values/NumberValue";
import { StringValue } from "./values/StringValue";
import { FormulaValue } from "./values/FormulaValue";
import { CellReference } from "./values/CellReference";
import { MultiCellReference } from "./values/MultiCellReference";

export class Cell {
    private key : string;
    // private row = -1;
    // private column = -1;
    private value : IValue = new EmptyValue();
    private observers : Cell[] = [];

    constructor(key : string, value : IValue) {
        // row : number, column : number,
        // this.row = row;
        // this.column = column;
        this.key = key;
        this.value = value
        // this.observers = [];
    }

    // public setPosition(row : number, column : number) : void {
    //     this.row = row;
    //     this.column = column;
    // }

    public getKey() : string {
        console.log("Cell.getKey() returning " + this.key);
        return this.key;
    }

    public setKey(key : string) : void {
        this.key = key;
    }

    public clearCell() : void {
        this.value = new EmptyValue();
    }
    
    public getCellValue() : IValue {
        return this.value;
    }
    
    public setCellValue(givenValue : IValue) : void {
        this.value = givenValue;
        this.updateObservers();
    }
    
    public updateCellValue() : void {
        this.value.updateValue();
    }
    
    public addObserver(observer : Cell) : void {
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
    
    private updateObservers() : void {
        for (let observer of this.observers) {
            observer.updateCellValue();
        }
    }

    public deleteCell() : void {
        for (let observer of this.observers) {
            observer.updateCellValue(); // TODO: ORDER
        }
    }
}
