<h1 align="center">
  Accessible Spreadsheet 📝
  <br>
  <img src="https://cdn-icons-png.flaticon.com/512/8445/8445741.png" alt="spreadsheet logo" title="spreadsheet logo" width="300">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;"><i>A Spreadsheet Application built with accessibility in mind.</i></p>

## The Problem

Current spreadsheet applications, while robust in functionality, often fall short in terms of accessibility and user customization. A significant issue is their limited support for users with visual impairments or those who prefer auditory interaction. Most spreadsheet tools do not offer native features to read out the state of the spreadsheet, which can be a hurdle for those who rely on screen readers or auditory feedback. Additionally, the lack of theming options like dark mode or high contrast can strain the user's eyes, especially for those who work in low-light environments or have specific visual needs. This "one-size-fits-all" approach to spreadsheet design overlooks the diverse requirements of a wide range of users, making it challenging for everyone to work efficently and comfortably.

## This Solution

This spreadsheet web app we have developed addredsses these accessibility and customization issues head-on. Firstly, it includes the ability to read anything highlighted, including not just user input, but also buttons as well. The goal here is to make it more accessible for users with visual impairments and those who process information easier audibly. This functionality aims to fix an oversight in existing spreadsheet tools, offering a more inclusive experience. In addition, our spreadsheet application introduces pre-defined theming options, including light, dark, and high contrast modes. This not only reduces eye strain vubt also caters to the varying visual needs of different users, allowing them to choose the theme that best suits their working environment or personal preference. By incorporating these features, our spreadsheet app aims to stand out as a more accessible and user-friendly tool that aligns with the needs of a diverse user base.

## Usage
#### Initial Setup:
Before running anything, you should run `npm install` to install core dependencies.
#### To Run:
To run the spreadsheet, run `npm run start` in terminal.
#### Testing:
To test the spreadsheet, run `npm run test`.
#### Code Coverage:
To check for code coverage, run `npm run coverage`.

## Directory Breakdown
 - `implementation`: Project codebase.
 - `project-presentation`: Slides for the final project presentation and the project demo (video).
 - `project-report`: The final project report PDF (breakdown of structure and architecture).
 - `phase-B-design`: The UML design and classes/interfaces as well as design prototypes.
 - `weekly-progress-reports`: All weekly progress reports during implementation and production.

## FAQ
- What web frameworks and packages did you use to create this application?
  - For this frontend, we used `TypeScript` with `React` and `Tailwind CSS` for GUI components. 
    - For themes, we used `tailwindcss-themer` to quickly switch between different color palettes.
  - For the backend, we used vanilla `TypeScript`. The formula parser and data structure was implemented from scratch.
  - For unit tests and code coverage, we used the `jest` module.

- What design patterns did you use to create this application?
  - This project is implemented using various design patterns to keep the program as optimized as possible.
  - The **Observer Design Pattern**:
    - Firstly, we used this pattern in our data structure so that when the underlying data (2D hashmap or rows and cols) updates, the `CellGrid` React component is notified to update its view. This, the `CellGrid` React component subscribes to the data structure within the `Spreadsheet` class, which notifies it on update.
      - Note, we have tried implementing some form of memoization to stop `CellGrid` full re-renders but found it made no noticable improvement performance-wise while greatly increasing the complexity of the codebase. For the time being, we opted to not include it.
    - This pattern is used again for the screen reader feature. Specifically, since the program aims to keep a log of the five most recently spoken messages, this log is visualized as a React component titled `ScreenReaderLog`. It subscribes to the `ScreenReader` class where, when a message is spoken and the log data structure is updated, it notifies the React component.
  - The **Singleton Design Pattern**:
    - Firstly, the `Spreadsheet` class should only be invoked once, which is done when `Spreadsheet.getInstance()` is called for the first time. Afterwards, all additional calls to `getInstance()` retrieve the existing one.
      - This is important to reference the same data structure as well as config (for theming, etc).
    - The `ScreenReader` class also uses this pattern to avoid creating duplicate instances of `SpeechSynthesisUtterance` and for a singular reference to the speech log.
  - **Additionally**:
    - While not a design pattern, we had issues during development with passing React states between different components. Each component needed access to various variables that they all shared. We initially tried creating an interface and passed all of them as optional variables, but this became a mess with TypeScript expecting null datatypes to be checked everywhere. Additionally, this became a problem with each React component declared in `./src/App.tsx` becoming overwhelming with the amount of parameters passed.
      - To fix this, we leveraged React Contexts. By Creating a `UserContext` that stores all the variables (under an interface that requires all parameters), we can then easily pass these variables to all React components.
      - One potential risk with this implementation however is a violation of the "Interface Segregation" rule from the SOLID principles. With each React component having access to all passed props, they now have access to data and setters that they do not need, which could violate rules of data isolation. We considered the risks of one interface for all versus a separate interface per each React component, and figured that given the inter-dependencies between each React component, the value of a single interface greatly outweighted its risks.

