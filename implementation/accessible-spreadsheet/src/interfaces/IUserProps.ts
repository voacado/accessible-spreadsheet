export default interface UserProps {
    activeCell: string;
    setActiveCell: (cell: string) => void;
    activeEditCell: string;
    setActiveEditCell: (cell: string) => void;
    editValue: string | number;
    setEditValue: (value: string | number) => void;
    fileName: string;
    setFileName: (name: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
    screenReaderUIActive: boolean;
    setScreenReaderUIActive: (active: boolean) => void;
}
