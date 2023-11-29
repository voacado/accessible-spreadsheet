import React, { useEffect } from "react";
import { Spreadsheet } from "../../model/Spreadsheet";

// TODO: move this interface to separate file
interface UserProps {
    activeCell: string;
    setActiveCell: (cell: string) => void;
    activeEditCell: string;
    setActiveEditCell: (cell: string) => void;
    editValue: string | number;
    setEditValue: (value: string | number) => void;
    fileName?: string;
    setFileName?: (name: string) => void;
  }

export const CellGrid: React.FC<UserProps> = ({activeCell, setActiveCell, activeEditCell, setActiveEditCell, editValue, setEditValue}) => {
    // TODO: we are currently re-rendering the entire spreadsheet on every update!

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
        setEditValue(spreadsheet.getCellAtKeyValue(cellKey) || "");
    };

    // Double click on cell to set is activeEditCell
    const handleDoubleClick = (cellKey: string) => {
        setActiveEditCell(cellKey);
        setEditValue(spreadsheet.getCellAtKeyValue(cellKey) || "");
    };

    // Handle edit cell value
    const handleEditValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(event.target.value);
    };

    // Handle sending edit value to Spreadsheet
    const handleSendEditValue = () => {
        // TODO: editValue shouldn't just be a string or something
        spreadsheet.setCellAtKeyGivenInput(activeEditCell, editValue.toString());
        setActiveEditCell("");
    };
    

    return (
        <table className="table-fixed border-collapse border border-gray-400">
            <thead>
                <tr>
                    {/* Empty cell for the top-left corner */}
                    <th className="sticky top-0 left-0 z-20 w-10 h-10 bg-options-light min-w-full min-h-full"></th>

                    {/* Generate column letters */}
                    {Array.from({ length: numCols }, (_, index) => (
                        <th key={index} className="sticky top-0 z-10 w-16 h-10 bg-options-light min-w-full min-h-full border border-gray-400">
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
                        <th className="sticky left-0 z-10 w-16 h-10 bg-options-light min-w-full min-h-full border border-gray-400">
                            {rowIndex + 1}
                        </th>

                        {/* Generate cells */}
                        {Array.from({ length: numCols }, (_, colIndex) => {
                            const cellKey: string = spreadsheet.getRowAndColKeyFromIndex(colIndex)[1] + (rowIndex + 1);
                            const isActive: boolean = cellKey === activeCell;
                            const isEditing: boolean = cellKey === activeEditCell;
                            return (<td
                                key={colIndex}
                                className={`w-16 h-10 border border-gray-300 ${isActive ? 'outline-cell-grid-active-light outline-2 outline' : ''}`}
                                onClick={() => handleSingleCellClick(cellKey)}
                                onDoubleClick={() => handleDoubleClick(cellKey)}
                            >
                                {isEditing ? (
                                    <input
                                        type="text"
                                        // className="w-full h-full text-left"
                                        className="w-full h-full outline-none text-left"
                                        // className="w-full h-full min-w-full min-h-full border-none outline-none text-left"
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
