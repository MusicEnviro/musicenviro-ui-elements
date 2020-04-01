import { createElement } from "react";

import { ButtonGrid } from "../components/ButtonGrid/ButtonGrid";

export function ButtonGridExample() {
	return createElement(ButtonGrid, {
        ...ButtonGrid.defaultProps,
		style: {
			width: "300px",
			height: "300px",
			backgroundColor: "gray",
			color: "white",
        },
        onButtonDown: (row, col) => {
            console.log(`clicked button at row ${row}, column ${col}`)},
	});
}