- How did you implement the screen reader feature?
  - The screen reader feature is implemented using the `SpeechSynthesisUtterance` interface of the Web Speech API. This interface is found on nearly all modern browsers, only excluding Internet Explorer, Opera Android, and WebView Android.
  - Using the `speak(text: string)` function, any input `text` will be read out loud via the browser. Thus, we create a `ScreenReader` model (using the Singleton Design Pattern) which creates a global instance of the `SpeechSynthesisUtterance` object, and have each button and text field send its text content to the `ScreenReader` object.

- Why do strings and texts need to be surrounded in quotation marks on this application?
  - Due to the specifications and functional requirements provided by the course, functions had to be implemented such that they could be invoked without prepending an `=` sign. For example, rather than `=SUM(A1:A4)`, the user would input `SUM(A1..A4)`.
  - As a result, we needed a way to differentiate between function keywords and strings.
    - If the user input the text: `SUM(A1..A4` (without the ending parentheses), how do we error handle this? Is this an invalid function, or do we treat it like a string?
    - Given this design conundrum for error handling, we made the design decision that all strings should be wrapped in quotation marks so that an input like `SUM(A1..A4` would be deemed an invalid formula.

- Is there a tutorial on how we can use this spreadsheet?
  - Yes! There is a video breakdown of the spreadsheet application found under `./video`. This was the video we used for our final presentation of the project.

- How are formulas parsed? How are they inputted?
  - Given the design specifications of this project, formulas are invoked on a keyword basis. For example, entering `SUM()` (notice the lack of an `=` sign) will invoke the sum function. 
    - Example formula: `SUM(A1..A4)`
    - Strings on the other hand are invoked with quotation marks.
  - In our manual formula parser (found at `./src/model/CellParser.ts -> processInputString()`), we search the cell text for a formula keyword. Afterwards, we group parenthesis to check for invalid operations. If cell references are found, access those values. Then, formulas are parsed with order of operations in mind.

- How can I add my own theme to this application?
  - Currently, extending theming support is a bit limited. 
  - Existing themes can be found under `./tailwind.config.js`, where the variable name explains what the hex code is refering to. Themes are selected through `./src/components/OptionsPane/component.tsx` -> Theme Button (in Function Cluster 4), which calls the `handleThemeChange()` function. By adding a new drop-down option, users can then select different themes they have added.

- The version control looks a bit messed up. There are references to PRs, but why are there no PRs of any sort?
  - This project was originally done under a GitHub organization as a university school project. With the approval of other collaborators, I copied the repo to my personal account which copied everything besides pull requests, GitHub issues, and GitHub milestones. I have screenshotted all previous PRs to `./prev-org`.

- Remaining TODOs:
  - [ ] Proper Saving and Loading to CSV
    - Currently, we can export the data to a JSON file, but loading does not function correctly.
  - [ ] Modularize theme selection.
    - Currently, extending theme support involves adding a new theme to the Tailwind Config, then modifying the `OptionsPane` component to include an additional drop-down option. Should investigate if there is a way to do this without modifying existing codebase.
