export class FormulaValue {
    private formulaString : string;

    constructor(formulaString : string) {
        this.formulaString = formulaString;
    }

    private CalculateExpression() : number | string {
        // TODO: Implement
        throw new Error("FormulaValue.CalculateExpression() not implemented");
    }
    public getValue() : number | string {
        // TODO: Implement
        throw new Error("FormulaValue.getValue() not implemented");
    }
    public display() : string {
        // TODO: Implement
        throw new Error("FormulaValue.display() not implemented");
    }
    public formulaBarDisplay() : string {
        // TODO: Implement
        throw new Error("FormulaValue.formulaBarDisplay() not implemented");
    }
    public updateValue() : void {
        // TODO: Implement
        throw new Error("FormulaValue.updateValue() not implemented");
    }
}