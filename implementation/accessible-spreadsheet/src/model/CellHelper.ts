import { Cell } from "./Cell";
import { IValue } from "./values/IValue";
import { EmptyValue } from "./values/EmptyValue";
import { NumberValue } from "./values/NumberValue";
import { StringValue } from "./values/StringValue";
import { FormulaValue } from "./values/FormulaValue";
import { CellReference } from "./values/CellReference";
import { MultiCellReference } from "./values/MultiCellReference";
import { Spreadsheet } from "./Spreadsheet";

export class CellHelper {

    public static inputIsEmpty(input : string) : boolean {
        return input === "" || input === undefined || input === null;
    }

    public static inputIsNumber(input : string) : boolean {
        return !isNaN(Number(input));
    }

    public static stringIsValidKey(input : string) : boolean {
        let validLetters : string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
                                        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
                                        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let validDigits : string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        
        if (input.length < 1 || !(validLetters.includes(input.charAt(0)))) {
            return false
        }

        for (let i = 0; i < input.length; i++) {
            if (validLetters.includes(input.charAt(i))) {
                continue
            }
            if (validDigits.includes(input.charAt(i))) {
                for (let j = i+1; j < input.length; j++) {
                    if (validLetters.includes(input.charAt(j))) {
                        return false
                    }
                    if (validDigits.includes(input.charAt(j))) {
                        continue
                    }
                    return false
                }
                return true
            }
            return false
        }
        return false
    }

    public static inputIsCellReference(input : string) : boolean {
        return input.startsWith("=") && CellHelper.stringIsValidKey(input.substring(1))
    }

    public static inputIsMultiCellReference(input : string) : boolean {
        if (!input.startsWith("=")) {
            return false
        }
        let pieces : string[] = input.substring(1).split(":")
        if (pieces.length != 2) {
            return false
        }
        if (!CellHelper.stringIsValidKey(pieces[0]) || !CellHelper.stringIsValidKey(pieces[1])) {
            return false
        }

        return true
    }

    public static inputIsFormula(input : string) : boolean {
        return input.startsWith("=") && !(CellHelper.inputIsMultiCellReference(input) || CellHelper.inputIsCellReference(input));
    }

    public static getValueFromUserInput(input : string, spreadsheet : Spreadsheet) : IValue {
        if (CellHelper.inputIsEmpty(input)) {
            return new EmptyValue();
        }
        else if (CellHelper.inputIsNumber(input)) {
            return new NumberValue(Number(input));
        }
        else if (CellHelper.inputIsFormula(input)) {
            return new FormulaValue(input);
        } 
        else if (CellHelper.inputIsCellReference(input)) {
            return new CellReference(spreadsheet.getCellAtKey(input.substring(1)))
        } 
        // else if (CellHelper.inputIsMultiCellReference(input)) {
        //     return new MultiCellReference()
        // }
        else {
            return new StringValue(input);
        } 
    }

    /*public static getCellReferenceRange(cells : Cell[][], ) : Cell {

    }*/
}