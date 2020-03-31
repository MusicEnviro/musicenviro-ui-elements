import * as React from "react";
import * as _ from "lodash";
import { IButtonGridProps } from "./@types";
import { ButtonGridButton } from "./ButtonGridButton";

export function ButtonGrid(props: IButtonGridProps) {
	function rowHTML(row: number) {
		return (
			<tr key={row}>
				{_.times(props.numColumns, col =>
					ButtonGridButton(col, props, row, handleClick)
				)}
			</tr>
		);
	}

	function handleClick(
		e: React.MouseEvent<HTMLTableDataCellElement>,
		row: number,
		col: number
	) {
		props.onButtonDown(row, col);
	}

	return (
		<table style={{ ...props.style }}>
			<tbody>{_.times(props.numRows, rowHTML)}</tbody>
		</table>
	);
}

ButtonGrid.defaultProps = {
	numRows: 4,
	numColumns: 4,
	onButtonDown: (row: number, column: number) => {},
	style: { color: "white" },
	clickColor: "pink"
};



