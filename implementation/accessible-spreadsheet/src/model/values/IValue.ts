export interface IValue {
    getValue() : number | string;
    display() : string;
    updateValue() : void;
}