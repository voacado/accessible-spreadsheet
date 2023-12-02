export default interface UserProps {
    activeCell: string; // cell that is currently selected
    setActiveCell: (cell: string) => void; // func to set the active cell
    activeEditCell: string; // cell currently being edited
    setActiveEditCell: (cell: string) => void; // func to set the active edit cell
    editValue: string | number; // value of the cell that is currently being edited
    setEditValue: (value: string | number) => void; // func to set the value of the cell that is currently being edited
    fileName: string; // name of the file
    setFileName: (name: string) => void; // func to set the name of the file
    theme: string; // theme of the app
    setTheme: (theme: string) => void; // func to set the theme of the app
    screenReaderUIActive: boolean; // whether or not the screen reader UI is active
    setScreenReaderUIActive: (active: boolean) => void; // func to toggle screen reader UI
}
