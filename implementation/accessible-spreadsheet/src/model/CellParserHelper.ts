
export class CellParserHelper {
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

    // Returns whether a given input is a correctly formatted cell rage
    public static inputIsCellRange(input : string) : boolean {
        let pieces : string[] = input.substring(1).split("..")
        if (pieces.length != 2) {
            return false
        }
        return CellParserHelper.stringIsValidKey(pieces[0]) && CellParserHelper.stringIsValidKey(pieces[1]);
    }

    // Returns the two keys in a given cell range. For example, returns ["A1", "B2"] when given "A1..B2"
    public static getKeysFromCellRangeInput(input : string) : [string, string] {
        if (!CellParserHelper.inputIsCellRange(input)) {
            // Invalid cell range given, return two empty strings
            return ["", ""];
        }
        return [input.substring(1).split("..")[0], input.substring(1).split("..")[1]];
    }

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

    // Returns the first open parenthesis' "group", until the first parenthesis is closed.
    public static getParenthesisGroup(input: string) : string {
        if (input.length < 2) {
            throw new Error("#ERR: getParenthesisGroup given too short of an input.");
        }
        if (input.charAt(0) != "(") {
            throw new Error("#ERR: getParenthesisGroup given input that does not start with an open parenthesis.");
        }
        let unclosedParenthesisCount = 1;
        let endIndex = 0;
        // Start at j = 1, because we have confirmed the starting character is the first open parenthesis.
        let j : number = 1;
        // Loop as long as there are still unclosed parenthesis and there is still input to check.
        while (unclosedParenthesisCount > 0 && input.length > j) {
            if (input.charAt(j) == "(") {
                unclosedParenthesisCount++;
            }
            if (input.charAt(j) == ")") {
                unclosedParenthesisCount--;
            }
            j++;
        }
        // End of input. If there are still unclosed parenthesis, throw an error.
        if (unclosedParenthesisCount > 0) {
            throw new Error("#ERR: getParenthesisGroup given input that does not close correctly.");
        }
        endIndex = 0 + j;
        // Return only the parenthesis group.
        return input.substring(0, endIndex);
    }
}