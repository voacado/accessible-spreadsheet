import { KeyHelper } from "model/KeyHelper";

// For each function in KeyHelper, we test a valid case, an invalid case, and an edge case.

describe("getRowFromKey()", () => {
  it("should return the row part of key", () => {
    expect(KeyHelper.getRowFromKey("A1")).toBe("1");
  });

  it("should throw an error for an invalid key", () => {
    expect(() => KeyHelper.getRowFromKey("1A")).toThrow();
  });

  it("should handle multi-digit rows correctly", () => {
    expect(KeyHelper.getRowFromKey("A10")).toBe("10");
  });
});

describe("getColFromKey()", () => {
  it("should return the col part of key", () => {
    expect(KeyHelper.getColFromKey("A1")).toBe("A");
  });

  it("should throw an error for an invalid key", () => {
    expect(() => KeyHelper.getColFromKey("1A")).toThrow();
  });

  it("should handle multi-digit cols correctly", () => {
    expect(KeyHelper.getColFromKey("AA1")).toBe("AA");
  });
});

describe("getIndexOfRowFromKey()", () => {
  it("should return the correct row index for valid key", () => {
    expect(KeyHelper.getIndexOfRowFromKey("B5")).toBe(4);
  });

  it("should throw an error for an invalid key", () => {
    expect(() => KeyHelper.getIndexOfRowFromKey("5B")).toThrow();
  });

  it("should handle multi-digit row properly", () => {
    expect(KeyHelper.getIndexOfRowFromKey("A28")).toBe(27);
  });
});

describe("getIndexOfColFromKey()", () => {
  it("should return the correct col index for valid key", () => {
    expect(KeyHelper.getIndexOfColFromKey("B5")).toBe(1);
  });

  it("should throw an error for an invalid key", () => {
    expect(() => KeyHelper.getIndexOfColFromKey("5B")).toThrow();
  });

  it("should handle multi-letter col properly", () => {
    expect(KeyHelper.getIndexOfColFromKey("BB1")).toBe(53);
  });
});

describe("getIndexOfRow()", () => {
  it("should return the correct index for valid row", () => {
    expect(KeyHelper.getIndexOfRow("5")).toBe(4);
  });

  it("should handle row 1 correctly", () => {
    expect(KeyHelper.getIndexOfRow("1")).toBe(0);
  });

  it("should handle row 11 (multi-number) correctly", () => {
    expect(KeyHelper.getIndexOfRow("11")).toBe(10);
  });
});

describe("getIndexOfCol()", () => {
  it("should return the correct index for valid row", () => {
    expect(KeyHelper.getIndexOfCol("A")).toBe(0);
  });

  it("should handle col BB (multi-letter) correctly", () => {
    expect(KeyHelper.getIndexOfCol("BB")).toBe(53);
  });
});

describe("getRowKeyFromIndex()", () => {
  it("should return the correct row key for index", () => {
    expect(KeyHelper.getRowKeyFromIndex(4)).toBe("5");
  });

  it("should handle index 0 correctly", () => {
    expect(KeyHelper.getRowKeyFromIndex(0)).toBe("1");
  });
});

describe("getColKeyFromIndex()", () => {
  it("should return the correct row key for given index", () => {
    expect(KeyHelper.getColKeyFromIndex(0)).toBe("A");
  });

  it("should handle index 0 correctly", () => {
    expect(KeyHelper.getColKeyFromIndex(53)).toBe("BB");
  });
});

describe("createKeyFromIndices()", () => {
  it("should create a key from valid column and row indices", () => {
    expect(KeyHelper.createKeyFromIndeces(1, 4)).toBe("B5");
  });

  it("should handle zero indices correctly", () => {
    expect(KeyHelper.createKeyFromIndeces(0, 0)).toBe("A1");
  });

  it("neg indices should throw error", () => {
    expect(KeyHelper.createKeyFromIndeces(-5, -5)).toThrow();
  });
});

describe("incrementKeyRow()", () => {
  it("inc the row part of a key correctly", () => {
    expect(KeyHelper.incrementKeyRow("A1")).toBe("A2");
  });

  it("throws an error for invalid key", () => {
    expect(() => KeyHelper.incrementKeyRow("1A")).toThrow();
  });

  it("handles incrementing multi-digit row correctly", () => {
    expect(KeyHelper.incrementKeyRow("A9")).toBe("A10");
  });
});

describe("decrementKeyRow()", () => {
  it("dec the row part of a key correctly", () => {
    expect(KeyHelper.decrementKeyRow("A2")).toBe("A1");
  });

  it("throws an error for invalid key", () => {
    expect(() => KeyHelper.decrementKeyRow("1A")).toThrow();
  });

  it("handles decrementing to non-existent row correctly", () => {
    expect(() => KeyHelper.decrementKeyRow("A1")).toThrow();
  });
});

describe("incrementKeyCol()", () => {
  it("inc the col part of a key correctly", () => {
    expect(KeyHelper.incrementKeyCol("A1")).toBe("B1");
  });

  it("throws an error for invalid key", () => {
    expect(() => KeyHelper.incrementKeyCol("1A")).toThrow();
  });

  it('handles incrementing from "Z" to "AA" correctly', () => {
    expect(KeyHelper.incrementKeyCol("Z1")).toBe("AA1");
  });
});

describe("decrementKeyCol()", () => {
  it("decrements the col part of key correctly", () => {
    expect(KeyHelper.decrementKeyCol("B1")).toBe("A1");
  });

  it("throws an error for invalid key", () => {
    expect(() => KeyHelper.decrementKeyCol("1A")).toThrow();
  });

  it("handles decrementing to non-existent col correctly", () => {
    expect(() => KeyHelper.decrementKeyCol("A1")).toThrow();
  });
});
