import { Spreadsheet } from '../../model/Spreadsheet';
import { Cell } from "../../model/Cell";
// import { CellHelper } from "../model/CellHelper";

describe('spreadsheet', (): void => {
  describe('Spreadsheet', (): void => {
    let spreadsheet: Spreadsheet;

    beforeEach((): void => {
      spreadsheet = Spreadsheet.getInstance();
    });

    afterEach((): void => {
      jest.clearAllMocks();
      spreadsheet.resetSpreadsheet();
    });

    describe('Default Spreadsheet Constructor Values', (): void => {
      it('spreadsheet should have 30 rows and 30 columns', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
      });
    })

    // describe('Spreadsheet Constructor Given Parameters', (): void => {
    //   it('spreadsheet should have seven rows and nine columns', (): void => {
    //     spreadsheet = new Spreadsheet(7, 9);
    //     expect(spreadsheet.getRowCount()).toEqual(30);
    //     expect(spreadsheet.getColCount()).toEqual(30);
    //   });
    // })

    describe('Empty Spreadsheet Displays', (): void => {
      it('an empty spreadsheet should display empty strings at every valid position without errors', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);

        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("");
      });
    })

    describe('Empty Spreadsheet Formula Bar Display', (): void => {
      it('an empty spreadsheet should return empty string formula bar displays at every valid position without errors', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);

        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("");
      });
    })

    describe('Default Spreadsheet Add Row', (): void => {
      it('adding a row to a spreadsheet should increase the row count correctly', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(31);
        expect(spreadsheet.getColCount()).toEqual(30);
      });
    })

    describe('Default Spreadsheet Add Column', (): void => {
      it('adding a column to a spreadsheet should increase the column count correctly', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(31);
      });
    })

    describe('Default Spreadsheet Add Rows and Columns', (): void => {
      it('adding rows and columns to a spreadsheet should increase their counts correctly', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(31);
        expect(spreadsheet.getColCount()).toEqual(30);
        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(31);
        expect(spreadsheet.getColCount()).toEqual(31);
        spreadsheet.addRow(0);
        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(32);
        expect(spreadsheet.getColCount()).toEqual(32);
        spreadsheet.addRow(0);
        spreadsheet.addColumn(0);
        spreadsheet.addRow(0);
        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(34);
        expect(spreadsheet.getColCount()).toEqual(34);
      });
    })

    describe('Spreadsheet Set Cell Value', (): void => {
      it('Setting a cell\'s value should be reflected by the cell\'s display and value and formula bar display', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
      });
    })

    describe('Spreadsheet Set Negative Cell Value', (): void => {
      it('Setting a cell\'s value to a negative should be reflected by the cell\'s display and value and formula bar display', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "-1");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("-1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("-1");
      });
    })

    describe('Spreadsheet Set Multiple Cell Values', (): void => {
      it('Setting any number of cells\' values should be reflected by their display and value and formula bar display', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");
      });
    })

    describe('Spreadsheet Set and Re-Set Multiple Cell Values', (): void => {
      it('Setting and re-setting any number of cells\' values should be reflected by their display and value and formula bar display', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");
        
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
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("10");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("20");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("20");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("30");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("30");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("110");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("110");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("220");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("220");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("330");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("330");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("1110");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("1110");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("2220");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("2220");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("3330");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("3330");
      });
    })

    describe('Spreadsheet Add Row (index 0) After Set Multiple Cell Values', (): void => {
      it('Adding a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");

        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(31);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C4")).toEqual("333");
      });
    })

    describe('Spreadsheet Add Column (index 0) After Set Multiple Cell Values', (): void => {
      it('Adding a column to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");

        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(31);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D3")).toEqual("333");
      });
    })

    describe('Spreadsheet Add Row Then Column After Set Multiple Cell Values', (): void => {
      it('Adding a row then a columnto a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");

        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(31);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C4")).toEqual("333");

        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(31);
        expect(spreadsheet.getColCount()).toEqual(31);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A4")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("D4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D4")).toEqual("333");
      });
    })

    describe('Spreadsheet Add Column Then Row After Set Multiple Cell Values', (): void => {
      it('Adding a column then a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");

        spreadsheet.addColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(31);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D3")).toEqual("333");

        spreadsheet.addRow(0);
        expect(spreadsheet.getRowCount()).toEqual(31);
        expect(spreadsheet.getColCount()).toEqual(31);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A4")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D2")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("D4")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D4")).toEqual("333");
      });
    })

    describe('Spreadsheet Add Row (non-zero index) After Set Multiple Cell Values', (): void => {
      it('Adding a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");

        spreadsheet.addRow(1);
        expect(spreadsheet.getRowCount()).toEqual(31);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A4")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B4")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C4")).toEqual("333");
      });
    })

    describe('Spreadsheet Add Column (non-zero index) After Set Multiple Cell Values', (): void => {
      it('Adding a column to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");

        spreadsheet.addColumn(1);
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(31);
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D3")).toEqual("333");
      });
    })

    describe('Default Spreadsheet Remove Row', (): void => {
      it('Removing a row to a spreadsheet should decrease the row count correctly', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        spreadsheet.removeRow(0);
        expect(spreadsheet.getRowCount()).toEqual(29);
        expect(spreadsheet.getColCount()).toEqual(30);
      });
    })

    describe('Default Spreadsheet Remove Column', (): void => {
      it('Removing a column to a spreadsheet should decrease the column count correctly', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(29);
      });
    })

    describe('Default Spreadsheet Remove Rows and Columns', (): void => {
      it('Removing rows and columns to a spreadsheet should decrease their counts correctly', (): void => {
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        spreadsheet.removeRow(0);
        expect(spreadsheet.getRowCount()).toEqual(29);
        expect(spreadsheet.getColCount()).toEqual(30);
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(29);
        expect(spreadsheet.getColCount()).toEqual(29);
        spreadsheet.removeRow(0);
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(28);
        expect(spreadsheet.getColCount()).toEqual(28);
        spreadsheet.removeRow(0);
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(27);
        expect(spreadsheet.getColCount()).toEqual(27);
      });
    })

    describe('Spreadsheet Remove Row (index 0) After Set Multiple Cell Values', (): void => {
      it('Removing a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");

        // console.log(spreadsheet.spreadsheetAsString())
        spreadsheet.removeRow(0);
        // console.log(spreadsheet.spreadsheetAsString())
        expect(spreadsheet.getRowCount()).toEqual(29);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("333");
      });
    })

    describe('Spreadsheet Remove Column (index 0) After Set Multiple Cell Values', (): void => {
      it('Removing a column to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");

        spreadsheet.removeColumn(0);
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(29);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("333");

      });
    })

    describe('Spreadsheet Remove Row (non-zero index) After Set Multiple Cell Values', (): void => {
      it('Removing a row to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");


        spreadsheet.removeRow(1);
        expect(spreadsheet.getRowCount()).toEqual(29);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("333");

      });
    })

    describe('Spreadsheet Remove Column (non-zero index) After Set Multiple Cell Values', (): void => {
      it('Removing a column to a spreadsheet with values in it should shift cells correctly', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "11");
        spreadsheet.setCellAtKeyGivenInput("B2", "22");
        spreadsheet.setCellAtKeyGivenInput("B3", "33");
        spreadsheet.setCellAtKeyGivenInput("C1", "111");
        spreadsheet.setCellAtKeyGivenInput("C2", "222");
        spreadsheet.setCellAtKeyGivenInput("C3", "333");
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(30);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("22");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("33");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("333");

        spreadsheet.removeColumn(1);
        expect(spreadsheet.getRowCount()).toEqual(30);
        expect(spreadsheet.getColCount()).toEqual(29);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("111");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("222");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("333");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("333");
      });
    })

    describe('Cell Reference', (): void => {
      it('A cell containing a cell reference should return the same display and value, and a correct formula bar display', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("REF(A1)");

      });
    })

    describe('Cell Reference Changing Value', (): void => {
      it('A cell containing a cell reference should return the same display and value, even if the cell it references changes', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("REF(A1)");
        spreadsheet.setCellAtKeyGivenInput("A1", "99");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("99");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("99");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("99");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("REF(A1)");

      });
    })

    describe('Cell Reference Chaining', (): void => {
      it('A cell referencing a cell referencing (etc) should return the same values and displays, even after changes', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "REF(A1)");
        spreadsheet.setCellAtKeyGivenInput("B2", "REF(B1)");
        spreadsheet.setCellAtKeyGivenInput("B3", "REF(B2)");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("REF(B1)");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("REF(B2)");
        spreadsheet.setCellAtKeyGivenInput("A1", "99");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("99");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("99");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("99");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("99");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("REF(B1)");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("99");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("REF(B2)");
      });
    })

    describe('Cell Arithmetic Formula Bar Values', (): void => {
      it('Cells given arithmetic should should that input in the formula bar.', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1+2");
        spreadsheet.setCellAtKeyGivenInput("A2", "3-1");
        spreadsheet.setCellAtKeyGivenInput("A3", "4*3");
        spreadsheet.setCellAtKeyGivenInput("B1", "55/5");
        spreadsheet.setCellAtKeyGivenInput("B2", "3^3");
        spreadsheet.setCellAtKeyGivenInput("B3", "12%5");
        spreadsheet.setCellAtKeyGivenInput("C1", "1 + 2 * 2");
        spreadsheet.setCellAtKeyGivenInput("C2", "1 * 2 + 2");
        spreadsheet.setCellAtKeyGivenInput("C3", "3 * (5 + 2)");
        // expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1+2");
        // expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("3-1");
        // expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("12");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("4*3");
        // expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("55/5");
        // expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("27");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("3^3");
        // expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("12%5");
        // expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("5");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("1 + 2 * 2");
        // expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("4");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("1 * 2 + 2");
        // expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("21");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("3 * (5 + 2)");
      });
    })

    describe('Cell Arithmetic Display Values', (): void => {
      it('Cells should display logically correct values when given arithmetic as input.', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1+2");
        spreadsheet.setCellAtKeyGivenInput("A2", "3-1");
        spreadsheet.setCellAtKeyGivenInput("A3", "4*3");
        spreadsheet.setCellAtKeyGivenInput("B1", "55/5");
        spreadsheet.setCellAtKeyGivenInput("B2", "3^3");
        spreadsheet.setCellAtKeyGivenInput("B3", "12%5");
        spreadsheet.setCellAtKeyGivenInput("C1", "1 + 2 * 2");
        spreadsheet.setCellAtKeyGivenInput("C2", "1 * 2 + 2");
        spreadsheet.setCellAtKeyGivenInput("C3", "3 * (5 + 2)");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("3");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1+2");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("3-1");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("12");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("4*3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("11");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("55/5");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("27");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("3^3");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("2");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("12%5");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("5");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("1 + 2 * 2");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("4");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("1 * 2 + 2");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("21");
        // expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("3 * (5 + 2)");
      });
    })

    describe('Range Expressions', (): void => {
      it('Cells with range expressions should correctly calculate their formulas.', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "10");
        spreadsheet.setCellAtKeyGivenInput("A2", "20");
        spreadsheet.setCellAtKeyGivenInput("A3", "30");
        spreadsheet.setCellAtKeyGivenInput("B1", "6");
        spreadsheet.setCellAtKeyGivenInput("B2", "12");
        spreadsheet.setCellAtKeyGivenInput("B3", "19");
        spreadsheet.setCellAtKeyGivenInput("C1", "SUM(A1..A3)");
        spreadsheet.setCellAtKeyGivenInput("C2", "SUM(A1..B3)");
        spreadsheet.setCellAtKeyGivenInput("C3", "AVERAGE(A1..A3)");
        
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("10");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("10");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("20");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("20");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("30");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("30");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("6");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("6");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("12");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("12");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("19");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("19");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("60");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("SUM(A1..A3)");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("97");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("SUM(A1..B3)");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("20");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("AVERAGE(A1..A3)");
      });
    })

    describe('FormulasTest', (): void => {
      it('testing fomulas', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "REF(A1)");
        spreadsheet.setCellAtKeyGivenInput("B2", "SUM(A1..A3)");
        spreadsheet.setCellAtKeyGivenInput("B3", "AVERAGE(A1..A3)");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("6");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("SUM(A1..A3)");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("AVERAGE(A1..A3)");
        
        spreadsheet.setCellAtKeyGivenInput("A1", "10");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("10");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("10");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("10");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("15");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("SUM(A1..A3)");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("5");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("AVERAGE(A1..A3)");
        
        spreadsheet.setCellAtKeyGivenInput("A1", "");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("5");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("SUM(A1..A3)");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("2.5");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("AVERAGE(A1..A3)");
      });
    })

    describe('Negatives', (): void => {
      it('testing negatives', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "0");
        spreadsheet.setCellAtKeyGivenInput("A2", "-0");
        spreadsheet.setCellAtKeyGivenInput("A3", "-1");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("0");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("0");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("0");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("-0");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("-1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("-1");
      });
    })

    describe('Self Referential Cells', (): void => {
      it('A cell that refers to itself should display an error.', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("#ERROR: self-ref.");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("REF(A1)");
      });
    })

    describe('Self Referential Cells, Range', (): void => {
      it('A cell that refers to itself in a range formula should display an error.', (): void => {
        spreadsheet.setCellAtKeyGivenInput("B2", "SUM(A1..C3)");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("#ERROR: self-ref.");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("SUM(A1..C3)");
      });
    })

    describe('cell ref add remove row', (): void => {
      it('adding removing with referenecs', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "1");
        spreadsheet.setCellAtKeyGivenInput("A2", "2");
        spreadsheet.setCellAtKeyGivenInput("A3", "3");
        spreadsheet.setCellAtKeyGivenInput("B1", "");
        spreadsheet.setCellAtKeyGivenInput("B2", "");
        spreadsheet.setCellAtKeyGivenInput("B3", "");
        spreadsheet.setCellAtKeyGivenInput("C1", "REF(A1)");
        spreadsheet.setCellAtKeyGivenInput("C2", "REF(A2)");
        spreadsheet.setCellAtKeyGivenInput("C3", "REF(A3)");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("REF(A2)");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("REF(A3)");

        spreadsheet.addColumn(0);
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B1")).toEqual("1");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("2");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("3");
        expect(spreadsheet.getCellAtKeyDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C1")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C2")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("");
        expect(spreadsheet.getCellAtKeyDisplay("D1")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D1")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("D2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D2")).toEqual("REF(A2)");
        expect(spreadsheet.getCellAtKeyDisplay("D3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("D3")).toEqual("REF(A3)");
      });
    })

    describe('Cell Reference chains delete', (): void => {
      it('Removing a cell that other cells observe should update those cells.', (): void => {
        spreadsheet.setCellAtKeyGivenInput("A1", "77");
        spreadsheet.setCellAtKeyGivenInput("B2", "REF(A1)");
        spreadsheet.setCellAtKeyGivenInput("C3", "REF(B2)");
        expect(spreadsheet.getCellAtKeyDisplay("A1")).toEqual("77");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A1")).toEqual("77");
        expect(spreadsheet.getCellAtKeyDisplay("B2")).toEqual("77");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B2")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("C3")).toEqual("77");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("C3")).toEqual("REF(B2)");
        spreadsheet.removeColumn(0);
        expect(spreadsheet.getCellAtKeyDisplay("A2")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("A2")).toEqual("REF(A1)");
        expect(spreadsheet.getCellAtKeyDisplay("B3")).toEqual("");
        expect(spreadsheet.getCellAtKeyFormulaBarDisplay("B3")).toEqual("REF(B2)");
      });
    })

    describe('Row and Column index out of bounds Errors', (): void => {
      it('Using the add, remove, or clear methods on rows and columns out of bounds will throw errors.', (): void => {
        expect(() => spreadsheet.addRow(-1)).toThrow();
        expect(() => spreadsheet.addColumn(-1)).toThrow();
        expect(() => spreadsheet.removeRow(-1)).toThrow();
        expect(() => spreadsheet.removeColumn(-1)).toThrow();
        expect(() => spreadsheet.clearRow(-1)).toThrow();
        expect(() => spreadsheet.clearColumn(-1)).toThrow();
        
        expect(() => spreadsheet.addRow(999)).toThrow();
        expect(() => spreadsheet.addColumn(999)).toThrow();
        expect(() => spreadsheet.removeRow(999)).toThrow();
        expect(() => spreadsheet.removeColumn(999)).toThrow();
        expect(() => spreadsheet.clearRow(999)).toThrow();
        expect(() => spreadsheet.clearColumn(999)).toThrow();
      });
    })

    // describe('saving', (): void => {
    //   it('saving', (): void => {
    //     spreadsheet.setCellAtKeyGivenInput("A1", "1");
    //     spreadsheet.saveSpreadsheet("fileName123")
    //   });
    // })
  })
})
