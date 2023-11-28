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
import { spread } from 'q';

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

    describe('Spreadsheet Set Cell Value', (): void => {
      it('Setting a cell\'s value should be reflected by the cell\'s display and value', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
      });
    })

    describe('Spreadsheet Set Multiple Cell Values', (): void => {
      it('Setting any number of cells\' values should be reflected by their display and value', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);
      });
    })

    describe('Spreadsheet Set and Re-Set Multiple Cell Values', (): void => {
      it('Setting and re-setting any number of cells\' values should be reflected by their display and value', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);
        
        spreadsheet.setCellAtKeyGivenInput("A1", "10");
        spreadsheet.setCellAtKeyGivenInput("A2", "20");
        spreadsheet.setCellAtKeyGivenInput("A3", "30");
        spreadsheet.setCellAtKeyGivenInput("B1", "110");
        spreadsheet.setCellAtKeyGivenInput("B2", "220");
        spreadsheet.setCellAtKeyGivenInput("B3", "330");
        spreadsheet.setCellAtKeyGivenInput("C1", "1110");
        spreadsheet.setCellAtKeyGivenInput("C2", "2220");
        spreadsheet.setCellAtKeyGivenInput("C3", "3330");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("10");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(10);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("20");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(20);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("30");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("110");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(110);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("220");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(220);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("330");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(330);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("1110");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(1110);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("2220");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(2220);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("3330");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(3330);
      });
    })

    describe('Spreadsheet Add Row (index 0) After Set Multiple Cell Values', (): void => {
      it('Adding a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(4);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A4")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B4")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C4")).toEqual(333);
      });
    })

    describe('Spreadsheet Add Column (index 0) After Set Multiple Cell Values', (): void => {
      it('Adding a column to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(4);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("D1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("D2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("D3")).toEqual(333);
      });
    })

    describe('Spreadsheet Add Row Then Column After Set Multiple Cell Values', (): void => {
      it('Adding a row then a columnto a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(4);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A4")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B4")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C4")).toEqual(333);

        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(4);
        expect(spreadsheet.getColCount()).toEqual(4);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A4")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("B4")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("C4")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("D2")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("D3")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("D4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("D4")).toEqual(333);
      });
    })

    describe('Spreadsheet Add Column Then Row After Set Multiple Cell Values', (): void => {
      it('Adding a column then a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(4);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("D1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("D2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("D3")).toEqual(333);

        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(4);
        expect(spreadsheet.getColCount()).toEqual(4);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A4")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("B4")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("C4")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("D2")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("D3")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("D4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("D4")).toEqual(333);
      });
    })

    

    describe('Spreadsheet Add Row (non-zero index) After Set Multiple Cell Values', (): void => {
      it('Adding a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.addRow(1);
        expect(spreadsheet.getRowCount()).toEqual(4);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A4")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B4")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C4")).toEqual(333);
      });
    })

    describe('Spreadsheet Add Column (non-zero index) After Set Multiple Cell Values', (): void => {
      it('Adding a column to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.addColumn(1);
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(4);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("D1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("D2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("D3")).toEqual(333);
      });
    })

    

    describe('Default Spreadsheet Remove Row', (): void => {
      it('Removing a row to a spreadsheet should decrease the row count correctly', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        spreadsheet.removeRow(0);
        expect(spreadsheet.getRowCount()).toEqual(2);
        expect(spreadsheet.getColCount()).toEqual(3);
      });
    })

    describe('Default Spreadsheet Remove Column', (): void => {
      it('Removing a column to a spreadsheet should decrease the column count correctly', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(2);
      });
    })

    describe('Default Spreadsheet Remove Rows and Columns', (): void => {
      it('Removing rows and columns to a spreadsheet should decrease their counts correctly', (): void => {
        spreadsheet = new Spreadsheet();
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        spreadsheet.removeRow(0);
        expect(spreadsheet.getRowCount()).toEqual(2);
        expect(spreadsheet.getColCount()).toEqual(3);
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(2);
        expect(spreadsheet.getColCount()).toEqual(2);
        spreadsheet.removeRow(0);
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(1);
        expect(spreadsheet.getColCount()).toEqual(1);
        spreadsheet.removeRow(0);
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(0);
        expect(spreadsheet.getColCount()).toEqual(0);
      });
    })

    describe('Spreadsheet Remove Row (index 0) After Set Multiple Cell Values', (): void => {
      it('Removing a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);
        console.log(spreadsheet.spreadsheetAsString())
        spreadsheet.removeRow(0);
        console.log(spreadsheet.spreadsheetAsString())
        expect(spreadsheet.getRowCount()).toEqual(2);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(333);
      });
    })

    describe('Spreadsheet Remove Column (index 0) After Set Multiple Cell Values', (): void => {
      it('Removing a column to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(333);
      });
    })

    describe('Spreadsheet Remove Row (non-zero index) After Set Multiple Cell Values', (): void => {
      it('Removing a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.removeRow(1);
        expect(spreadsheet.getRowCount()).toEqual(2);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(333);
      });
    })

    describe('Spreadsheet Remove Column (non-zero index) After Set Multiple Cell Values', (): void => {
      it('Removing a column to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet = new Spreadsheet();
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(11);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(22);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(33);
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("C1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("C2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("C3")).toEqual(333);

        spreadsheet.removeColumn(1);
        expect(spreadsheet.getRowCount()).toEqual(3);
        expect(spreadsheet.getColCount()).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyValue("A1")).toEqual(1);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyValue("A2")).toEqual(2);
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyValue("A3")).toEqual(3);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyValue("B1")).toEqual(111);
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyValue("B2")).toEqual(222);
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyValue("B3")).toEqual(333);
      });
    })

  })
})
