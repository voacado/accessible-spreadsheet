import { Cell } from "../Cell";

export class CellReference {
    private referencedCell : Cell;

    constructor(referencedCell : Cell) {
        this.referencedCell = referencedCell;
    }

    public getValue() : number | string {
        return this.referencedCell.getCellValue().getValue();
    }
    public display() : string {
        return this.referencedCell.getCellValue().display();
    }
    public formulaBarDisplay() : string {
        return "=" + this.referencedCell.getKey();
    }
    public updateValue() : void {
        this.referencedCell.updateCellValue();
    }
}