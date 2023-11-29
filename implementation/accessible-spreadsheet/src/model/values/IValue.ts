export interface IValue {
    getValue() : number | string;
    display() : string;
    formulaBarDisplay() : string;
    updateValue() : void;
}