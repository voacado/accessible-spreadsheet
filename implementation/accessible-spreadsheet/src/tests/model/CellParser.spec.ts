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
