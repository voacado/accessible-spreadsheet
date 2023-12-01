import { ScreenReader } from "model/ScreenReader";
import { UserContext } from "contexts/UserPropsContext";
import { useContext } from "react";

export const FileHeader: React.FC = () => {
  const { fileName, setFileName } = useContext(UserContext);

    // Handle editing file name
    const handleEditFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFileName(event.target.value);
  };

  // Handle text-to-speech on de-select
  const handleEditFileNameBlur = () => {
    ScreenReader.getInstance().speak(fileName);
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
                  onBlur={handleEditFileNameBlur}
                  autoFocus
              />
          </div>
        </header>
      </div>
    );
  };

export default FileHeader;
