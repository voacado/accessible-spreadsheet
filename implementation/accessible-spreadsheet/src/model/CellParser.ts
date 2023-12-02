import {Cell} from "./Cell";
import {Spreadsheet} from "./Spreadsheet";
import {KeyHelper} from "./KeyHelper";
import {CellParserHelper} from "./CellParserHelper";

export class CellParser {
    // Given an input, return the display value (after formulas, cell references, or other calculations) and a list of keys the Cell observes.
    public static getValueFromUserInput(input : string, spreadsheet : Spreadsheet) : [string, string[]] {
        // Emprt inputs are valid, but would be removed by the parser, so we return early here.
        if (CellParserHelper.inputIsEmpty(input)) {
            return ["", []];
        }
        // Use the parser to process the input.
        let processedData = CellParser.processInputString(input, spreadsheet, []);
        // If there are multiple tokens after parsing through the input, there is an error.
        if (processedData[0].length > 1) {
            // let errorMsg = "";
            // processedData.forEach(function (element) {
            //     errorMsg += element.toString();
            // });
            throw new Error("#ERR: getValueFromUserInput parser returned mulitple tokens.");
        }
        if (processedData[0].length == 0) {
            throw new Error("#ERR: getValueFromUserInput parser returned no tokens.");
        }
        // Return the final display value and the list of cells to observe.
        let displayValue = processedData[0][0];
        let observees = processedData[1];
        return [displayValue, observees];
    }

