import { render } from "react-dom";
import { createElement as e } from "react";
import { SimpleClient } from './SimpleClient'

document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById("main");

	render(
		e(SimpleClient, null),
		container
	);
});
