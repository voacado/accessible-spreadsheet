import { createContext } from "react";
import IUserProps from "interfaces/IUserProps";

// Define default values for UserProps
const defaultUserProps: IUserProps = {
  activeCell: "A1",
  setActiveCell: () => {},
  activeEditCell: "",
  setActiveEditCell: () => {},
  editValue: "",
  setEditValue: () => {},
  fileName: "Untitled Spreadsheet",
  setFileName: () => {},
  theme: "defaultTheme",
  setTheme: () => {},
  screenReaderUIActive: false,
  setScreenReaderUIActive: () => {},
};

// Create the context with default values
const UserContext = createContext<IUserProps>(defaultUserProps);

export { UserContext };
