import React, { useState, useEffect } from "react";
import { ScreenReader } from "model/ScreenReader";
import paperclipPng from "graphics/Paperclip.png";

export const ScreenReaderLog = () => {
  const screenReader = ScreenReader.getInstance();
  const screenReaderLog = screenReader.getSpeechLog();
  const [, forceUpdate] = useState({}); // Force re-render on state update

  // Observer Design Pattern - subscribe to ScreenReader to update view on change
  useEffect(() => {
    const updateScreenReaderLog = () => forceUpdate({});
    // Subscribe, on notify -> update cell grid
    screenReader.subscribe(updateScreenReaderLog);
    // Unsubscribe when unmount
    return () => screenReader.unsubscribe(updateScreenReaderLog);
  }, [screenReader]);

  return (
    <div className="fixed bottom-10 right-12 mb-4 ml-4 p-4 backdrop-blur-sm border rounded-lg shadow-lg">
      <div className="flex items-end space-x-2">
        <img src={paperclipPng} alt="Clippy" className="w-16 h-16" />
        <div className="flex flex-col items-start min-w-[125px] max-w-[350px]">
          {screenReaderLog.map((message, index) => (
            <div
              key={index}
              className="bg-gray-200 text-black p-2 rounded-lg mb-1 break-words max-w-xs"
            >
              {" "}
              {message}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenReaderLog;
