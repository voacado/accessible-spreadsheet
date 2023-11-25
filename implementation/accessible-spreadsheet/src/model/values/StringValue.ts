export class StringValue {
    private value : string;

    constructor(value : string) {
        this.value = value;
    }

    public getValue() : number | string {
        return this.value;
    }
    public display() : string {
        return this.value;
    }
    public updateValue() : void {
        // Do nothing
    }
}