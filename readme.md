# music-related UI elements

## build instructions

use `npm run build` (it copies .css files into the lib directory, and runs tsc)

## notes

WIP
some ideas:

-   musical keyboard
-   note sequence designer
-   piano roll
-   drum grid
-   waveform viewer
-   DAW-type region editor
-   Guitar tabs, chord diagrams

## UI test feature

We render compoments on a test page, just open simple-client/index.html in browser (or use `npm run view`). Drop down menu chooses which one to look at.

for development: run `tsc --watch` in one window for created js files in /lib, and `npm run watch` in another to run watchify and create the bundle.js


