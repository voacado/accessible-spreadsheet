import { CellParserHelper } from "model/CellParserHelper";

// For each function in CellParserHelper, we test a valid case, an invalid case, and an edge case.

describe("stringIsValidKey()", () => {
  it("correct cell key returns true", () => {
    expect(CellParserHelper.stringIsValidKey("A1")).toBeTruthy();
    expect(CellParserHelper.stringIsValidKey("Z9")).toBeTruthy();
    expect(CellParserHelper.stringIsValidKey("AA10")).toBeTruthy();
  });

  it("incorrect cell key returns false", () => {
    expect(CellParserHelper.stringIsValidKey("1A")).toBeFalsy();
    expect(CellParserHelper.stringIsValidKey("A")).toBeFalsy();
    expect(CellParserHelper.stringIsValidKey("10")).toBeFalsy();
    expect(CellParserHelper.stringIsValidKey("AB")).toBeFalsy();
  });

  it("handles empty string", () => {
    expect(CellParserHelper.stringIsValidKey("")).toBeFalsy();
  });
});

describe("inputIsEmpty()", () => {
  it("checks for empty input", () => {
    expect(CellParserHelper.inputIsEmpty("")).toBeTruthy();
    expect(
      CellParserHelper.inputIsEmpty(null as unknown as string)
    ).toBeTruthy();
    expect(
      CellParserHelper.inputIsEmpty(undefined as unknown as string)
    ).toBeTruthy();
  });

  it("returns false for non-empty input", () => {
    expect(CellParserHelper.inputIsEmpty("A1")).toBeFalsy();
  });
});

describe("inputIsNumber()", () => {
  it("numeric input - returns true", () => {
    expect(CellParserHelper.inputIsNumber("123")).toBeTruthy();
    expect(CellParserHelper.inputIsNumber("0.56")).toBeTruthy();
  });

  it("invalid input (not numbers) - returns false", () => {
    expect(CellParserHelper.inputIsNumber("A1")).toBeFalsy();
    expect(CellParserHelper.inputIsNumber("abc")).toBeFalsy();
  });
});

describe("inputIsLettersOnly()", () => {
  it("letters-only input - returns true", () => {
    expect(CellParserHelper.inputIsLettersOnly("ABC")).toBeTruthy();
    expect(CellParserHelper.inputIsLettersOnly("xyz")).toBeTruthy();
  });

  it("non-letter input - returns false", () => {
    expect(CellParserHelper.inputIsLettersOnly("A1")).toBeFalsy();
    expect(CellParserHelper.inputIsLettersOnly("123")).toBeFalsy();
  });
});

describe("parenthesisCheck()", () => {
  it("correct parenthesis usage - returns true", () => {
    expect(CellParserHelper.parenthesisCheck("(A1+B2)")).toBeTruthy();
    expect(CellParserHelper.parenthesisCheck("(A1+(B2-C3))")).toBeTruthy();
  });

  it("incorrect parenthesis usage - returns false", () => {
    expect(CellParserHelper.parenthesisCheck("(A1+B2")).toBeFalsy();
    expect(CellParserHelper.parenthesisCheck("A1+B2)")).toBeFalsy();
    expect(CellParserHelper.parenthesisCheck("((A1+B2)")).toBeFalsy();
  });
});

describe("getParenthesisGroup()", () => {
  it("gets correct parenthesis group", () => {
    expect(CellParserHelper.getParenthesisGroup("(A1+B2) more text")).toBe(
      "(A1+B2)"
    );
    expect(CellParserHelper.getParenthesisGroup("(A1+(B2-C3)) more text")).toBe(
      "(A1+(B2-C3))"
    );
  });

  it("throws error for incorrect input", () => {
    expect(() => CellParserHelper.getParenthesisGroup("A1+B2")).toThrow();
    expect(() => CellParserHelper.getParenthesisGroup("(A1+B2")).toThrow();
  });
});
