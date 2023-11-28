import React from "react";
import { Spreadsheet } from "../../model/Spreadsheet";

export const CellGrid = () => {

    // Singleton Design Pattern - access created instance
    const spreadsheet = Spreadsheet.getInstance();
    const numRows = spreadsheet.getRowCount(); // Number of rows in the grid
    const numCols = spreadsheet.getColCount(); // Number of columns in the grid

    const [activeCell, setActiveCell] = React.useState("A1"); // Active cell

    return (
        <table className="table-fixed border-collapse border border-gray-300">
            <thead>
                <tr>
                    {/* Empty cell for the top-left corner */}
                    <th className="w-12 h-8"></th>

                    {/* Generate column names/letters */}
                    {Array.from({ length: numCols }, (_, index) => (
                        <th key={index} className="w-12 h-8 border border-gray-300">
                            {spreadsheet.getRowAndColKeyFromIndex(index)[1]}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {/* Generate rows */}
                {Array.from({ length: numRows }, (_, rowIndex) => (
                    <tr key={rowIndex}>

                        {/* Row number */}
                        <th className="w-12 h-8 border border-gray-300">
                            {rowIndex + 1}
                        </th>

                        {/* Generate cells */}
                        {Array.from({ length: numCols }, (_, colIndex) => (
                            <td
                                key={colIndex}
                                className="w-12 h-8 border border-gray-300"
                            ></td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table>
    );
};

export default CellGrid;
