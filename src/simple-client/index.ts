import { render } from "react-dom";
import { createElement as e } from "react";

import { PianoKeyboard } from "../components/PianoKeyboard/PianoKeyboard";
import { GuitarChordDiagram } from "../components/GuitarChordDiagram/GuitarChordDiagram";
import { ButtonGridExample } from "./ButtonGridExample";
import { SingleNoteLane } from "../components/SingleNoteLane/SingleNoteLane";
import { MultiNoteLanes } from "../components/MultiNoteLanes/MultiNoteLanes";

document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById("main");

	render(
		e(MultiNoteLanes, null),
		container
	);
});
