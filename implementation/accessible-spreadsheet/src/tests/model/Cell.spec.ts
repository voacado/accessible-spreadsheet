import { Spreadsheet } from "../../model/Spreadsheet";
import { Cell } from "../../model/Cell";

describe("Cell", () => {
    let spreadsheet: Spreadsheet;

    beforeEach((): void => {
      spreadsheet = Spreadsheet.getInstance();
    });

    afterEach((): void => {
      jest.clearAllMocks();
      spreadsheet.resetSpreadsheet();
    });
  
    describe("Constructor", () => {
      it("should initialize cell with correct key and display value", () => {
        const cell = new Cell("A1", "5");
        expect(cell.getKey()).toEqual("A1");
        expect(cell.getDisplayValue()).toEqual("5");
      });
  
      it("should handle self-reference correctly in the constructor", () => {
        const cell = new Cell("A1", "REF(A1)");
        expect(cell.getDisplayValue()).toEqual("#ERROR: self-ref.");
      });
    });
  
    describe("getKey", () => {
      it("should return the correct key", () => {
        const cell = new Cell("A1", "5");
        expect(cell.getKey()).toEqual("A1");
      });
    });
  
    describe("setKey", () => {
      it("should update the key correctly", () => {
        const cell = new Cell("A1", "5");
        cell.setKey("B2");
        expect(cell.getKey()).toEqual("B2");
      });
    });
  
    describe("clearCell", () => {
      it("should clear the cell values", () => {
        const cell = new Cell("A1", "5");
        cell.clearCell();
        expect(cell.getDisplayValue()).toEqual("");
        expect(cell.getFormulaBarDisplayValue()).toEqual("");
      });
    });
  
    describe("getFormulaBarDisplayValue", () => {
      it("should return the correct formula bar display value", () => {
        const cell = new Cell("A1", "REF(B2)");
        expect(cell.getFormulaBarDisplayValue()).toEqual("REF(B2)");
      });
    });
  
    describe("setCellValue", () => {
      it("should set the cell value correctly", () => {
        const cell = new Cell("A1", "5");
        cell.setCellValue("10");
        expect(cell.getDisplayValue()).toEqual("10");
      });
    });
  
    describe("addObserver", () => {
      it("should add observer correctly", () => {
        const cellA = new Cell("A1", "5");
        const cellB = new Cell("B1", "REF(A1)");
        cellA.addObserver(cellB);
        expect(cellA.getObservers()).toContain(cellB);
      });
    });
  
    describe("removeObserver", () => {
      it("should remove observer correctly", () => {
        const cellA = new Cell("A1", "5");
        const cellB = new Cell("B1", "REF(A1)");
        cellA.addObserver(cellB);
        cellA.removeObserver(cellB);
        expect(cellA.getObservers()).toEqual([]);
      });
  
      it("should throw an error when trying to remove non-existent observer", () => {
        const cellA = new Cell("A1", "5");
        const cellB = new Cell("B1", "REF(A1)");
        expect(() => cellA.removeObserver(cellB)).toThrowError(
          "ERROR: Cell.removeObserver() did not find given observer in this.observers to remove."
        );
      });
    });
  
    describe("deleteCell", () => {
      it("should delete the cell and notify observers", () => {
        const cellA = new Cell("A1", "5");
        const cellB = new Cell("B1", "REF(A1)");
        cellB.deleteCell();
        expect(cellB.getDisplayValue()).toEqual("");
        expect(cellA.getObservers()).toEqual([]);
      });
    });
  });
  