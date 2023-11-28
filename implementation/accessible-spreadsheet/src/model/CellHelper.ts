import { Cell } from "./Cell";
import { IValue } from "./values/IValue";
import { EmptyValue } from "./values/EmptyValue";
import { NumberValue } from "./values/NumberValue";
import { StringValue } from "./values/StringValue";
import { FormulaValue } from "./values/FormulaValue";
import { CellReference } from "./values/CellReference";
import { MultiCellReference } from "./values/MultiCellReference";

export class CellHelper {

    public static inputIsEmpty(input : string) : boolean {
        return input === "" || input === undefined || input === null;
    }

    public static inputIsNumber(input : string) : boolean {
        return !isNaN(Number(input));
    }

    public static inputIsCellReference(input : string) : boolean {
        if (!input.startsWith("=")) {
            return false
        }
        return false // TODO
    }

    public static inputIsMultiCellReference(input : string) : boolean {
        if (!input.startsWith("=")) {
            return false
        }
        let [pieces] : string[] = input.split(":")
        if (pieces.length != 2) {
            return false
        }

        return false // TODO
    }

    public static inputIsFormula(input : string) : boolean {
        return input.startsWith("=") && !(CellHelper.inputIsMultiCellReference(input) || CellHelper.inputIsCellReference(input));
    }

    public static getValueFromUserInput(input : string) : IValue {
        if (CellHelper.inputIsEmpty(input)) {
            return new EmptyValue();
        }
        else if (CellHelper.inputIsNumber(input)) {
            return new NumberValue(Number(input));
        }
        else if (CellHelper.inputIsFormula(input)) {
            return new FormulaValue(input);
        } else {
            return new StringValue(input);
        }
    }

    /*public static getCellReferenceRange(cells : Cell[][], ) : Cell {

    }*/
}