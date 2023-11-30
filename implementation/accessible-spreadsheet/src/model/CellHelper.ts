import { Cell } from "./Cell";
// import { IValue } from "./values/IValue";
// import { EmptyValue } from "./values/EmptyValue";
// import { NumberValue } from "./values/NumberValue";
// import { StringValue } from "./values/StringValue";
// import { FormulaValue } from "./values/FormulaValue";
// import { CellReference } from "./values/CellReference";
// import { MultiCellReference } from "./values/MultiCellReference";
import { Spreadsheet } from "./Spreadsheet";
import { hasUncaughtExceptionCaptureCallback } from "process";
import { instanceOf } from "prop-types";

/**
 * USER INPUT RULES: 
 * Strings must be fully encapsulated by quotation marks. Single quotation marks will raise errors.
 * Parenthesis must be opened and closed fully. Invalid parenthesis will raise errors.
 * Forumulas must use the exact spelling and casing as shown.
 * Formula arguments must be fully encapsulated by parentheses. Multiple arguments must be separated by commas.
 * 
 * A range is denoted as "key..key", without quotation marks, where key is any cell's key.
 * Key example: C3
 * Range example: A1:B2
 * 
 * FORMULAS:
 * REF                          {key}
 * RANGE                        {range}
 * SUM or TOTAL                 {range or multi}
 * AVERAGE or MEAN              {range or multi}
 * MAX or MAXIMUM               {range or multi}
 * MIN or MINIMUM               {range or multi}
 * 
 * // todo: COUNT()                     {range or multi}
 * = 1 + 2 * 2 - 4 / 8          ARITHMETIC
 */


// CellHelper is a class of static helper methods for Cells and the Spreadsheet.
export class CellHelper {
    // Returns whether a given input is empty, null, or undefined.
    public static inputIsEmpty(input : string) : boolean {
        return input === "" || input === undefined || input === null;
    }

    // Returns whether a given input is a valid Number
    public static inputIsNumber(input : string) : boolean {
        return !isNaN(Number(input));
    }

