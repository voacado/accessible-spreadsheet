// TODO: Grab file name from model

// TODO: move this interface to separate file
interface UserProps {
  activeCell?: string;
  setActiveCell?: (cell: string) => void;
  activeEditCell?: string;
  setActiveEditCell?: (cell: string) => void;
  editValue?: string | number;
  setEditValue?: (value: string | number) => void;
  fileName: string;
  setFileName: (name: string) => void;
  theme?: string;
  setTheme?: (theme: string) => void;
}

export const FileHeader: React.FC<UserProps> = ({fileName, setFileName}) => {

    // Handle editing file name
    const handleEditFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFileName(event.target.value);
  };

    return (
      <div className="bg-file-header-color text-file-header-font-color p-[0.4%] min-w-full w-fit">
        <header>
            <div className="flex justify-center font-google-sans">
              <input
                  type="text"
                  className="w-full h-full text-center font-google-sans border-none outline-none bg-transparent"
                  value={fileName}
                  onChange={handleEditFileName}
                  autoFocus
              />
          </div>
        </header>
      </div>
    );
  };

export default FileHeader;
