export class NumberValue {
    private value : number;

    constructor(value : number) {
        this.value = value;
    }

    public getValue() : number | string {
        return this.value;
    }
    public display() : string {
        return this.value.toString();
    }
    public formulaBarDisplay() : string {
        return this.display();
    }
    public updateValue() : void {
        // Do nothing
    }
}