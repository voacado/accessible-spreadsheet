import { Cell } from "./Cell";
import { IValue } from "./values/IValue";
import { EmptyValue } from "./values/EmptyValue";
import { NumberValue } from "./values/NumberValue";
import { StringValue } from "./values/StringValue";
import { FormulaValue } from "./values/FormulaValue";
import { CellReference } from "./values/CellReference";
import { MultiCellReference } from "./values/MultiCellReference";

export class CellHelper {
    public static setCellValue(cell : Cell, input : string) : void {
        if (CellHelper.inputIsEmpty(input)) {
            cell.setCellValue(new EmptyValue());
        }
        else if (CellHelper.inputIsNumber(input)) {
            cell.setCellValue(new NumberValue(Number(input)));
        }
        else if (CellHelper.inputIsFormula(input)) {
            cell.setCellValue(new FormulaValue(input));
        } else {
            cell.setCellValue(new StringValue(input));
        }
    }

    public static inputIsEmpty(input : string) : boolean {
        return input === "" || input === undefined || input === null;
    }

    public static inputIsNumber(input : string) : boolean {
        return !isNaN(Number(input));
    }

    public static inputIsFormula(input : string) : boolean {
        return input.startsWith("=");
    }

    /*public static getCellReferenceRange(cells : Cell[][], ) : Cell {

    }*/
}