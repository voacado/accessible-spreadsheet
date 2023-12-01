import React, { useEffect } from "react";
import { Spreadsheet } from "model/Spreadsheet";
import { ScreenReader } from "model/ScreenReader";
import { CellHelper } from "model/CellHelper";

import { UserContext } from "contexts/UserPropsContext";
import { useContext } from "react";

export const CellGrid: React.FC = () => {
    // TODO: we are currently re-rendering the entire spreadsheet on every update!
    const { activeCell, setActiveCell, activeEditCell, setActiveEditCell, editValue, setEditValue } = useContext(UserContext);

    // Singleton Design Pattern - access created instance
    const spreadsheet = Spreadsheet.getInstance();
    const numRows = spreadsheet.getRowCount(); // Number of rows in the grid
    const numCols = spreadsheet.getColCount(); // Number of columns in the grid
    const [, forceUpdate] = React.useState({}); // Force re-render on state update

    // Subscribe to Spreadsheet to update on change
    useEffect(() => {
        const updateCellGrid = () => forceUpdate({});
        // Subscribe, on notify -> update cell grid
        spreadsheet.subscribe(updateCellGrid);
        // Unsubscribe when unmount
        return () => spreadsheet.unsubscribe(updateCellGrid);
    }, [spreadsheet]);

    // Single click on cell to set is activeCell
    const handleSingleCellClick = (cellKey: string) => {
        setActiveCell(cellKey);
        ScreenReader.getInstance().speak(spreadsheet.getCellAtKeyDisplay(cellKey).toString());
        setEditValue(spreadsheet.getCellAtKeyFormulaBarDisplay(cellKey) || "");
    };

    // Double click on cell to set is activeEditCell
    const handleDoubleCellClick = (cellKey: string) => {
        setActiveEditCell(cellKey);
        setEditValue(spreadsheet.getCellAtKeyFormulaBarDisplay(cellKey) || "");
    };

    // Handle edit cell value
    const handleEditValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(event.target.value);
    };

    // Handle sending edit value to Spreadsheet
    const handleSendEditValue = () => {
        spreadsheet.setCellAtKeyGivenInput(activeEditCell, editValue.toString());
        ScreenReader.getInstance().speak(spreadsheet.getCellAtKeyDisplay(activeEditCell).toString());
        setActiveEditCell("");
    };
    

    return (
        <table className="table-fixed border-collapse border border-cell-grid-header-border-color">
            <thead>
                <tr>
                    {/* Empty cell for the top-left corner */}
                    <th className="sticky top-0 left-0 z-20 w-10 h-10 bg-cell-grid-header-color min-w-full min-h-full"></th>

                    {/* Generate column letters */}
                    {Array.from({ length: numCols }, (_, index) => (
                        <th key={index} className="sticky top-0 w-16 h-10 bg-cell-grid-header-color min-w-full min-h-full border border-cell-grid-header-border-color text-cell-grid-header-text-color">
                            {CellHelper.getRowAndColKeyFromIndex(index)[1]}
                            {/* {spreadsheet.getRowAndColKeyFromIndex(index)[1]} */}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {/* Generate rows */}
                {Array.from({ length: numRows }, (_, rowIndex) => (
                    <tr key={rowIndex}>

                        {/* Row number */}
                        <th className="sticky left-0 z-10 w-16 h-10 bg-cell-grid-header-color min-w-full min-h-full border border-cell-grid-header-border-color text-cell-grid-header-text-color">
                            {rowIndex + 1}
                        </th>

                        {/* Generate cells */}
                        {Array.from({ length: numCols }, (_, colIndex) => {
                            const cellKey: string = CellHelper.getRowAndColKeyFromIndex(colIndex)[1] + (rowIndex + 1);
                            // const cellKey: string = spreadsheet.getRowAndColKeyFromIndex(colIndex)[1] + (rowIndex + 1);
                            const isActive: boolean = cellKey === activeCell;
                            const isEditing: boolean = cellKey === activeEditCell;
                            return (<td
                                key={colIndex}
                                className={`min-w-100 h-10 overflow-hidden whitespace-nowrap overflow-ellipsis border border-cell-grid-cell-border-color ${isActive ? 'outline-cell-grid-active-color outline-2 outline' : ''} bg-cell-grid-cell-color text-cell-grid-cell-text-color`}

                                onClick={() => handleSingleCellClick(cellKey)}
                                onDoubleClick={() => handleDoubleCellClick(cellKey)}
                            >
                                {isEditing ? (
                                    <input
                                        type="text"
                                        data-testid={`cell-${cellKey}`}
                                        className="w-full h-full outline-none text-left bg-cell-grid-cell-color"
                                        value={editValue}
                                        onChange={handleEditValue}
                                        onBlur={handleSendEditValue}
                                        autoFocus
                                    />
                                ) : (spreadsheet.getCellAtKeyDisplay(cellKey) || ""
                                )}
                            </td>)
                        })}
                    </tr>
                ))}
            </tbody>

        </table>
    );
};

export default CellGrid;
