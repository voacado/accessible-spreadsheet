import { off } from "process";
import { CellReference } from "./CellReference";
import { MultiCellReference } from "./MultiCellReference";

export class MultiCellReferenceChild {
    private multiReferenceParent : MultiCellReference
    private offset : [number, number]

    constructor(multiReferenceParent : MultiCellReference, offset : [number, number]) {
        this.multiReferenceParent = multiReferenceParent
        this.offset = offset
    }

    public getValue() : number | string {
        // TODO: Implement
        throw new Error("MultiCellReferenceChild.getValue() not implemented");
    }
    public display() : string {
        // TODO: Implement
        throw new Error("MultiCellReferenceChild.display() not implemented");
    }
    public updateValue() : void {
        // TODO: Implement
        throw new Error("MultiCellReferenceChild.updateValue() not implemented");
    }
}