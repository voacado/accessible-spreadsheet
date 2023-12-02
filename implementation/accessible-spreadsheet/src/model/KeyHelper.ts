import {CellParserHelper} from "./CellParserHelper";

/**
 * Helper class for working with cell keys.
 */
export class KeyHelper {
    /**
     * Return the row part of a key.
     * @param key - cell key
     * @returns row part of key (e.g. "A1" -> "1")
     */
    public static getRowFromKey(key : string): string {
        if (!CellParserHelper.stringIsValidKey(key)) {
            throw new Error("#ERR: Spreadsheet.getRowFromKey() given invalid key: " + key);
        }
        let matches: RegExpMatchArray = key.match(/([A-Z]+)(\d+)/)!;
        if (matches) {
            return parseInt(matches[2]).toString();
        } else {
            throw new Error("#ERR: Spreadsheet.getRowFromKey() given key with more than one row: " + key);
        }
    }

    /**
     * Return the column part of a key.
     * @param key - cell key
     * @returns column part of key (e.g. "A1" -> "A")
     */
    public static getColFromKey(key : string): string {
        if (!CellParserHelper.stringIsValidKey(key)) {
            throw new Error("#ERR: Spreadsheet.getRowFromKey() given invalid key: " + key);
        }
        let matches: RegExpMatchArray = key.match(/([A-Z]+)(\d+)/)!;
        if (matches) {
            return matches[1];
        } else {
            throw new Error("#ERR: Spreadsheet.getRowFromKey() given key with more than one row: " + key);
        }
    }

    /**
     * Return the index of a row, given a key.
     * @param key - cell key
     * @returns index of row (e.g. "B5" -> 4)
     */
    public static getIndexOfRowFromKey(key : string) : number {
        let row = KeyHelper.getRowFromKey(key);
        return KeyHelper.getIndexOfRow(row);
    }

    /**
     * Return the index of a column, given a key.
     * @param key - cell key
     * @returns index of column (e.g. "B5" -> 1)
     */
    public static getIndexOfColFromKey(key : string) : number {
        let col = KeyHelper.getColFromKey(key);
        return KeyHelper.getIndexOfCol(col);
    }

    /**
     * Return the index of a row, given the row part of a key.
     * @param row - row part of key
     * @returns index of row (e.g. "5" -> 4)
     */
    public static getIndexOfRow(row : string) : number {
        return Number(row) - 1;
    }

    /**
     * Return the index of a column, given the column part of a key.
     * @param col - column part of key
     * @returns index of column (e.g. "B" -> 1)
     */
    public static getIndexOfCol(col : string) : number {
        let index: number = 0;
        for (let i = 0; i < col.length; i++) {
            index *= 26;
            index += (col.charCodeAt(i) - 65) + 1; // A = 1, B = 2, ... Z = 26
        }
        return index - 1; // Zero-indexed
    }

    /**
     * Return the row part of a key that matches a given index.
     * @param index - index of row
     * @returns row part of key (e.g. 4 -> "5")
     */
    public static getRowKeyFromIndex(index : number) : string {
        return String(index + 1);
    }

    /**
     * Return the column part of a key that matches a given index.
     * @param index - index of column
     * @returns column part of key (e.g. 1 -> "B")
     */
    public static getColKeyFromIndex(index : number) : string {
        let key: string = "";
        while (index >= 0) {
            key = String.fromCharCode(index % 26 + 65) + key;
            index = Math.floor(index / 26) - 1;
        }
        return key;
    }

    /**
     * Return a key given the index of its column and row.
     * @param columnIndex - col value
     * @param rowIndex - row value
     * @returns cell key (e.g. 1, 4 -> "B5")
     */
    public static createKeyFromIndeces(columnIndex : number, rowIndex : number) {
        return KeyHelper.getColKeyFromIndex(columnIndex) + KeyHelper.getRowKeyFromIndex(rowIndex);
    }

    /**
     * Returns the key next to a given key, in the positive row direction.
     * @param key - cell key
     * @returns key next to a given key, in the positive row direction
     */
    public static incrementKeyRow(key : string) {
        if (!CellParserHelper.stringIsValidKey(key)) {
            throw new Error("#ERR: incrementKeyRow given invalid key.");
        }
        return KeyHelper.getColFromKey(key) + KeyHelper.getRowKeyFromIndex(KeyHelper.getIndexOfRowFromKey(key) + 1);
    }

    /**
     * Returns the key next to a given key, in the negative row direction.
     * @param key - cell key
     * @returns key next to a given key, in the negative row direction
     */
    public static decrementKeyRow(key : string) {
        if (!CellParserHelper.stringIsValidKey(key)) {
            throw new Error("#ERR: decrementKeyRow given invalid key.");
        }
        return KeyHelper.getColFromKey(key) + KeyHelper.getRowKeyFromIndex(KeyHelper.getIndexOfRowFromKey(key) - 1);
    }

    /**
     * Returns the key next to a given key, in the positive column direction.
     * @param key - cell key
     * @returns key next to a given key, in the positive column direction
     */
    public static incrementKeyCol(key : string) {
        if (!CellParserHelper.stringIsValidKey(key)) {
            throw new Error("#ERR: incrementKeyCol given invalid key.");
        }
        return KeyHelper.getColKeyFromIndex(KeyHelper.getIndexOfColFromKey(key) + 1) + KeyHelper.getRowFromKey(key);
    }

    /**
     * Returns the key next to a given key, in the negative column direction.
     * @param key - cell key
     * @returns key next to a given key, in the negative column direction
     */
    public static decrementKeyCol(key : string) {
        if (!CellParserHelper.stringIsValidKey(key)) {
            throw new Error("#ERR: decrementKeyCol given invalid key.");
        }
        return KeyHelper.getColKeyFromIndex(KeyHelper.getIndexOfColFromKey(key) - 1) + KeyHelper.getRowFromKey(key);
    }
}