    /** 
     * CUSTOM PARSING FUNCTION - RECURSIVE
     * Processes a cell's input string. 
     * Parameters: the cell's input, the spreadsheet of the cell, and known keys the cell observes.
     * 
     * Returns a list of two elements, each of which are lists.
     * First element: a list of tokens that were parsed. The initial call should always return one token.
     * Second element: a list of keys that this cell is observing (observees, not observers).
    */
    public static processInputString(input : string, spreadsheet : Spreadsheet, knownObservees : string[]) : [string[], string[]] {
        let parsedList : string[] = [];

        // If we have recursed into an error, return it as the only oken.
        if (input.length > 4 && input.substring(0, 5) == "#ERR: ") {
            return [[input],[]]
        }
        // Token is a list of numbers, return it as its own token. // TODO ??????????????????????????????????????????????????????????????????????????????????????????????????????????
        if (input.includes(",") && !input.includes("(") && !input.includes("\"")) {
            return [[input], knownObservees];
        }
        let parsed : boolean = false;
        // Check each index of the given input.
        for (let i : number = 0; i < input.length; i++) {
            parsed = false;
            // Empty Space found outside of a string, do not include it in returned tokens.
            if (input.charAt(i) == " ") {
                parsed = true;
                continue;
            }
            // Quotation mark found.
            if (input.charAt(i) == "\"") {
                if (input.substring(i+1).length < 1 || !input.substring(i+1).includes("\"")) {
                    // Quotation mark found with no other quotation mark within its token.
                    parsed = true;
                    return [["#ERR: Unclosed quotation mark."], []]; 
                }
                // Pair of quotation marks found, add the entire string as a token. 
                parsedList.push(input.substring(i, i+2+input.substring(i+1).indexOf("\"")));
                i += input.substring(i, i+2+input.substring(i+1).indexOf("\"")).length - 1
                parsed = true;
                continue;
            }
            // Closed Parenthesis found before open parenthesis.
            if (input.charAt(i) == ")") {
                parsed = true;
                return [["#ERR: Unmatched closed parenthesis."], []];
            }
            // Open Parenthesis found, and matching paired parenthesis exists. Group it as one token.
            if (input.charAt(i) == "(") {
                let parenthesisGroup = CellParserHelper.getParenthesisGroup(input.substring(i))
                // If getParenthesisGroup returns an error, short-circuit return that error as a token.
                if (parenthesisGroup == "#ERR: parenthesis issue.") {
                    return [[parenthesisGroup],[]]
                }
                // Add parenthesis group as a token. 
                parsedList.push(parenthesisGroup);
                i += parenthesisGroup.length - 1
                parsed = true;
                continue;
            }
            // Number found
            if (CellParserHelper.inputIsNumber(input.charAt(i))) {
                // Check subsequent ideces for multi-digit numbers.
                let j : number = 0;
                while (input.length >= i + j + 1 && CellParserHelper.inputIsNumber(input.substring(i, i+j+1))) {
                    j++;
                }
                // Add all digits as a token.
                parsedList.push(Number(input.substring(i, i + j)).toString())
                i += j - 1
                parsed = true;
                continue;
            }
            // Parse subsequent indeces in case of multi-character operation.
            let validOperations : string[] = ["+", "-", "*", "/", "%", "^", ".."]
            for (let j : number = 0; i + j <= input.length; j++) {
                // Operation formula found 
                if (input.length > i + j && validOperations.includes(input.substring(i, i + j))) {
                    // Add whole operation as a token.
                    parsedList.push(input.substring(i, i + j));
                    i += j - 1
                    parsed = true;
                    continue;
                }
            }
            // Parse subsequent indeces for multi-character function.
            let functionFormula : string[] = ["REF", "RANGE", "SUM", "AVERAGE", "AVG", "MEAN", "TOTAL", "MAX", "MAXIMUM", "MIN", "MINIMUM"]
            for (let j : number = 1; i + j < input.length; j++) {
                // Function formula found
                if (input.length > i + j && functionFormula.includes(input.substring(i, i + j))) {
                    let functionName : string = input.substring(i, i + j)
                    // Function missing arguments.
                    if (input.length <= i + j + 1) {
                        parsed = true;
                        return [["#ERR: Function " + functionName + "not given arguments."], []];
                    }
                    // Function missing parenthesis for arguments.
                    if (input.substring(i + j).charAt(0) != "(") {
                        parsed = true;
                        return [["#ERR: Function " + functionName + "not given parenthesis."], []];
                    }
                    // Get arguments from parenthesis group.
                    let parenthesisGroup = CellParserHelper.getParenthesisGroup(input.substring(i+j))
                    // REF
                    if (functionName == "REF") {
                        let parameter = CellParser.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        // Check for paremeter being a valid key.
                        if (!CellParserHelper.stringIsValidKey(parameter.toString())) {
                            parsed = true;
                            return [["#ERR: Invalid key in a cell reference." + parameter.toString()], []];
                        }
                        // If given a valid paremeter, retrieve the Cell at that key.
                        let key = parameter.toString()
                        // Add that cell's value as a token. 
                        parsedList.push(spreadsheet.getCellAtKeyDisplay(key))
                        knownObservees.push(key)
                        i += functionName.length + parenthesisGroup.length - 1
                        parsed = true;
                        break;
                    }
                    // If we encountered an average or sum function, find the sum first.
                    let averageOrSum = ["AVERAGE", "MEAN", "AVG", "SUM", "TOTAL"]
                    if (averageOrSum.includes(functionName)) {
                        // Split given paremeters. Function expects numbers separated by commas.
                        let processed = CellParser.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        // Remove empty space between arguments
                        let parameters = processed[0].replace(" ", "");
                        // Retrieve individual arguments as elements
                        let elements = parameters.split(",")
                        let runningSum : number = 0;
                        let numberCount : number = 0;
                        // Calculate Sum 
                        elements.forEach(function (element) {
                            // If arguments contained an invalid element, set runningSum to NaN.
                            if (Number(element) == undefined || !CellParserHelper.inputIsNumber(element)) {
                                runningSum = NaN;
                                return;
                            }
                            if (element != "" && Number(element) != undefined && CellParserHelper.inputIsNumber(element)) {
                                runningSum += Number(element)
                                numberCount++;
                            }
                        });
                        // If runningSum returned NaN, return error token.
                        if (isNaN(runningSum)) {
                            return [["#ERR: " + functionName + " given invalid argument."],[]]
                        }
                        // If the function is a sum or total, add the sum as a token.
                        if (functionName == "SUM" || functionName == "TOTAL") {
                            parsedList.push((runningSum).toString());
                            i += functionName.length + parenthesisGroup.length - 1
                            parsed = true;
                            break;
                        }
                        // Otherwise, the function is an average, so add the average as a token.
                        parsedList.push((runningSum / numberCount).toString());
                        i += functionName.length + parenthesisGroup.length - 1
                        parsed = true;
                        break;
                    }
                    // If the function is a range, min, or max, find both the max and min.
                    let rangeOrMinOrMax = ["RANGE", "MINIMUM", "MIN", "MAXIMUM", "MAX"];
                    if (rangeOrMinOrMax.includes(functionName)) {
                        let processed = CellParser.processInputString(parenthesisGroup, spreadsheet, knownObservees)[0];
                        let parameters = processed[0].replace(" ", "");
                        let elements = parameters.split(",")
                        // If not enough arguments, add return error token.
                        if (elements.length < 1) {
                            parsed = true;
                            return [["#ERR: " + functionName + " given no arguments."], []];
                        }
                        // Iterate through the elements looking for the highest and lowest values.
                        let highestValue : number = Number(elements[0]);
                        let lowestValue : number = Number(elements[0]);
                        elements.forEach(function (element) {
                            if (element != "" && Number(element) != undefined && CellParserHelper.inputIsNumber(element)) {
                                if (highestValue < Number(element)) {
                                    highestValue = Number(element)
                                }
                                if (lowestValue > Number(element)) {
                                    lowestValue = Number(element)
                                }
                            }
                        });
                        // If we were looking for a range, add the range as a token.
                        if (functionName == "RANGE") {
                            parsedList.push((highestValue-lowestValue).toString());
                            i += functionName.length + parenthesisGroup.length - 1
                            parsed = true;
                            break;
                        }
                        // If we were looking for a maximum, add maximum as a token.
                        if (functionName == "MAX" || functionName == "MAXIMUM") {
                            parsedList.push((highestValue).toString());
                            i += functionName.length + parenthesisGroup.length - 1
                            parsed = true;
                            break;
                        }
                        // If we were looking for a minimum, add minimum as a token.
                        if (functionName == "MIN" || functionName == "MINIMUM") {
                            parsedList.push((lowestValue).toString());
                            i += functionName.length + parenthesisGroup.length - 1
                            parsed = true;
                            break;
                        }
                        parsed = true;
                        return [["#ERR: Error parsing " + functionName + "."], []];
                    }
                }
            }
            // Check for Cell Key 
            for (let j : number = 1; i + j <= input.length; j++) {
                // If we find a valid cell key, add it as a token.
                if (input.length >= i + j && CellParserHelper.stringIsValidKey(input.substring(i, i + j))) {
                    parsedList.push(input.substring(i, i+j));
                    i += j - 1;
                    parsed = true;
                    break;
                }
            }
            // If this point is reached, and parsed has not been set to true, we have reached an unrecognized input.
            if (!parsed) {
                return [["#ERR: Unrecognized input."], []];
            }
        }

        // Given input has been fully parsed into parsedList, with no early return.
        // Using our parsedList, calculate any formulas. 
        // Note that formulas and parenthesis groups have already been evaluated.

        /** orderOfOperation:
        *   0 = +, -
        *   1 = *, /, %
        *   2 = ^
        */
        let orderOfOperation : number = 0;
        let ITERATIONS = 0
        // Check each element of the parsed list, looking for operations.
        // Repeat while the list has more than one token, or an unevaluated parenthesis group.
        while (parsedList.length > 1 || (parsedList.length == 1 && parsedList[0].includes("("))) {
            ITERATIONS++
            if (ITERATIONS > 999999) {
                console.log("999999 ITERATIONS REACHED")
                throw new Error("999999 ITERATIONS REACHED");
                break;
            }
            // Decide the order of operation that should be evaluated.
            orderOfOperation = 0;
            if (parsedList.includes("^")) {
                orderOfOperation = 2;
            }
            else if (parsedList.includes("*") || parsedList.includes("/") || parsedList.includes("%")) {
                orderOfOperation = 1;
            }
            // Check each token of the parsedList for operations.
            let validOperations : string[] = ["+", "-", "*", "/", "%", "^", ".."]
            for (let i : number = 0; i < parsedList.length; i++) {
                // Operations
                if (validOperations.includes(parsedList[i])) {
                    // If there is no token before or after the operator, error, unless it may be a negative number.
                    if (i == parsedList.length -1 || (i == 0 && parsedList[i] != "-")) {
                        return [["#ERR: Operation missing operand."], []];
                    }
                    // If this operator is not next in the order of operations, move on.
                    if (["+", "-"].includes(parsedList[i]) && orderOfOperation > 0 || ["*", "/", "%"].includes(parsedList[i]) && orderOfOperation > 1) {
                        i++;
                        continue; 
                    }
                    // Find the left operand.
                    let firstOperand : string
                    // If the operation is minus, and there is no left operand, set it to zero. This will evaluate a negative number.
                    if (i == 0 && parsedList[i] == "-") {
                        firstOperand = "0"
                    } else {
                        firstOperand = parsedList[i-1]
                    }
                    // Find the second operand.
                    let secondOperand : string = parsedList[i+1]
                    // Operator found is our custom range operation.
                    if (parsedList[i] == "..") {
                        // Determine if the operands are valid keys. Set only token to error if not.
                        if (!CellParserHelper.stringIsValidKey(firstOperand) || !CellParserHelper.stringIsValidKey(secondOperand)) {
                            return [["#ERR: Invalid key in range expression."],[]];
                        }
                        let values = "";
                        // Get all cells in the range.
                        let cellsInRange = spreadsheet.getCellsGivenRange(firstOperand, secondOperand);
                        // Add each cell in that range as an observee, and add its value to values, followed by a comma.
                        cellsInRange.forEach(function (cell : Cell) {
                            knownObservees.push(cell.getKey());
                            values += cell.getDisplayValue() + ",";
                        });
                        // If multiple values are found, remove the trailing comma.
                        if (cellsInRange.length > 1) {
                            values = values.substring(0, values.length-1)
                        }
                        // Remove the operands and operator from the tokens, and insert the result.
                        parsedList.splice(i-1, 3);
                        parsedList.splice(i-1, 0, values);
                        break;
                    }
                    // Recursively evaluate the second operand.
                    secondOperand = CellParser.processInputString(parsedList[i+1], spreadsheet, knownObservees)[0][0]
                    // Create newItem to store the result of the operation.
                    let newItem : string = "#ERR: "
                    // If the operator is addition, it may be concatenation.
                    if (parsedList[i] == "+") {
                        if (firstOperand.length > 1 && secondOperand.length > 1 
                            && firstOperand.charAt(0) == "\"" && firstOperand.charAt(firstOperand.length-1) == "\""
                            && secondOperand.charAt(0) == "\"" && secondOperand.charAt(secondOperand.length-1) == "\"") {
                                // If both operands are strings, concatenate them, removing inner quotation marks.
                                newItem = firstOperand.substring(0, firstOperand.length-1) + secondOperand.substring(1, secondOperand.length)
                        } else {
                            // Otherwise, do addition.
                            newItem = (Number(firstOperand) + Number(secondOperand)).toString();
                            // If, after addition, the new item is NaN, set newItem back to an error.
                            if (isNaN(Number(newItem))) {
                                newItem = "#ERR: "
                            }
                        }
                    }
                    // Perform operation on operands, set newItem to its result.
                    else if (parsedList[i] == "*") {
                        newItem = (Number(firstOperand) * Number(secondOperand)).toString();
                    }
                    else if (parsedList[i] == "/") {
                        newItem = (Number(firstOperand) / Number(secondOperand)).toString();
                    }
                    else if (parsedList[i] == "%") {
                        newItem = (Number(firstOperand) % Number(secondOperand)).toString();
                    }
                    else if (parsedList[i] == "^") {
                        newItem = (Number(firstOperand) ** Number(secondOperand)).toString();
                    } 
                    else if (parsedList[i] == "-") {
                        newItem = (Number(firstOperand) - Number(secondOperand)).toString();
                        // For the minus operator, if there was no left operand, only remove two tokens from the parsed list.
                        if (i == 0) {
                            parsedList.splice(i, 2, newItem);
                            break;
                        }
                    }
                    // If newItem was not evaluated or became NaN, return one error token.
                    if (newItem == "#ERR: ") {
                        return [["#ERR: Operation returned invalid result."], []];
                    }
                    // Remove the operator and both operands from the parsedList, inserting the result.
                    parsedList.splice(i-1, 3, newItem);
                    break;
                }

                // Token is a parenthesis group, evaluate it.
                if (parsedList[i].charAt(0) == "(") {
                    if (parsedList[i].length < 2 || !parsedList[i].includes(")")) {
                        return [["#ERR: Open parenthesis left unclosed."], []];
                    }
                    // Evaluate the parenthesis group recursively.
                    let parenthesisGroup = CellParserHelper.getParenthesisGroup(parsedList[i])
                    let parenReturn : string[] = CellParser.processInputString(parenthesisGroup.substring(1, parenthesisGroup.length-1), spreadsheet, knownObservees)[0]
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
        // End of function. Return the list of tokens, and the list of known observees.
        return [parsedList, knownObservees];
    }
}