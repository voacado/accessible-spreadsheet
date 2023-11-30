/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
      },
      minWidth: {
        100: "100px",
      },
      fontFamily: {
        "google-sans": ["Google Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-themer")({
      defaultTheme: {
        // Default Theme: Light Mode
        extend: {
          colors: {
            "file-header-color": "#2C2C2C", // "dark gray, almost black"
            "file-header-font-color": "#eef2ff", // indigo-50
            "options-bg-color": "#F7F7F7", // "gray"
            "options-font-color": "#000000", // black
            "options-stroke-color": "#CCCCCC", // "gray approaching dark"
            "options-btn-hover-color": "#e5e7eb", // gray-200
            "options-btn-active-color": "#C8C8C8", // "gray approaching dark"
            "options-btn-icon-border-color": "#4D4D4D",
            "formula-bar-font-color": "#374151", // gray-700
            "formula-bar-bg-color": "#FFFFFF", // white
            "formula-bar-border-color": "#CCCCCC", // "gray approaching dark"
            "fx-button-color": "#333333", // dark gray
            "cell-grid-active-color": "#1973E8", // "vivid blue"
            "cell-grid-header-border-color": "#9ca3af", // gray-400
            "cell-grid-header-text-color": "#000000", // black
            "cell-grid-cell-border-color": "#d1d5db", // gray-300
            "cell-grid-cell-color": "#FFFFFF", // white
            "cell-grid-cell-text-color": "#000000", // black
            "cell-grid-header-color": "#F3F4F6", // gray-100
          },
        },
      },
      themes: [
        {
          // Theme: Dark Mode
          name: "darkTheme",
          extend: {
            colors: {
              "file-header-color": "#222425", // "dark gray, almost black"
              "file-header-font-color": "#eef2ff", // indigo-50
              "options-bg-color": "#2C2C2C", // black (dark)
              "options-font-color": "#eef2ff", // indigo-50 (dark)
              "options-stroke-color": "#CCCCCC", // "gray approaching dark"
              "options-btn-hover-color": "#4b5563", // gray-600 (dark)
              "options-btn-active-color": "#6b7280", // "gray-500" (dark)
              "options-btn-icon-border-color": "#eef2ff",
              "formula-bar-font-color": "#F3F4F6", // gray-100 (dark)
              "formula-bar-bg-color": "#393939", // "dark gray" (dark)
              "formula-bar-border-color": "#000000", // black (dark)
              "fx-button-color": "#eef2ff", // white (dark)
              "cell-grid-active-color": "#1973E8", // "vivid blue"
              "cell-grid-header-border-color": "#645E52",
              "cell-grid-header-text-color": "#FFFFFF", // white (dark)
              "cell-grid-header-color": "#1E2022",
              "cell-grid-cell-border-color": "#676155",
              "cell-grid-cell-color": "#242627",
              "cell-grid-cell-text-color": "#FFFFFF", // white (dark)
            },
          },
        },
        {
          // Theme: High Contrast Mode
          name: "highContrastTheme",
          extend: {
            colors: {
              "file-header-color": "#000000",
              "file-header-font-color": "#eef2ff", 
              "options-bg-color": "#000000",
              "options-font-color": "#eef2ff",
              "options-stroke-color": "#FFFFFF",
              "options-btn-hover-color": "#F33BEE", // neon purple
              "options-btn-active-color": "#8CEA25", // bright green
              "options-btn-icon-border-color": "#FFFFFF",
              "formula-bar-font-color": "#F3F4F6",
              "formula-bar-bg-color": "#393939",
              "formula-bar-border-color": "#FFFFFF",
              "fx-button-color": "#FFFFFF",
              "cell-grid-active-color": "#DEFF04",
              "cell-grid-header-border-color": "#FFFFFF",
              "cell-grid-header-text-color": "#FFFFFF", 
              "cell-grid-header-color": "#111111", // slightly lighter than black
              "cell-grid-cell-border-color": "#FFFFFF",
              "cell-grid-cell-color": "#000000",
              "cell-grid-cell-text-color": "#DEFF04", // neon yellow
            },
          },
        },
      ],
    }),
  ],
};
