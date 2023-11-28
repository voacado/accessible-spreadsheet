import { Spreadsheet } from '../model/Spreadsheet';
import { Cell } from "./Cell";
import { IValue } from "./values/IValue";
import { EmptyValue } from "./values/EmptyValue";
import { NumberValue } from "./values/NumberValue";
import { StringValue } from "./values/StringValue";
import { FormulaValue } from "./values/FormulaValue";
import { CellReference } from "./values/CellReference";
import { MultiCellReference } from "./values/MultiCellReference";
import { CellHelper } from "./CellHelper";

describe('spreadsheet', (): void => {
  describe('Spreadsheet', (): void => {
    let spreadsheet: Spreadsheet;

    beforeEach((): void => {
      spreadsheet = new Spreadsheet();
    });

    afterEach((): void => {
      jest.clearAllMocks();
      spreadsheet = null;
    });

    describe('Default Spreadsheet Constructor Values', (): void => {
      it('spreadsheet should have three rows and three columns', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
      });
    })

    describe('Spreadsheet Constructor Given Parameters', (): void => {
      it('spreadsheet should have seven rows and nine columns', (): void => {
        spreadsheet = new Spreadsheet(7, 9);
        expect(spreadsheet.getRowCount()).toEqual(7);
        expect(spreadsheet.getColCount()).toEqual(9);
      });
    })

    describe('Empty Spreadsheet Displays', (): void => {
      it('an empty spreadsheet should display empty strings at every valid position without errors', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);

        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("");
      });
    })

    describe('Empty Spreadsheet Values', (): void => {
      it('an empty spreadsheet should return empty string values at every valid position without errors', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);

        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual("");
      });
    })

    describe('Default Spreadsheet Add Row', (): void => {
      it('adding a row to a spreadsheet should increase the row count correctly', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(4);
        expect(spreadsheet.getColCount()).toEqual(3);
      });
    })

    describe('Default Spreadsheet Add Column', (): void => {
      it('adding a column to a spreadsheet should increase the column count correctly', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(4);
      });
    })

    describe('Default Spreadsheet Add Rows and Columns', (): void => {
      it('adding rows and columns to a spreadsheet should increase their counts correctly', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(4);
        expect(spreadsheet.getColCount()).toEqual(3);
        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(4);
        expect(spreadsheet.getColCount()).toEqual(4);
        spreadsheet.addRow(0);
        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(5);
        expect(spreadsheet.getColCount()).toEqual(5);
        spreadsheet.addRow(0);
        spreadsheet.addColumn(0);
        spreadsheet.addRow(0);
        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(7);
        expect(spreadsheet.getColCount()).toEqual(7);
      });
    })

    // TODO: Remove rows and columns

    describe('Default Spreadsheet Add Rows and Columns', (): void => {
      it('adding rows and columns to a spreadsheet should increase their counts correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
      });
    })



  })
})
