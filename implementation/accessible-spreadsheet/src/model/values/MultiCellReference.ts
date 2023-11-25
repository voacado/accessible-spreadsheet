import { CellReference } from "./CellReference";

export class MultiCellReference {
    private referencedCells : CellReference[] = [];
    private operation : string;

    constructor(referencedCells : CellReference[], operation : string) {
        this.referencedCells = referencedCells;
        this.operation = operation;
    }

    public getValue() : number | string {
        // TODO: Implement
        throw new Error("MultiCellReference.getValue() not implemented");
    }
    public display() : string {
        // TODO: Implement
        throw new Error("MultiCellReference.display() not implemented");
    }
    public updateValue() : void {
        // TODO: Implement
        throw new Error("MultiCellReference.updateValue() not implemented");
    }
}