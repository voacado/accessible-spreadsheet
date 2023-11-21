import React from "react";
import { ReactComponent as SaveFileSvg } from "../../graphics/SaveFileButton.svg";
import { ReactComponent as LoadFileSvg } from "../../graphics/LoadFileButton.svg";
import { ReactComponent as FormulaSvg } from "../../graphics/FormulaButton.svg";
import { ReactComponent as InsertRowSvg } from "../../graphics/InsertRowButton.svg";
import { ReactComponent as DeleteRowSvg } from "../../graphics/DeleteRowButton.svg";
import { ReactComponent as ThemeSvg } from "../../graphics/ThemeButtonButton.svg";
import { ReactComponent as ScreenReaderSvg } from "../../graphics/ScreenReaderButton.svg";


export const OptionsPane = () => {

    const [formulaActive, setFormulaActive] = React.useState(false);

    const [pressedButton, setPressedButton] = React.useState<string | null>(null);
    // Function to handle button click
    const handleButtonClick = (buttonId: string) => {
      setPressedButton(buttonId);
      // setTimeout(() => setPressedButton(null), 200); // Reset after 200ms
    };

    return (
        <div className="bg-options-light text-black stroke-2 font-google-sans min-w-full w-fit">
          <header className="flex justify-left gap-1 p-1.5">
          <button 
                    className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out ${pressedButton === 'save-button' ? 'bg-options-active-light shadow-lg' : 'hover:bg-gray-200'}`}
                    onMouseDown={() => handleButtonClick('save-button')}
                    onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
                >
              <SaveFileSvg style={{height: "4em", width: "4em"}} />
              Save
            </button>

            <button 
                    className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out ${pressedButton === 'load-button' ? 'bg-options-active-light shadow-lg' : 'hover:bg-gray-200'}`}
                    onMouseDown={() => handleButtonClick('load-button')}
                    onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
                >
              <LoadFileSvg style={{height: "4em", width: "4em"}} />
              Load
            </button>

            {/* TODO: repeated code */}
            <div className="flex h-auto p-2">
              <div className="bg-options-stroke-light w-0.5"></div>
            </div>

            <button 
                    className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out ${pressedButton === 'formula-button' ? 'bg-options-active-light shadow-lg' : 'hover:bg-gray-200'}`}
                    onMouseDown={() => handleButtonClick('formula-button')}
                    onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
                >
              <FormulaSvg style={{height: "4em", width: "4em"}} />
              Formula
            </button>

            <div className="flex h-auto p-2">
              <div className="bg-options-stroke-light w-0.5"></div>
            </div>

            <button 
                    className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out ${pressedButton === 'insert-button' ? 'bg-options-active-light shadow-lg' : 'hover:bg-gray-200'}`}
                    onMouseDown={() => handleButtonClick('insert-button')}
                    onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
                >
              <InsertRowSvg style={{height: "4em", width: "4em", transform: "translateX(-7%)"}} />
              Insert
            </button>

            <button 
                    className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out ${pressedButton === 'delete-button' ? 'bg-options-active-light shadow-lg' : 'hover:bg-gray-200'}`}
                    onMouseDown={() => handleButtonClick('delete-button')}
                    onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
                >
              <DeleteRowSvg style={{height: "4em", width: "4em", transform: "translateX(-5%)"}} />
              Delete
            </button>

            <div className="flex h-auto p-2">
              <div className="bg-options-stroke-light w-0.5"></div>
            </div>

            <button 
                    className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out ${pressedButton === 'theme-button' ? 'bg-options-active-light shadow-lg' : 'hover:bg-gray-200'}`}
                    onMouseDown={() => handleButtonClick('theme-button')}
                    onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
                >
              <ThemeSvg style={{height: "4em", width: "4em"}} />
              Theme
            </button>

            <button 
                    className={`flex flex-col items-center justify-between focus:outline-none font-sans border-gray-300 px-4 py-2 rounded transition duration-200 ease-in-out ${pressedButton === 'screen-reader-button' ? 'bg-options-active-light shadow-lg' : 'hover:bg-gray-200'}`}
                    onMouseDown={() => handleButtonClick('screen-reader-button')}
                    onMouseUp={() => setTimeout(() => setPressedButton(null), 100)}
                >
              <ScreenReaderSvg style={{height: "4em", width: "4em"}} />
              Screen{"\n"}Reader
            </button>

          </header>
        </div>
      );
    };

export default OptionsPane;
