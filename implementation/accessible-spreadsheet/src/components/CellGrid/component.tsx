import React from "react";

export const CellGrid = () => {
    // TODO: change all of this lmao
    const numRows = 70; // Number of rows in the grid
    const numCols = 70; // Number of columns in the grid

    return (
        <table className="table-fixed border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="w-12 h-8"></th> {/* Empty cell for the top-left corner */}
                    {/* Generate column names/letters */}
                    {Array.from({ length: numCols }, (_, index) => (
                        <th key={index} className="w-12 h-8 border border-gray-300">
                            {String.fromCharCode(65 + index)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* Generate rows */}
                {Array.from({ length: numRows }, (_, rowIndex) => (
                    <tr key={rowIndex}>
                        <th className="w-12 h-8 border border-gray-300">
                            {rowIndex + 1}
                        </th> {/* Row number */}
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