    // Returns whether a given input is comprised entirely of letters, uppercase or lowercase.
    public static inputIsLettersOnly(input : string) : boolean {
        let validLetters : string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
                                        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
                                        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
                                        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                                        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                                        's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        for (let i : number = 0; i < input.length; i++) {
            if (!validLetters.includes(input.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    // Returns whether a given input is a valid key for a cell position. I.E., a series of letters then numbers.
    public static stringIsValidKey(input : string) : boolean {
        let validLetters : string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
                                        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
                                        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let validDigits : string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        // Given input too short or does not start with a letter character - invalid string
        if (input.length < 1 || !(validLetters.includes(input.charAt(0)))) {
            return false
        }
        // Check each character of the given input
        for (let i = 0; i < input.length; i++) {
            // Found letter character before any non-letter characters, continue
            if (validLetters.includes(input.charAt(i))) {
                continue
            }
            // Reached first digit character, change logic for subsequent characters
            if (validDigits.includes(input.charAt(i))) {
                for (let j = i+1; j < input.length; j++) {
                    if (validLetters.includes(input.charAt(j))) {
                        // Found letter character after digit character - invalid key
                        return false
                    }
                    if (validDigits.includes(input.charAt(j))) {
                        // Found digit character after digits, continue
                        continue
                    }
                    // Found non-letter, non-digit character - invalid key
                    return false
                }
                // Reached end of given input with no issues found - valid key
                return true
            }
            // Found a non-digit character after letter characters - invalid key
            return false
        }
        // Empty string - invalid key
        return false
    }

    // public static inputIsCellReference(input : string) : boolean {
    //     return input.startsWith("=") && CellHelper.stringIsValidKey(input.substring(1))
    // }

    // public static inputIsMultiCellReference(input : string) : boolean {
    //     if (!input.startsWith("=")) {
    //         return false
    //     }
    //     let pieces : string[] = input.substring(1).split(":")
    //     if (pieces.length != 2) {
    //         return false
    //     }
    //     if (!CellHelper.stringIsValidKey(pieces[0]) || !CellHelper.stringIsValidKey(pieces[1])) {
    //         return false
    //     }
    //     return true
    // }

    // Returns whether a given input is a correctly formatted cell rage
    public static inputIsCellRange(input : string) : boolean {
        let pieces : string[] = input.substring(1).split("..")
        if (pieces.length != 2) {
            return false
        }
        if (!CellHelper.stringIsValidKey(pieces[0]) || !CellHelper.stringIsValidKey(pieces[1])) {
            return false
        }
        return true
    }

    // Returns the two keys in a given cell range. For example, returns ["A1", "B2"] when given "A1..B2"
    public static getKeysFromCellRangeInput(input : string) : [string, string] {
        if (!CellHelper.inputIsCellRange(input)) {
            // Invalid cell range given, return two empty strings
            return ["", ""];
        }
        return [input.substring(1).split("..")[0], input.substring(1).split("..")[1]];
    }

    // Returns whether or not a given string properly opens and closes any parenthesis
    public static parenthesisCheck(formula : string) {
        let unclosedParenthesisCount = 0;
        for (let i = 0; i < formula.length; i++) {
            if (formula.charAt(i) == "(") {
                unclosedParenthesisCount++;
            }
            if (formula.charAt(i) == ")") {
                if (unclosedParenthesisCount < 1) {
                    return false;
                }
                unclosedParenthesisCount--;
            }
        }
        return unclosedParenthesisCount == 0
    }

    // Returns the first open parenthesis' "group", until the first parenthesis is closed
    public static getParenthesisGroup(input: string) : string {
        let unclosedParenthesisCount = 1;
        let endIndex = 0;
        while (unclosedParenthesisCount > 0) {
            let j : number = 1;
            if (input.substring(j).length > 0 ) {
                while (unclosedParenthesisCount > 0 && input.length > j) {
                    if (input.charAt(j) == "(") {
                        unclosedParenthesisCount++;
                    }
                    if (input.charAt(j) == ")") {
                        unclosedParenthesisCount--;
                    }
                    j++;
                }
            }
            if (unclosedParenthesisCount > 0) {
                throw new Error(unclosedParenthesisCount + " unclosed parenthesis found when doing CellHelper.getParenthesisGroup()");
            }
            endIndex = 0 + j;
        }
        return input.substring(0, endIndex);
    }
    
    // Given an input and a Cell, create // todo

    // Given an input, return the display value (after formulas, cell references, or other calculations) and a list of keys the Cell observes.
    public static getValueFromUserInput(input : string, spreadsheet : Spreadsheet) : [string, string[]] {
        if (CellHelper.inputIsEmpty(input)) {
            return ["", []];
        }
        let processedData = CellHelper.processInputString(input, spreadsheet, []);

        if (processedData[0].length > 1) {
            throw new Error("CellHelper getValueFromUserInput processInputString returned multiple values");
        }
        let displayValue = processedData[0][0]
        let observees = processedData[1]
        return [displayValue, observees];
    }












    /** 
     * Processes a cell's input string. 
     * Parameters: the cell's input, the spreadsheet of the cell, and known keys the cell observes.
     * 
     * Returns a list of elements representing information retrieved from parsing input. 
     * First element: a list of elements to be processed. 
     * Second element: a list of keys that this cell is observing. 
    */
    public static processInputString(input : string, spreadsheet : Spreadsheet, knownObservees : string[]) : [string[], string[]] {
        let functionFormula : string[] = ["REF", "RANGE", "SUM", "AVERAGE", "MEAN", "TOTAL", "MAX", "MAXIMUM", "MIN", "MINIMUM"]
        let operationFormula : string[] = ["+", "-", "*", "/", "%", "^", ".."]
        let parsedList : string[] = [];
        if (input.includes(",") && !input.includes("(") && !input.includes("\"")) {
            return [[input], knownObservees];
        }
        // Check each index
        for (let i : number = 0; i < input.length; i++) {
            // Empty Space
            if (input.charAt(i) == " ") {
                continue;
            }
            // Quotation Mark
            if (input.charAt(i) == "\"") {
                if (input.substring(i+1).length < 1 || !input.substring(i+1).includes("\"")) {
                    throw new Error("UNCLOSED QUOTATION MARK"); // TODO 
                }
                parsedList.push(input.substring(i, i+2+input.substring(i+1).indexOf("\"")));
                i += input.substring(i, i+2+input.substring(i+1).indexOf("\"")).length - 1
                continue;
            }
            // Closed Parenthesis
            if (input.charAt(i) == ")") {
                throw new Error("SINGLE CLOSED PARENTHESIS FOUND");
            }
            // Open Parenthesis
            if (input.charAt(i) == "(") {
                let parenthesisGroup = CellHelper.getParenthesisGroup(input.substring(i))
                parsedList.push(parenthesisGroup);
                i += parenthesisGroup.length - 1
                continue;
            }
            // Number 
            if (CellHelper.inputIsNumber(input.charAt(i))) {
                let j : number = 0;
                while (input.length >= i + j + 1 && CellHelper.inputIsNumber(input.substring(i, i+j+1))) {
                    j++;
                }
                parsedList.push(Number(input.substring(i, i + j)).toString())
                i += j - 1
                continue;
            }
            // Operation formula
            for (let j : number = 0; i + j <= input.length; j++) {
                if (input.length > i + j && operationFormula.includes(input.substring(i, i + j))) {
                    parsedList.push(input.substring(i, i + j));
                    i += j - 1
                    continue;
                }
            }
            // Function formula
            for (let j : number = 1; i + j < input.length; j++) {
                if (input.length > i + j && functionFormula.includes(input.substring(i, i + j))) {
                    let functionName : string = input.substring(i, i + j)
                    if (input.length <= i + j + 1) {
                        throw new Error("Function not given arguments! ");
                    }
                    if (input.substring(i + j).charAt(0) != "(") {
                        throw new Error("Function not given parenthesis for arguments!");
                    }
                    let parenthesisGroup = CellHelper.getParenthesisGroup(input.substring(i+j))
                    // REF
                    if (functionName == "REF") {
                        let parameter = CellHelper.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        if (!CellHelper.stringIsValidKey(parameter.toString())) {
                            throw new Error("REF given invalid key!");
                        }
                        parsedList.push(spreadsheet.getCellAtKeyDisplay(parameter.toString()))
                        knownObservees.push(parameter.toString())
                        i += functionName.length + parenthesisGroup.length - 1
                        break;
                    }
                    // AVERAGE or MEAN
                    if (functionName == "AVERAGE" || functionName == "MEAN") {
                        let processed = CellHelper.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        let parameters = processed[0].replace(" ", "");
                        let elements = parameters.split(",")
                        let runningSum : number = 0;
                        let numberCount : number = 0;
                        elements.forEach(function (element) {
                            if (element != "" && Number(element) != undefined && !isNaN(Number(element))) {
                                runningSum += Number(element)
                                numberCount++;
                            }
                        });
                        parsedList.push((runningSum / numberCount).toString());
                        i += functionName.length + parenthesisGroup.length - 1
                        break;
                    }
                    // SUM or TOTAL 
                    if (functionName == "SUM" || functionName == "TOTAL") {
                        let processed = CellHelper.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        let parameters = processed[0].replace(" ", "");
                        let elements = parameters.split(",")
                        let runningSum : number = 0;
                        elements.forEach(function (element) {
                            runningSum += Number(element)
                        });
                        parsedList.push((runningSum).toString());
                        i += functionName.length + parenthesisGroup.length - 1
                        break;
                    }
                    // RANGE
                    if (functionName == "RANGE") {
                        let processed = CellHelper.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        let parameters = processed[0].replace(" ", "");
                        let elements = parameters.split(",")
                        if (elements.length < 1) {
                            throw new Error("Range given no arguments");
                        }
                        let highestValue : number = Number(elements[0]);
                        let lowestValue : number = Number(elements[0]);
                        elements.forEach(function (element) {
                            if (element != "" && Number(element) != undefined && !isNaN(Number(element))) {
                                if (highestValue < Number(element)) {
                                    highestValue = Number(element)
                                }
                                if (lowestValue > Number(element)) {
                                    lowestValue = Number(element)
                                }
                            }
                        });
                        parsedList.push((highestValue - lowestValue).toString());
                        i += functionName.length + parenthesisGroup.length - 1
                        break;
                    }
                    // MAX or MAXIMUM
                    if (functionName == "MAX" || functionName == "MAXIMUM") {
                        let processed = CellHelper.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        let parameters = processed[0].replace(" ", "");
                        let elements = parameters.split(",")
                        if (elements.length < 1) {
                            throw new Error("Maximum given no arguments");
                        }
                        let highestValue : number = Number(elements[0]);
                        elements.forEach(function (element) {
                            if (element != "" && Number(element) != undefined && !isNaN(Number(element))) {
                                if (highestValue < Number(element)) {
                                    highestValue = Number(element)
                                }
                            }
                        });
                        parsedList.push((highestValue).toString());
                        i += functionName.length + parenthesisGroup.length - 1
                        break;
                    }
                    // MIN or MINIMUM
                    if (functionName == "MIN" || functionName == "MINIMUM") {
                        let processed = CellHelper.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        let parameters = processed[0].replace(" ", "");
                        let elements = parameters.split(",")
                        if (elements.length < 1) {
                            throw new Error("Minumum given no arguments");
                        }
                        let lowestValue : number = Number(elements[0]);
                        elements.forEach(function (element) {
                            if (element != "" && Number(element) != undefined && !isNaN(Number(element))) {
                                if (lowestValue > Number(element)) {
                                    lowestValue = Number(element)
                                }
                            }
                        });
                        parsedList.push((lowestValue).toString());
                        i += functionName.length + parenthesisGroup.length - 1
                        break;
                    }
                }
            }
            // Check for Cell Key 
            for (let j : number = 1; i + j <= input.length; j++) {
                if (input.length >= i + j && CellHelper.stringIsValidKey(input.substring(i, i + j))) {
                    parsedList.push(input.substring(i, i+j));
                    i += j - 1;
                    break;
                }
            }
        }
        // console.log("each element in parsedList:")
        // parsedList.forEach(function (element) {
        //     console.log(element);
        // });

        /** orderOfOperation:
        *   0 = +, -
        *   1 = *, /, %
        *   2 = ^
        */
        let orderOfOperation : number = 0;
        // Check each element of the parsed list
        let ITERATIONS = 0
        while (parsedList.length > 1 || (parsedList.length == 1 && parsedList[0].includes("("))) {
            ITERATIONS++
            if (ITERATIONS > 999999) {
                console.log("999999 ITERATIONS REACHED")
                break
            }if (parsedList.includes("^")) {
                orderOfOperation = 2;
            }
            else if (parsedList.includes("*") || parsedList.includes("/") || parsedList.includes("%")) {
                orderOfOperation = 1;
            }
            else {
                orderOfOperation = 0;
            }
            for (let i : number = 0; i < parsedList.length; i++) {
                // Empty Item
                // if (parsedList[i] == undefined || parsedList[i] == null || parsedList[i] == "" || parsedList[i] == " ") {
                //     parsedList.splice(i, 1);
                //     break;
                // }
                // Operations
                if (operationFormula.includes(parsedList[i])) {
                    if (i == parsedList.length -1 || i == 0) {
                        throw new Error("operationFormula error");
                    }
                    if (["+", "-"].includes(parsedList[i]) && orderOfOperation > 0 || ["*", "/", "%"].includes(parsedList[i]) && orderOfOperation > 1) {
                        i++;
                        continue; 
                    }
                    let firstOperand : string = parsedList[i-1]
                    let secondOperand : string = parsedList[i+1]
                    if (parsedList[i] == "..") {
                        let values = ""
                        let cellsInRange = spreadsheet.getCellsGivenRange(firstOperand, secondOperand)
                        cellsInRange.forEach(function (cell) {
                            knownObservees.push(cell.getKey())
                            values += cell.getDisplayValue() + ","
                        });
                        if (cellsInRange.length > 1) {
                            values = values.substring(0, values.length-1)
                        }
                        parsedList.splice(i-1, 3);
                        parsedList.splice(i-1, 0, values);
                        break
                    }
                    secondOperand = CellHelper.processInputString(parsedList[i+1], spreadsheet, knownObservees)[0][0]
                    let newItem : string = "ERR"
                    if (parsedList[i] == "+") {
                        if (firstOperand.length > 1 && secondOperand.length > 1 
                            && firstOperand.charAt(0) == "\"" && firstOperand.charAt(firstOperand.length-1) == "\""
                            && secondOperand.charAt(0) == "\"" && secondOperand.charAt(secondOperand.length-1) == "\"") {
                                newItem = firstOperand.substring(0, firstOperand.length-1) + secondOperand.substring(1, secondOperand.length)
                        } else {
                            newItem = (Number(firstOperand) + Number(secondOperand)).toString();
                        }
                    }
                    if (parsedList[i] == "-") {
                        newItem = (Number(firstOperand) - Number(secondOperand)).toString();
                    }
                    if (parsedList[i] == "*") {
                        newItem = (Number(firstOperand) * Number(secondOperand)).toString();
                    }
                    if (parsedList[i] == "/") {
                        newItem = (Number(firstOperand) / Number(secondOperand)).toString();
                    }
                    if (parsedList[i] == "%") {
                        newItem = (Number(firstOperand) % Number(secondOperand)).toString();
                    }
                    if (parsedList[i] == "^") {
                        newItem = (Number(firstOperand) ** Number(secondOperand)).toString();
                    }
                    parsedList.splice(i-1, 3, newItem);
                    break;
                }
                // Functions/Formulas
                else if (functionFormula.includes(parsedList[i])) {
                    if (i + 1 > parsedList.length) {
                        throw new Error("Function not given arguments!");
                    }
                    if (parsedList[i+1].charAt(0) != "(") {
                        throw new Error("Function not given parenthesis for arguments!");
                    }
                    if (parsedList[i+1].charAt(parsedList[i+1].length-1) != ")") {
                        throw new Error("Function missing end parenthesis!");
                    }
                    if (parsedList[i] == "REF") {
                        let parameter = CellHelper.processInputString(parsedList[i+1].substring(1,parsedList[i+1].length-1), spreadsheet, knownObservees)[0][0];
                        if (!CellHelper.stringIsValidKey(parameter.toString())) {
                            throw new Error("REF given invalid key!");
                        }
                        parsedList.splice(i, 2, "50");
                        break;
                    }
                }
                // Parenthesis
                if (parsedList[i].charAt(0) == "(") {
                    if (parsedList[i].length < 2 || !parsedList[i].includes(")")) {
                        throw new Error("Open parenthesis left unclosed!");
                    }

                    let parenthesisGroup = CellHelper.getParenthesisGroup(parsedList[i])
                    let parenReturn : string[] = CellHelper.processInputString(parenthesisGroup.substring(1, parenthesisGroup.length-1), spreadsheet, knownObservees)[0]
                    if (parsedList.length > parenthesisGroup.length) {
                        parsedList.splice(i+1, 0, parsedList[i].substring(parenthesisGroup.length, parsedList[i].length))
                    }
                    parsedList.splice(i, 1);
                    let j : number = 0;
                    parenReturn.forEach(function (element) {
                        parsedList.splice(i+j, 0, element);
                        j++;
                        return;
                    });
                    break;
                }
            }
            
        }

        // console.log("End result, elements in ParsedList:")
        // parsedList.forEach(function (element) {
        //     console.log(element);
        //     return;
        // });
        return [parsedList, knownObservees];
    }
}
