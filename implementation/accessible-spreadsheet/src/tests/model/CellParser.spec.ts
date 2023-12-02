import { Spreadsheet } from "../../model/Spreadsheet";
import { CellParser } from "../../model/CellParser";

describe("CellParser", () => {
    let spreadsheet: Spreadsheet;

    beforeEach((): void => {
        spreadsheet = Spreadsheet.getInstance();
    });

    afterEach((): void => {
        jest.clearAllMocks();
        spreadsheet.resetSpreadsheet();
    });

    describe("getValueFromUserInput", () => {
        describe("empty input", () => {
            it("Should return an empty token and no observers from an empty input.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("");
                expect(output).toEqual(["", []]);
            });
            it("Should return an empty token and no observers from an input of whitespace.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput(" ");
                expect(output).toEqual(["", []]);
            });
        });
        
        describe("Addition", () => {
            it("Should return an answer token token and no observers from an addition input with whitespace.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("1 + 1");
                expect(output).toEqual(["2", []]);
            });
            it("Should return an answer token token and no observers from an addition input without whitespace.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("1+1");
                expect(output).toEqual(["2", []]);
            });
        });
        
        describe("Subtracting", () => {
            it("Should return an answer token and no observers from a subtraction input with whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("4 - 1");
                expect(output).toEqual(["3", []]);
            });
            it("Should return an answer token and no observers from a subtraction input with no whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("4-1");
                expect(output).toEqual(["3", []]);
            });
        });
        
        describe("Multiplication", () => {
            it("Should return an answer token and no observers from a multiplication input with whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("4 * 3");
                expect(output).toEqual(["12", []]);
            });
            it("Should return an answer token and no observers from a multiplication input with no whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("4*3");
                expect(output).toEqual(["12", []]);
            });
        });
        
        describe("Division", () => {
            it("Should return an answer token and no observers from a division input with whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("12 / 3");
                expect(output).toEqual(["4", []]);
            });
            it("Should return an answer token and no observers from a division input with no whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("12/3");
                expect(output).toEqual(["4", []]);
            });
        });
        
        describe("Modulo", () => {
            it("Should return an answer token and no observers from a modulo input with whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("12 % 5");
                expect(output).toEqual(["2", []]);
            });
            it("Should return an answer token and no observers from a modulo input with no whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("12%5");
                expect(output).toEqual(["2", []]);
            });
        });
        
        describe("Exponent", () => {
            it("Should return an answer token and no observers from an exponent input with whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("3 ^ 3");
                expect(output).toEqual(["27", []]);
            });
            it("Should return an answer token and no observers from an exponent input with no whitespace and no observers.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("3^3");
                expect(output).toEqual(["27", []]);
            });
        });
        
        describe("Parenthesis", () => {
            it("Parenthesis should work for operations.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("1 * (2 + 2)");
                expect(output).toEqual(["4", []]);
            });
        });
        
        describe("Order of operations", () => {
            it("Order of operations should be respected.", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("1 + 2 * 2");
                expect(output).toEqual(["5", []]);
            });
        });
        
        describe("Range functions", () => {
            it("SUM should return a sum token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("SUM(1,2,3)");
                expect(output).toEqual(["6", []]);
            });
            it("TOTAL should return a sum token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("TOTAL(1,2,3)");
                expect(output).toEqual(["6", []]);
            });
            it("MAX should return a maxed token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("MAX(1,2,3)");
                expect(output).toEqual(["3", []]);
            });
            it("MAXIMUM should return a maxed token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("MAXIMUM(1,2,3)");
                expect(output).toEqual(["3", []]);
            });
            it("MIN should return a minimized token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("MIN(1,2,3)");
                expect(output).toEqual(["1", []]);
            });
            it("MINIMUM should return a minimized token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("MINIMUM(1,2,3)");
                expect(output).toEqual(["1", []]);
            });
            it("AVERAGE should return an average token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("AVERAGE(10,20,30)");
                expect(output).toEqual(["20", []]);
            });
            it("AVG should return an average token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("AVG(10,20,30)");
                expect(output).toEqual(["20", []]);
            });
            it("MEAN should return an average token", () => {
                let output: [string, string[]] = CellParser.getValueFromUserInput("MEAN(10,20,30)");
                expect(output).toEqual(["20", []]);
            });
        });

        
    });

    describe("processInputString", () => {
        describe("empty input", () => {
            it("Should return no tokens and no observers from an empty input and no observers.", () => {
                let output: [string[], string[]] = CellParser.processInputString("", []);
                expect(output).toEqual([[], []]);
            });
            it("Should return no tokens and no observers from an input of whitespace and no observers.", () => {
                let output: [string[], string[]] = CellParser.processInputString(" ", []);
                expect(output).toEqual([[], []]);
            });
        });
        
        describe("Addition", () => {
            it("Should return an answer token and no observers from an addition input with whitespace and no observers.", () => {
                let output: [string[], string[]] = CellParser.processInputString("1 + 1", []);
                expect(output).toEqual([["2"], []]);
            });
            it("Should return an answer token and no observers from an addition input with no whitespace and no observers.", () => {
                let output: [string[], string[]] = CellParser.processInputString("-3+1", []);
                expect(output).toEqual([["-2"], []]);
            });
        });
        
        describe("Addition Negatives", () => {
            it("Should return an answer token and no observers from an addition input with whitespace and negatives and no observers.", () => {
                let output: [string[], string[]] = CellParser.processInputString("1 + 1", []);
                expect(output).toEqual([["2"], []]);
            });
            it("Should return an answer token and no observers from an addition input with no whitespace and negatives and no observers.", () => {
                let output: [string[], string[]] = CellParser.processInputString("-3+1", []);
                expect(output).toEqual([["-2"], []]);
            });
        });
        
    });



});
